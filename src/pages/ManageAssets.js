// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { auth, db, storage } from '../firebase';
// import { doc, getDoc, updateDoc, deleteDoc, FieldValue } from 'firebase/firestore';
// import { ref, deleteObject } from 'firebase/storage';
// import { Box, Button, Text } from "@quarkly/widgets";
// import { GiFairyWings } from "react-icons/gi"; // Importing the icon

// const ManageAssetsPage = () => {
//     const history = useHistory();
//     const [assets, setAssets] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchAssets = async () => {
//         try {
//             const userId = auth.currentUser.uid;
//             const assetsDocRef = doc(db, 'userFiles', userId);
//             const assetsDoc = await getDoc(assetsDocRef);

//             if (assetsDoc.exists()) {
//                 setAssets([assetsDoc.data()]);
//             }
//         } catch (error) {
//             console.error('Error fetching assets:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (fileName) => {
//         try {
//             const userId = auth.currentUser.uid;
//             const fileRef = ref(storage, `user-uploads/${userId}/${fileName}`);

//             // Delete file from storage
//             await deleteObject(fileRef);

//             // Remove file record from Firestore
//             const assetsDocRef = doc(db, 'userFiles', userId);
//             await updateDoc(assetsDocRef, {
//                 fileURL: FieldValue.delete()
//             });

//             // Refresh the asset list
//             fetchAssets();
//         } catch (error) {
//             console.error('Error deleting asset:', error);
//         }
//     };

//     useEffect(() => {
//         fetchAssets();
//     }, []);

//     const handleSignOut = () => {
//         auth.signOut().then(() => {
//             history.push('/');
//         });
//     };

//     return (
//         <Box padding="20px" background="#f5f5f5" minHeight="100vh" fontFamily="Arial, sans-serif">
//             {/* Header */}
//             <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 padding="12px 20px"
//                 backgroundColor="#333"
//                 color="#fff"
//             >
//                 {/* Smart QR Logo */}
//                 <Box display="flex" alignItems="center">
//                     <GiFairyWings size="37px" color="#6d32ec" />
//                     <Text font="--headline3" margin="0 0 0 10px" color="#fff">
//                         Smart QR
//                     </Text>
//                 </Box>
//                 {/* Sign Out Button */}
//                 <Button onClick={handleSignOut} background="#fff" color="#333">
//                     Sign Out
//                 </Button>
//             </Box>

//             {/* Main Content */}
//             <Box padding="40px" textAlign="center">
//                 {loading ? (
//                     <Text fontSize="18px" color="#666">Loading...</Text>
//                 ) : (
//                     <Box>
//                         {assets.length > 0 ? (
//                             assets.map((asset, index) => (
//                                 <Box
//                                     key={index}
//                                     margin="20px auto"
//                                     padding="20px"
//                                     border="1px solid #ccc"
//                                     borderRadius="10px"
//                                     backgroundColor="#fff"
//                                     boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
//                                     width="300px"
//                                     textAlign="left"
//                                 >
//                                     <Text font="--headline4" margin="0 0 10px 0">{asset.fileName}</Text>
//                                     <a href={asset.fileURL} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc' }}>View File</a>
//                                     <Button 
//                                         onClick={() => handleDelete(asset.fileName)} 
//                                         background="#ff4d4d" 
//                                         color="#fff" 
//                                         margin="10px 0 0 0"
//                                     >
//                                         Delete
//                                     </Button>
//                                 </Box>
//                             ))
//                         ) : (
//                             <Text fontSize="18px" color="#666">No assets found.</Text>
//                         )}
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default ManageAssetsPage;










// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { auth, db, storage } from '../firebase';
// import { doc, getDoc, updateDoc, deleteDoc, FieldValue } from 'firebase/firestore';
// import { ref, deleteObject } from 'firebase/storage';
// import { GiFairyWings } from "react-icons/gi"; // Importing the icon
// import { FaUserCircle } from 'react-icons/fa';


// const ManageAssetsPage = () => {
//     const history = useHistory();
//     const [assets, setAssets] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [displayName, setDisplayName] = useState('');

//     const handleVault = () => {
//         history.push('/Vault');
//     };


//     const fetchAssets = async () => {
//         try {
//             const userId = auth.currentUser.uid;
//             const assetsDocRef = doc(db, userId);
//             const assetsDoc = await getDoc(assetsDocRef);

