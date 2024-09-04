// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { auth, storage, db } from '../firebase'; // Import Firebase
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { doc, setDoc } from 'firebase/firestore';
// import { Button, Input, Box, Text, LinkBox } from "@quarkly/widgets";
// import { GiFairyWings } from "react-icons/gi";

// const VaultPage = () => {
//     const history = useHistory();
//     const [file, setFile] = useState(null);
//     const [uploading, setUploading] = useState(false);
//     const [fileURL, setFileURL] = useState('');

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleUpload = async () => {
//         if (!file) return;

//         setUploading(true);
//         const userId = auth.currentUser.uid;
//         const fileRef = ref(storage, `user-uploads/${userId}/${file.name}`);
//         try {
//             await uploadBytes(fileRef, file);
//             const url = await getDownloadURL(fileRef);
//             setFileURL(url);

//             await setDoc(doc(db, 'userFiles', userId), {
//                 fileName: file.name,
//                 fileURL: url,
//                 uploadedAt: new Date(),
//             }, { merge: true });

//         } catch (error) {
//             console.error('Upload failed:', error);
//         } finally {
//             setUploading(false);
//         }
//     };

//     const handleSignOut = () => {
//         auth.signOut().then(() => {
//             history.push('/');
//         });
//     };

//     const handleManageAssets = () => {
//         history.push('/manage-assets');
//     };

//     return (
//         <Box padding="20px" background="#f5f5f5" minHeight="100vh" fontFamily="Arial, sans-serif">
//             {/* Header */}
//             <Box
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//                 padding="12px 20px"
//                 backgroundColor="#333"
//                 color="#fff"
//                 position="relative"
//             >
//                 <LinkBox 
//                     flexDirection="row" 
//                     href="/" 
//                     display="flex" 
//                     gridGap="18px" 
//                     alignItems="center"
//                     justifyContent="center"
//                 >
//                     <GiFairyWings size={37} color="#6d32ec" />
//                     <Text
//                         margin="0"
//                         textAlign="left"
//                         font="--headline3"
//                         display="block"
//                         color="#333"  // Changed text color to dark
//                     >
//                         Smart QR
//                     </Text>
//                 </LinkBox>
//                 <Box display="flex" gap="10px" position="absolute" right="20px">
//                     <Button onClick={handleSignOut} background="#fff" color="#333">Sign Out</Button>
//                     <Button onClick={handleManageAssets} background="#fff" color="#333">Manage Assets</Button>
//                 </Box>
//             </Box>

//             {/* Main Content */}
//             <Box padding="40px" textAlign="center">
//                 <Text fontSize="32px" fontWeight="bold" marginBottom="20px">Vault</Text>
//                 {/* File Upload Section */}
//                 <Box
//                     margin="20px auto"
//                     alignItems="center"
//                     display="flex"
//                     justifyContent="center"
//                     flexDirection="column"
//                     width="300px"
//                     padding="20px"
//                     border="1px solid #ccc"
//                     borderRadius="10px"
//                     backgroundColor="#fff"
//                     boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"  // Added shadow for better visibility
//                 >
//                     <Input type="file" onChange={handleFileChange} marginBottom="10px" />
//                     <Button onClick={handleUpload} disabled={uploading} background="#333" color="#fff" width="100%">
//                         {uploading ? 'Uploading...' : 'Upload'}
//                     </Button>
//                     {fileURL && (
//                         <Text marginTop="10px">
//                             <a href={fileURL} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc' }}>View File</a>
//                         </Text>
//                     )}
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default VaultPage;








// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { auth, storage, db } from '../firebase'; // Import Firebase
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { doc, setDoc } from 'firebase/firestore';
// import { Button, Input, Box, Text, LinkBox, Select } from "@quarkly/widgets";
// import { GiFairyWings } from "react-icons/gi";

// const VaultPage = () => {
//     const history = useHistory();
//     const [file, setFile] = useState(null);
//     const [uploading, setUploading] = useState(false);
//     const [fileURL, setFileURL] = useState('');
//     const [action, setAction] = useState('');
//     const [ageRestrictions, setAgeRestrictions] = useState('');
//     const [userRestrictions, setUserRestrictions] = useState('');
//     const [metadata, setMetadata] = useState('');
//     const [assetName, setAssetName] = useState('');
//     const [gmailIds, setGmailIds] = useState('');

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleUpload = async () => {
//         if (!file) return;

//         setUploading(true);
//         const userId = auth.currentUser.uid;
//         const fileRef = ref(storage, `user-uploads/${userId}/${file.name}`);
//         try {
//             await uploadBytes(fileRef, file);
//             const url = await getDownloadURL(fileRef);
//             setFileURL(url);

//             await setDoc(doc(db, 'userFiles', userId), {
//                 fileName: file.name,
//                 fileURL: url,
//                 uploadedAt: new Date(),
//             }, { merge: true });

//         } catch (error) {
//             console.error('Upload failed:', error);
//         } finally {
//             setUploading(false);
//         }
//     };

//     const handleSignOut = () => {
//         auth.signOut().then(() => {
//             history.push('/');
//         });
//     };

//     const handleManageAssets = () => {
//         history.push('/manage-assets');
//     };

//     const handleSubmit = () => {
//         const formData = new FormData();
//         const userUuid = auth.currentUser.uid;
//         formData.append("userUuid", userUuid);
//         formData.append("action", action);
//         formData.append("ageRestrictions", ageRestrictions);
//         formData.append("userRestrictions", userRestrictions === 'None' ? 'None' : gmailIds);
//         formData.append("metadata", metadata);
//         formData.append("assetName", assetName);

//         const requestOptions = {
//             method: 'POST',
//             body: formData,
//             redirect: 'follow'
//         };

//         fetch("http://127.0.0.1:8000/assets", requestOptions)
//             .then(response => response.text())
//             .then(result => console.log(result))
//             .catch(error => console.log('error', error));
//     };

//     return (
//         <Box padding="20px" background="#f5f5f5" minHeight="100vh" fontFamily="Arial, sans-serif">
//             {/* Header */}
//             <Box
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//                 padding="12px 20px"
//                 backgroundColor="#333"
//                 color="#fff"
//                 position="relative"
//             >
//                 <LinkBox 
//                     flexDirection="row" 
//                     href="/" 
//                     display="flex" 
//                     gridGap="18px" 
//                     alignItems="center"
//                     justifyContent="center"
//                 >
//                     <GiFairyWings size={37} color="#6d32ec" />
//                     <Text
//                         margin="0"
//                         textAlign="left"
//                         font="--headline3"
//                         display="block"
//                         color="#333"  // Changed text color to dark
//                     >
//                         Smart QR
//                     </Text>
//                 </LinkBox>
//                 <Box display="flex" gap="10px" position="absolute" right="20px">
//                     <Button onClick={handleSignOut} background="#fff" color="#333">Sign Out</Button>
//                     <Button onClick={handleManageAssets} background="#fff" color="#333">Manage Assets</Button>
//                 </Box>
//             </Box>

//             {/* Main Content */}
//             <Box padding="40px" textAlign="center">
//                 <Text fontSize="32px" fontWeight="bold" marginBottom="20px">Vault</Text>
//                 {/* File Upload Section */}
//                 <Box
//                     margin="20px auto"
//                     alignItems="center"
//                     display="flex"
//                     justifyContent="center"
//                     flexDirection="column"
//                     width="300px"
//                     padding="20px"
//                     border="1px solid #ccc"
//                     borderRadius="10px"
//                     backgroundColor="#fff"
//                     boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"  // Added shadow for better visibility
//                 >
//                     <Input type="file" onChange={handleFileChange} marginBottom="10px" />
//                     <Button onClick={handleUpload} disabled={uploading} background="#333" color="#fff" width="100%">
//                         {uploading ? 'Uploading...' : 'Upload'}
//                     </Button>
//                     {fileURL && (
//                         <Text marginTop="10px">
//                             <a href={fileURL} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc' }}>View File</a>
//                         </Text>
//                     )}
//                 </Box>

//                 {/* Form Section */}
//                 <Box
//                     margin="20px auto"
//                     alignItems="center"
//                     display="flex"
//                     justifyContent="center"
//                     flexDirection="column"
//                     width="300px"
//                     padding="20px"
//                     border="1px solid #ccc"
//                     borderRadius="10px"
//                     backgroundColor="#fff"
//                     boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
//                 >
//                     <Box marginBottom="20px">
//                         <Text fontSize="16px" marginBottom="5px">Action</Text>
//                         <Select
//                             onChange={(e) => {
//                                 const value = e.target.value;
//                                 setAction(value);
//                                 setMetadata(value);
//                                 setAssetName(`Testing ${value}`);
//                             }} 
//                             value={action}
//                         >
//                             <option value="">Select</option>
//                             <option value="Hyperlink">Hyperlink</option>
//                             <option value="UPI">UPI</option>
//                             <option value="Image">Image</option>
//                             <option value="Video">Video</option>
//                             <option value="File download">File download</option>
//                             <option value="3d assets file">3d assets file</option>
//                         </Select>
//                     </Box>

//                     <Box marginBottom="20px">
//                         <Text fontSize="16px" marginBottom="5px">Age Restrictions</Text>
//                         <Select
//                             onChange={(e) => setAgeRestrictions(e.target.value)} 
//                             value={ageRestrictions}
//                         >
//                             <option value="">Select</option>
//                             <option value="None">None</option>
//                             <option value="Restricted">Restricted</option>
//                         </Select>
//                     </Box>

//                     <Box marginBottom="20px">
//                         <Text fontSize="16px" marginBottom="5px">User Restrictions</Text>
//                         <Select
//                             onChange={(e) => setUserRestrictions(e.target.value)} 
//                             value={userRestrictions}
//                         >
//                             <option value="">Select</option>
//                             <option value="None">None</option>
//                             <option value="Text Area">Text Area</option>
//                         </Select>
//                     </Box>

//                     {userRestrictions === 'Text Area' && (
//                         <Box marginBottom="20px">
//                             <Text fontSize="16px" marginBottom="5px">Gmail IDs</Text>
//                             <textarea
//                                 value={gmailIds}
//                                 onChange={(e) => setGmailIds(e.target.value)}
//                                 placeholder="Enter Gmail IDs, comma-separated"
//                                 style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
//                             />
//                         </Box>
//                     )}

//                     <Button onClick={handleSubmit} background="#333" color="#fff" width="100%">
//                         Submit
//                     </Button>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default VaultPage;


import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, storage, db } from '../firebase'; // Import Firebase
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { GiFairyWings } from "react-icons/gi";
import { FaUserCircle } from 'react-icons/fa';


const VaultPage = () => {
    const history = useHistory();
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [fileURL, setFileURL] = useState('');
    const [action, setAction] = useState('');
    const [ageRestrictions, setAgeRestrictions] = useState('');
    const [userRestrictions, setUserRestrictions] = useState('');
    const [metadata, setMetadata] = useState('');
    const [assetName, setAssetName] = useState('');
    const [gmailIds, setGmailIds] = useState('');
    const [displayName, setDisplayName] = useState('');

    const generateCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 7; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    };
    

    useEffect(() => {
        if (auth.currentUser) {
            setDisplayName(auth.currentUser.displayName || '');
        }
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    
    // const handleUpload = async () => {
    //     if (!file) return;

    //     setUploading(true);
    //     const userId = auth.currentUser.uid;
    //     const fileRef = ref(storage, `user-uploads/${userId}/${file.name}`);
    //     try {
    //         await uploadBytes(fileRef, file);
    //         const url = await getDownloadURL(fileRef);
    //         setFileURL(url);

    //         await setDoc(doc(db, 'userFiles', userId), {
    //             fileName: file.name,
    //             fileURL: url,
    //             uploadedAt: new Date(),
    //         }, { merge: true });

    //     } catch (error) {
    //         console.error('Upload failed:', error);
    //     } finally {
    //         setUploading(false);
    //     }
    // };


    // const handleUpload = async () => {
    //     if (!file) return;
    
    //     setUploading(true);
    //     const userId = auth.currentUser.uid;
    //     const fileRef = ref(storage, `user-uploads/${userId}/${file.name}`);
    //     const secretCode = generateCode();  // Generate the 7-digit code here
    
    //     try {
    //         await uploadBytes(fileRef, file);
    //         const url = await getDownloadURL(fileRef);
    //         setFileURL(url);
    
    //         // Store the file data along with the generated code in Firestore
    //         await setDoc(doc(db, 'userFiles', userId), {
    //             fileName: file.name,
    //             fileURL: url,
    //             uploadedAt: new Date(),
    //             secretCode: secretCode  // Add the secret code here
    //         }, { merge: true });
    
    //     } catch (error) {
    //         console.error('Upload failed:', error);
    //     } finally {
    //         setUploading(false);
    //     }
    // };


    const handleUpload = async () => {
        if (!file) return;
    
        setUploading(true);
        const userId = auth.currentUser.uid;
        const fileRef = ref(storage, `user-uploads/${userId}/${file.name}`);
        const secretCode = generateCode();  // Generate the 7-digit code here
        
        try {
            await uploadBytes(fileRef, file);
            const url = await getDownloadURL(fileRef);
            setFileURL(url);
    
            // Store the file data along with the generated code in Firestore
            await setDoc(doc(db, userId, file.name), {
                fileName: file.name,
                fileURL: url,
                uploadedAt: new Date(),
                secretCode: secretCode  // Add the secret code here
            }, { merge: true });
    
            // Prepare form data for the API call
            const formdata = new FormData();
            formdata.append("file", file); // Use the file directly
            formdata.append("secret", secretCode);
    
            // Make the API call
            const response = await fetch("https://1412-218-248-0-1.ngrok-free.app/encode_image", {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            });
    
            // Log the response--> image in binary will be printed
            const result = await response.text();
           console.log(result);
    
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };
    
    
    const handleSignOut = () => {
        auth.signOut().then(() => {
            history.push('/');
        });
    };

    const handleManageAssets = () => {
        history.push('/manage-assets');
    };

    const handleSubmit = () => {
        const formData = new FormData();
        const userUuid = auth.currentUser.uid;
        formData.append("userUuid", userUuid);
        formData.append("action", action);
        formData.append("ageRestrictions", ageRestrictions);
        formData.append("userRestrictions", userRestrictions === 'None' ? 'None' : gmailIds);
        formData.append("metadata", metadata);
        formData.append("assetName", assetName);

        const requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/assets", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };

    const handleGmailIdsChange = (e) => {
        const value = e.target.value;
        const regex = /\b[A-Za-z0-9.%+-]+@gmail\.com\b(?:,\s*\b[A-Za-z0-9.%+-]+@gmail\.com\b)*/;
        if (regex.test(value) || value === '') {
            setGmailIds(value);
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px 20px', backgroundColor: '#333', color: '#fff', position: 'relative' }}>
                <a href="/" style={{ display: 'flex', flexDirection: 'row', gap: '18px', alignItems: 'center', justifyContent: 'center' }}>
                    <GiFairyWings size={37} color="#6d32ec" />
                    <span style={{ margin: '0', textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>Smart QR</span>
                </a>
                <div style={{ position: 'absolute', right: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <FaUserCircle size={20} color="#fff" />
                    <span>{displayName}</span>
                    <button onClick={handleSignOut} style={{ background: '#fff', color: '#333' }}>Sign Out</button>
                    <button onClick={handleManageAssets} style={{ background: '#fff', color: '#333' }}>Manage Assets</button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Vault</h1>
                {/* Form Section */}
                <div style={{ margin: '20px auto', alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                    {/* Action Select */}
                    <div style={{ marginBottom: '20px', textAlign: 'left', width: '100%' }}>
                        <label style={{ fontSize: '16px', marginBottom: '5px', display: 'block' }}>Action</label>
                        <select
                            onChange={(e) => {
                                const value = e.target.value;
                                setAction(value);
                                setMetadata(value);
                                setAssetName(`Testing ${value}`);
                            }}
                            value={action}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        >
                            <option value="">Select</option>
                            <option value="Hyperlink">Hyperlink</option>
                            <option value="UPI">UPI</option>
                            <option value="Image">Image</option>
                            <option value="Video">Video</option>
                            <option value="File download">File download</option>
                            <option value="3d assets file">3d assets file</option>
                        </select>
                    </div>

                   {/* User Restrictions Text Area */}
                    {/* <div style={{ marginBottom: '20px', textAlign: 'left', width: '100%' }}>
                        <label style={{ fontSize: '16px', marginBottom: '5px', display: 'block' }}>User Restrictions</label>
                        <textarea
                            value={userRestrictions}
                            onChange={(e) => setUserRestrictions(e.target.value)}
                            placeholder="Enter User Restrictions"
                            style={{ width: '100%', height: '40px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px', textAlign: 'left', width: '100%' }}>
                        <label style={{ fontSize: '16px', marginBottom: '5px', display: 'block' }}>Age Restrictions</label>
                        <select
                            onChange={(e) => setAgeRestrictions(e.target.value)}
                            value={ageRestrictions}
                            style={{ width: '   100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        >
                            <option value="">Select</option>
                            <option value="No">No</option>
                            <option value="Below 18">Below 18</option>
                        </select>
                    </div> */}

                    {/* User Restrictions Text Area */}
                        <div style={{ marginBottom: '20px', textAlign: 'left', width: '100%' }}>
                            <label style={{ fontSize: '16px', marginBottom: '5px', display: 'block' }}>User Restrictions</label>
                            <textarea
                                value={userRestrictions}
                                onChange={(e) => setUserRestrictions(e.target.value)}
                                placeholder="Enter User Restrictions"
                                style={{
                                    width: 'calc(100% - 22px)', // Adjusted width to account for padding and border
                                    height: '40px',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    boxSizing: 'border-box' // Ensure padding and border are included in the element's width and height
                                }}
                            />
                        </div>

                        {/* Age Restrictions Select */}
                        <div style={{ marginBottom: '20px', textAlign: 'left', width: '100%' }}>
                            <label style={{ fontSize: '16px', marginBottom: '5px', display: 'block' }}>Age Restrictions</label>
                            <select
                                onChange={(e) => setAgeRestrictions(e.target.value)}
                                value={ageRestrictions}
                                style={{ 
                                    width: '100%', 
                                    padding: '10px', 
                                    borderRadius: '5px', 
                                    border: '1px solid #ccc',
                                    boxSizing: 'border-box'  // Ensure padding and border are included in the element's width and height
                                }}
                            >
                                <option value="">Select</option>
                                <option value="No">No</option>
                                <option value="Below 18">Below 18</option>
                            </select>
                        </div>


                    {/* Gmail IDs Text Area */}
                    {userRestrictions === 'Text Area' && (
                        <div style={{ marginBottom: '20px', textAlign: 'left', width: '100%' }}>
                            <label style={{ fontSize: '16px', marginBottom: '5px', display: 'block' }}>Gmail IDs</label>
                            <textarea
                                value={gmailIds}
                                onChange={handleGmailIdsChange}
                                placeholder="Enter Gmail IDs, comma-separated"
                                style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                    )}

                   {/* Metadata */}
                    <div style={{ marginBottom: '20px', textAlign: 'left', width: '100%' }}>
                        <label style={{ fontSize: '16px', marginBottom: '5px', display: 'block' }}>Metadata</label>
                        <input
                            value={metadata}
                            onChange={(e) => setMetadata(e.target.value)}
                            placeholder="Metadata"
                            readOnly
                            style={{
                                width: 'calc(100% - 22px)', // Adjusted width to account for padding and border
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                boxSizing: 'border-box' // Ensure padding and border are included in the element's width and height
                            }}
                        />
                    </div>

                    {/* Asset Name */}
                    <div style={{ marginBottom: '20px', textAlign: 'left', width: '100%' }}>
                        <label style={{ fontSize: '16px', marginBottom: '5px', display: 'block' }}>Asset Name</label>
                        <input
                            value={assetName}
                            onChange={(e) => setAssetName(e.target.value)}
                            placeholder="Asset Name"
                            readOnly
                            style={{
                                width: 'calc(100% - 22px)', // Adjusted width to account for padding and border
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                boxSizing: 'border-box' // Ensure padding and border are included in the element's width and height
                            }}
                        />
                    </div>


                    {/* Submit Button */}
                    <button onClick={handleSubmit} style={{ background: '#333', color: '#fff', width: '100%', padding: '10px', borderRadius: '5px' }}>
                        Submit
                    </button>
                </div>

                {/* File Upload Section */}
                {['3d assets file', 'file download'].includes(action) && (
                    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fff', width: '300px', margin: '20px auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <h2 style={{ marginBottom: '15px' }}>File Upload</h2>
                        <input type="file" onChange={handleFileChange} style={{ marginBottom: '10px' }} />
                        <button onClick={handleUpload} style={{ background: '#333', color: '#fff', padding: '10px', borderRadius: '5px' }}>
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                        {fileURL && <a href={fileURL} target="_blank" rel="noopener noreferrer" style={{ marginTop: '10px', color: '#007BFF' }}>View Uploaded File</a>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VaultPage;
