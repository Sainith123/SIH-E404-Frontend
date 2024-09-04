import os
from typing import Optional, Union
from fastapi import FastAPI, HTTPException, UploadFile, Form
import firebase_admin
from firebase_admin import credentials, db, storage, auth

from datetime import datetime
import uuid
from starlette.datastructures import UploadFile as StarletteUploadFile

#for AI
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import bchlib
from PIL import Image, ImageOps
import tensorflow.compat.v1 as tf
from tensorflow.python.saved_model import tag_constants
from tensorflow.python.saved_model import signature_constants
from io import BytesIO
import uvicorn

cred = credentials.Certificate("./sih2024-8db60-firebase-adminsdk-3qpln-e6fa613ff5.json")

firebase_admin.initialize_app(cred)
#                               , {
#     'databaseURL': 'https://error-404-sih-default-rtdb.asia-southeast1.firebasedatabase.app/',
#     'storageBucket': 'error-404-sih.appspot.com'
# })

BCH_POLYNOMIAL = 137
BCH_BITS = 5

sess = tf.InteractiveSession(graph=tf.Graph())

model = tf.saved_model.load(sess, [tag_constants.SERVING], 'saved_models/stegastamp_pretrained')

input_secret_name = model.signature_def[signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY].inputs['secret'].name
input_image_name = model.signature_def[signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY].inputs['image'].name
input_secret = tf.get_default_graph().get_tensor_by_name(input_secret_name)
input_image = tf.get_default_graph().get_tensor_by_name(input_image_name)

output_stegastamp_name = model.signature_def[signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY].outputs['stegastamp'].name
output_residual_name = model.signature_def[signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY].outputs['residual'].name
output_stegastamp = tf.get_default_graph().get_tensor_by_name(output_stegastamp_name)
output_residual = tf.get_default_graph().get_tensor_by_name(output_residual_name)

width = 400
height = 400