//             if (assetsDoc.exists()) {
//                 setAssets([assetsDoc.data()]);
//             }
//         } catch (error) {
//             console.error('Error fetching assets:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (fileName) => {
//         try {
//             const userId = auth.currentUser.uid;
//             // const fileRef = ref(storage, `user-uploads/${userId}`);

//             // // Delete file from storage
//             // await deleteObject(fileRef);

//             // // Remove file record from Firestore
//             // const assetsDocRef = doc(db, 'userFiles', userId);
//             // await updateDoc(assetsDocRef, {
//             //     fileURL: FieldValue.delete()
//             // });

//             const fileDocRef = doc(db, 'userFiles', userId);
//             await deleteDoc(fileDocRef); 

//             // Refresh the asset list
//             fetchAssets();
//         } catch (error) {
//             console.error('Error deleting asset:', error);
//         }
//     };

//     useEffect(() => {
//         fetchAssets();
//     }, []);
//     useEffect(() => {
//         if (auth.currentUser) {
//             setDisplayName(auth.currentUser.displayName || '');
//         }
//     }, []);

//     const handleSignOut = () => {
//         auth.signOut().then(() => {
//             history.push('/');
//         });
//     };

//     return (
//         <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
//         {/* Header */}
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px 20px', backgroundColor: '#333', color: '#fff', position: 'relative' }}>
//             <a href="/" style={{ display: 'flex', flexDirection: 'row', gap: '18px', alignItems: 'center', justifyContent: 'center' }}>
//                 <GiFairyWings size={37} color="#6d32ec" />
//                 <span style={{ margin: '0', textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>Smart QR</span>
//             </a>
//             <div style={{ position: 'absolute', right: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
//                 <FaUserCircle size={20} color="#fff" />
//                 <span>{displayName}</span>
//                 <button onClick={handleSignOut} style={{ background: '#fff', color: '#333' }}>Sign Out</button>
//                 <button onClick={handleVault} style={{ background: '#fff', color: '#333' }}>Vault</button>

//             </div>
//         </div>

//             {/* Main Content */}
//             <div style={{ padding: '40px', textAlign: 'center' }}>
//                 {loading ? (
//                     <p style={{ fontSize: '18px', color: '#666' }}>Loading...</p>
//                 ) : (
//                     <div>
//                         {assets.length > 0 ? (
//                             assets.map((asset, index) => (
//                                 <div key={index} style={{ margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', width: '300px', textAlign: 'left' }}>
//                                     <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px 0' }}>{asset.fileName}</p>
//                                     <a href={asset.fileURL} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', display: 'block', marginBottom: '10px' }}>View File</a>
//                                     <button 
//                                         onClick={() => handleDelete(asset.fileName)} 
//                                         style={{ background: '#ff4d4d', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             ))
//                         ) : (
//                             <p style={{ fontSize: '18px', color: '#666' }}>No assets found.</p>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ManageAssetsPage;











