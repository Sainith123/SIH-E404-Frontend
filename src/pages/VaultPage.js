import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { GiFairyWings } from "react-icons/gi";
import { FaUserCircle, FaEdit, FaTrash } from 'react-icons/fa';

const VaultPage = () => {
    const history = useHistory();
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [action, setAction] = useState('');
    const [ageRestrictions, setAgeRestrictions] = useState('');
    const [userRestrictions, setUserRestrictions] = useState('');
    const [metadata, setMetadata] = useState('');
    const [hyperlink, setHyperlink] = useState('');
    const [assetName, setAssetName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [editingAsset, setEditingAsset] = useState(null);

    useEffect(() => {
        if (auth.currentUser) {
            setDisplayName(auth.currentUser.displayName || '');
            fetchAssets();
        }
    }, []);

    const fetchAssets = async () => {
        try {
            const userId = auth.currentUser.uid;
            const userFilesCollectionRef = collection(db, userId);
            const querySnapshot = await getDocs(userFilesCollectionRef);

            const files = [];
            querySnapshot.forEach((doc) => {
                files.push({
                    ...doc.data(),
                    id: doc.id
                });
            });

            setAssets(files);
        } catch (error) {
            console.error('Error fetching assets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = () => {
        auth.signOut().then(() => {
            history.push('/');
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file && action !== 'Hyperlink') return;

        setUploading(true);
        const userId = auth.currentUser.uid;
        
        try {
            let url = '';
            if (file) {
                const fileRef = ref(storage, `user-uploads/${userId}/${file.name}`);
                await uploadBytes(fileRef, file);
                url = await getDownloadURL(fileRef);
            }

            const assetData = {
                fileName: file ? file.name : assetName,
                fileURL: url || hyperlink,
                uploadedAt: new Date(),
                action,
                ageRestrictions,
                userRestrictions,
                metadata: action,
                assetName
            };

            if (editingAsset) {
                await setDoc(doc(db, userId, editingAsset.id), assetData);
            } else {
                await setDoc(doc(db, userId, assetName), assetData);
            }

            fetchAssets();
            setShowPopup(false);
            resetForm();
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (docId) => {
        try {
            const userId = auth.currentUser.uid;
            const fileDocRef = doc(db, userId, docId);
            await deleteDoc(fileDocRef);
            fetchAssets();
        } catch (error) {
            console.error('Error deleting asset:', error);
        }
    };

    const handleEdit = (asset) => {
        setEditingAsset(asset);
        setAction(asset.action);
        setAgeRestrictions(asset.ageRestrictions);
        setUserRestrictions(asset.userRestrictions);
        setMetadata(asset.metadata);
        setAssetName(asset.assetName || asset.fileName);
        setHyperlink(asset.fileURL);
        setShowPopup(true);
    };

    const resetForm = () => {


        setFile(null);
        setAction('');
        setAgeRestrictions('');
        setUserRestrictions('');
        setMetadata('');
        setHyperlink('');
        setAssetName('');
        setEditingAsset(null);
    };

    const renderPopup = () => (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '15px',
                width: '500px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
            }}>
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>{editingAsset ? 'Edit Asset' : 'Add New Asset'}</h2>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Asset Type</label>
                    <select
                        onChange={(e) => {
                            setAction(e.target.value);
                            setMetadata(e.target.value);
                        }}
                        value={action}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="">Select Action</option>
                        <option value="Hyperlink">Hyperlink</option>
                        <option value="Audio">Audio</option>
                        <option value="Image">Image</option>
                        <option value="Video">Video</option>
                        <option value="3d assets file">3D Assets File</option>
                    </select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Asset Name</label>
                    <input
                        type="text"
                        value={assetName}
                        onChange={(e) => setAssetName(e.target.value)}
                        placeholder="Asset Name"
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Age Restrictions</label>
                    <select
                        onChange={(e) => setAgeRestrictions(e.target.value)}
                        value={ageRestrictions}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="">Select Age Restrictions</option>
                        <option value="No">No Restrictions</option>
                        <option value="Above 18">Above 18</option>
                    </select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>User Restrictions</label>
                    <textarea
                        value={userRestrictions}
                        onChange={(e) => setUserRestrictions(e.target.value)}
                        placeholder="User Restrictions"
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '60px' }}
                    />
                </div>
                {action === 'Hyperlink' ? (
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Hyperlink</label>
                        <input
                            type="text"
                            value={hyperlink}
                            onChange={(e) => setHyperlink(e.target.value)}
                            placeholder="Enter link"
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                ) : (
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>File</label>
                        <input 
                            type="file" 
                            onChange={handleFileChange} 
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button 
                        onClick={handleUpload} 
                        style={{ 
                            padding: '10px 20px', 
                            backgroundColor: '#4CAF50', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer'
                        }}
                    >
                        {uploading ? 'Uploading...' : (editingAsset ? 'Update' : 'Upload')}
                    </button>
                    <button 
                        onClick={() => { setShowPopup(false); resetForm(); }} 
                        style={{ 
                            padding: '10px 20px', 
                            backgroundColor: '#f44336', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ padding: '20px', backgroundColor: '#1b1b1b', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px 20px', backgroundColor: '#333', color: '#fff', position: 'relative' }}>
                <a href="/" style={{ display: 'flex', flexDirection: 'row', gap: '18px', alignItems: 'center', justifyContent: 'center' }}>
                    <GiFairyWings size={37} color="#6d32ec" />
                    <span style={{ margin: '0', textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>Smart QR</span>
                </a>
                <div style={{ position: 'absolute', right: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <FaUserCircle size={20} color="#fff" />
                    <span>{displayName}</span>
                    <button onClick={handleSignOut} style={{ background: '#fff', color: '#333', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Sign Out</button>
                </div>
            </div>

            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>Vault</h1>
                <button 
                    onClick={() => { setShowPopup(true); resetForm(); }} 
                    style={{ 
                        background: '#4CAF50', 
                        color: '#fff', 
                        padding: '10px 20px', 
                        borderRadius: '5px', 
                        marginBottom: '20px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Add Asset
                </button>

                {loading ? (
                    <p style={{ fontSize: '18px', color: '#666' }}>Loading...</p>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                        {assets.length > 0 ? (
                            assets.map((asset, index) => (
                                <div key={index} style={{ 
                                    padding: '20px', 
                                    border: '1px solid #ccc', 
                                    borderRadius: '10px', 
                                    backgroundColor: '#fff', 
                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', 
                                    width: '250px', 
                                    textAlign: 'left' 
                                }}>
                                    <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px 0' }}>{asset.assetName}</p>
                                    <p>Asset Type: {asset.metadata}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                                        <button 
                                            onClick={() => handleEdit(asset)}
                                            style={{ 
                                                background: '#2196F3', 
                                                color: '#fff', 
                                                padding: '8px 15px', 
                                                borderRadius: '5px', 
                                                border: 'none', 
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(asset.id)}
                                            style={{ 
                                                background: '#f44336', 
                                                color: '#fff', 
                                                padding: '8px 15px', 
                                                borderRadius: '5px', 
                                                border: 'none', 
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ fontSize: '18px', color: '#666' }}>No assets found.</p>
                        )}
                    </div>
                )}

                {showPopup && renderPopup()}
            </div>
        </div>
    );
};

 export default VaultPage;