bch = bchlib.BCH(prim_poly=BCH_POLYNOMIAL, t=BCH_BITS)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Make Encoded Image
@app.post('/encode_image')
async def make_image(file: UploadFile, secret: str = Form(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file part")

    if file.filename == '':
        raise HTTPException(status_code=400, detail="No selected file")

    image = Image.open(BytesIO(await file.read()))

    data = bytearray(secret + ' ' * (7 - len(secret)), 'utf-8')
    ecc = bch.encode(data)
    packet = data + ecc
    packet_binary = ''.join(format(x, '08b') for x in packet)
    secret = [int(x) for x in packet_binary]
    secret.extend([0, 0, 0, 0])

    size = (width, height)

    image = image.convert("RGB")
    image = np.array(ImageOps.fit(image, size), dtype=np.float32)
    image = image.astype(np.float32) / 255.0
    
    feed_dict = {input_secret: [secret], input_image: [image]}

    hidden_img, residual = sess.run([output_stegastamp, output_residual], feed_dict=feed_dict)
    
    rescaled = (hidden_img[0] * 255).astype(np.uint8)

    im = Image.fromarray(np.array(rescaled))
    

    if not os.path.exists("out"):
        os.makedirs("out")

    file_path = "out/out.png"
    im.save(file_path)

    return FileResponse(file_path, media_type='image/png', filename='out/out.png')

def handle_file_upload(file: StarletteUploadFile):
    filename = f"{uuid.uuid4()}_{file.filename}"
    bucket = storage.bucket()
    blob = bucket.blob(filename)
    blob.upload_from_file(file.file)
    blob.make_public()
    return blob.public_url

# User Management

@app.post("/users/verify-token")
async def verify_token(id_token: str = Form(...), age: int = Form(...), display_name: str = Form(...)):
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        user = auth.get_user(uid)
        return {"uuid": uid, "email": user.email, "age": age, "display_name": display_name}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/users/{userUuid}")
async def get_user(userUuid: str):
    try:
        user = auth.get_user(userUuid)
        return {
            "uid": user.uid,
            "email": user.email,
            "displayName": user.display_name
        }
    except auth.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")

@app.put("/users/{userUuid}")
async def update_user(
    userUuid: str,
    displayName: str = Form(...)
):
    try:
        auth.update_user(
            userUuid,
            display_name=displayName
        )
        return {"message": "User updated successfully"}
    except auth.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")

@app.delete("/users/{user_uid}")
async def delete_user(user_uid: str):
    try:
        auth.delete_user(user_uid)
        return {"message": "User deleted successfully"}
    except auth.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")

# Asset Management
@app.post("/assets")
async def create_asset(
    userUuid: str = Form(...),
    action: str = Form(...),
    ageRestrictions: Optional[str] = Form(None),
    userRestrictions: Optional[str] = Form(None),
    metadata: Union[str, UploadFile] = Form(...),
    assetName: str = Form(...)  # New field for user-given name
):
    
    if ageRestrictions == "":
        ageRestrictions = None
    if userRestrictions == "":
        userRestrictions = None

    asset_dict = {
        "userUuid": userUuid,
        "action": action,
        "ageRestrictions": ageRestrictions,
        "userRestrictions": userRestrictions.split(',') if userRestrictions else None,
        "timestamp": datetime.now().timestamp(),
        "assetName": assetName
    }

    if action in ["File download", "3D assets file"]:
        if isinstance(metadata, StarletteUploadFile):
            asset_dict["metadata"] = handle_file_upload(metadata)
        else:
            raise HTTPException(status_code=400, detail="File upload required for this action type")
    else:
        if isinstance(metadata, str):
            asset_dict["metadata"] = metadata
        else:
            raise HTTPException(status_code=400, detail="Text metadata required for this action type")

    asset_ref = db.reference('assets').push(asset_dict)
    return {"uuid": asset_ref.key}

@app.get("/assets/{asset_uuid}")
async def get_asset(
    asset_uuid: str,
    user_age: int = Form(...),
    user_gmail: str = Form(...)
):
    asset = db.reference(f'assets/{asset_uuid}').get()
    if asset is None:
        raise HTTPException(status_code=404, detail="Asset not found")
    
    if asset['ageRestrictions'] == "18+" and user_age < 18:
        raise HTTPException(status_code=403, detail="Access Denied: Age restriction")
    if asset['userRestrictions'] and user_gmail not in asset['userRestrictions']:
        raise HTTPException(status_code=403, detail="Access Denied: User not authorized")
    
    return asset

@app.put("/assets/{asset_uuid}")
async def update_asset(
    asset_uuid: str,
    userUuid: str = Form(...),
    action: str = Form(...),
    ageRestrictions: Optional[str] = Form(None),
    userRestrictions: Optional[str] = Form(None),
    metadata: Union[str, UploadFile] = Form(...),
    assetName: str = Form(...)
):
    
    if ageRestrictions == "":
        ageRestrictions = None
    if userRestrictions == "":
        userRestrictions = None

    asset_dict = {
        "userUuid": userUuid,
        "action": action,
        "ageRestrictions": ageRestrictions,
        "userRestrictions": userRestrictions.split(',') if userRestrictions else None,
        "assetName": assetName 
    }

    if action in ["File download", "3D assets file"]:
        if isinstance(metadata, StarletteUploadFile):
            asset_dict["metadata"] = handle_file_upload(metadata)
        else:
            raise HTTPException(status_code=400, detail="File upload required for this action type")
    else:
        if isinstance(metadata, str):
            asset_dict["metadata"] = metadata
        else:
            raise HTTPException(status_code=400, detail="Text metadata required for this action type")

    db.reference(f'assets/{asset_uuid}').update(asset_dict)
    return {"message": "Asset updated successfully"}

#fix ASAP, metadata is not deleted from storage
@app.delete("/assets/{asset_uuid}")
async def delete_asset(asset_uuid: str):
    asset = db.reference(f'assets/{asset_uuid}').get()
    if asset and asset.get('metadata') and asset['action'] in ["File download", "3D assets file"]:
        bucket = storage.bucket()
        blob = bucket.blob(asset['metadata'].split('/')[-1])
        if blob.exists():
            try:
                blob.delete()
            except Exception as e:
                raise HTTPException(status_code=500, detail="Failed to delete asset file")
            
    db.reference(f'assets/{asset_uuid}').delete()
    return {"message": "Asset deleted successfully"}

@app.get("/users/{user_uuid}/assets")
async def get_user_assets(user_uuid: str):
    assets = db.reference('assets').order_by_child('userUuid').equal_to(user_uuid).get()
    
    if assets is None:
        return {"assets": []}
    
    asset_list = [{"uuid": uuid, **asset_data} for uuid, asset_data in assets.items()]
    
    return {"assets": asset_list}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)