import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { doc,collection, getDocs, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { GiFairyWings } from "react-icons/gi"; // Importing the icon
import { FaUserCircle } from 'react-icons/fa';

const ManageAssetsPage = () => {
    const history = useHistory();
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayName, setDisplayName] = useState('');

    const handleVault = () => {
        history.push('/Vault');
    };

    // Fetch assets from the dynamically named collection based on userId
    const fetchAssets = async () => {
        try {
            const userId = auth.currentUser.uid;
            const userFilesCollectionRef = collection(db, userId);  // Collection is named by userId
            
            const querySnapshot = await getDocs(userFilesCollectionRef);

            const files = [];
            querySnapshot.forEach((doc) => {
                files.push({
                    ...doc.data(),
                    id: doc.id  // Store document id if needed
                });
            });

            setAssets(files);
        } catch (error) {
            console.error('Error fetching assets:', error);
        } finally {
            setLoading(false);
        }
    };

    // Delete a file from storage and Firestore
    const handleDelete = async (fileName, docId) => {
        try {
            const userId = auth.currentUser.uid;

            // Delete document from Firestore
            const fileDocRef = doc(db, userId, docId);  // docId is document ID in Firestore
            await deleteDoc(fileDocRef);

            // Refresh the asset list
            fetchAssets();
        } catch (error) {
            console.error('Error deleting asset:', error);
        }
    };

    useEffect(() => {
        // fetchAssets();
        setTimeout(() => {
            fetchAssets();
        }, 4000)
    }, []);

    useEffect(() => {
        if (auth.currentUser) {
            setDisplayName(auth.currentUser.displayName || '');
        }
    }, []);

    const handleSignOut = () => {
        auth.signOut().then(() => {
            history.push('/');
        });
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
                    <button onClick={handleVault} style={{ background: '#fff', color: '#333' }}>Vault</button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ padding: '40px', textAlign: 'center' }}>
                {loading ? (
                    <p style={{ fontSize: '18px', color: '#666' }}>Loading...</p>
                ) : (
                    <div>
                        {assets.length > 0 ? (
                            assets.map((asset, index) => (
                                <div key={index} style={{ margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', width: '300px', textAlign: 'left' }}>
                                    <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px 0' }}>{asset.fileName}</p>
                                    <a href={asset.fileURL} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', display: 'block', marginBottom: '10px' }}>View File</a>
                                    <button 
                                        onClick={() => handleDelete(asset.fileName, asset.id)}  // Pass docId for deletion
                                        style={{ background: '#ff4d4d', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p style={{ fontSize: '18px', color: '#666' }}>No assets found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageAssetsPage;








// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { auth, db } from '../firebase';
// import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore';
// import { GiFairyWings } from "react-icons/gi";
// import { FaUserCircle } from 'react-icons/fa';

// const ManageAssetsPage = () => {
//     const history = useHistory();
//     const [assets, setAssets] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [displayName, setDisplayName] = useState('');

//     const handleVault = () => {
//         history.push('/Vault');
//     };

//     const fetchAssets = async (userId) => {
//         try {
//             const userFilesCollectionRef = collection(db, userId);  
//             const querySnapshot = await getDocs(userFilesCollectionRef);

//             const files = [];
//             querySnapshot.forEach((doc) => {
//                 files.push({
//                     ...doc.data(),
//                     id: doc.id  
//                 });
//             });

//             setAssets(files);
//         } catch (error) {
//             console.error('Error fetching assets:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (fileName, docId) => {
//         try {
//             const userId = auth.currentUser.uid;
//             const fileDocRef = doc(db, userId, docId);  
//             await deleteDoc(fileDocRef);
//             fetchAssets(userId);
//         } catch (error) {
//             console.error('Error deleting asset:', error);
//         }
//     };

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((user) => {
//             if (user) {
//                 setDisplayName(user.displayName || '');
//                 fetchAssets(user.uid);
//             } else {
//                 setAssets([]);
//             }
//             setLoading(false);
//         });

//         return () => unsubscribe();
//     }, []);

//     const handleSignOut = () => {
//         auth.signOut().then(() => {
//             history.push('/');
//         });
//     };

//     return (
//         <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px 20px', backgroundColor: '#333', color: '#fff', position: 'relative' }}>
//                 <a href="/" style={{ display: 'flex', flexDirection: 'row', gap: '18px', alignItems: 'center', justifyContent: 'center' }}>
//                     <GiFairyWings size={37} color="#6d32ec" />
//                     <span style={{ margin: '0', textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>Smart QR</span>
//                 </a>
//                 <div style={{ position: 'absolute', right: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
//                     <FaUserCircle size={20} color="#fff" />
//                     <span>{displayName}</span>
//                     <button onClick={handleSignOut} style={{ background: '#fff', color: '#333' }}>Sign Out</button>
//                     <button onClick={handleVault} style={{ background: '#fff', color: '#333' }}>Vault</button>
//                 </div>
//             </div>

//             <div style={{ padding: '40px', textAlign: 'center' }}>
//                 {loading ? (
//                     <p style={{ fontSize: '18px', color: '#666' }}>Loading...</p>
//                 ) : (
//                     <div>
//                         {assets.length > 0 ? (
//                             assets.map((asset, index) => (
//                                 <div key={index} style={{ margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', width: '300px', textAlign: 'left' }}>
//                                     <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px 0' }}>{asset.fileName}</p>
//                                     <a href={asset.fileURL} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', display: 'block', marginBottom: '10px' }}>View File</a>
//                                     <button 
//                                         onClick={() => handleDelete(asset.fileName, asset.id)}
//                                         style={{ background: '#ff4d4d', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             ))
//                         ) : (
//                             <p style={{ fontSize: '18px', color: '#666' }}>No assets found.</p>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ManageAssetsPage;
