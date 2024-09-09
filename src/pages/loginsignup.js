//  import React, { useState } from "react";
// import { useHistory } from 'react-router-dom'; // Import useHistory
// import theme from "theme";
// import { Theme, Link, Icon, Text, LinkBox, Box, Section, Button, Input } from "@quarkly/widgets";
// import { Helmet } from "react-helmet";
// import { GlobalQuarklyPageStyles } from "global-page-styles";
// import { Override } from "@quarkly/components";
// import { auth, provider, signInWithPopup, signOut, db, storage } from '../firebase'; // Import Firebase
// import { GiFairyWings } from "react-icons/gi";
// import { FiMenu } from "react-icons/fi";
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// export default (() => {
//     const history = useHistory(); // Initialize useHistory
//     const [user, setUser] = useState(null);
//     const [dob, setDob] = useState('');
//     const [isSigningUp, setIsSigningUp] = useState(false);

//     const signInWithGoogle = async () => {
//         try {
//             const result = await signInWithPopup(auth, provider);
//             const signedInUser = result.user;
//             const userDocRef = doc(db, 'users', signedInUser.uid);
//             const userDoc = await getDoc(userDocRef);

//             if (userDoc.exists()) {
//                 // User already exists
//                 setUser(signedInUser);
//                 history.push('/'); 
//             } else {
//                 // New user
//                 await setDoc(userDocRef, { 
//                     uid: signedInUser.uid, 
//                     displayName: signedInUser.displayName, 
//                     email: signedInUser.email 
//                 });
//                 setUser(signedInUser);
//                 setIsSigningUp(true); // Set to true for new users
//             }
//         } catch (error) {
//             console.log(error.message);
//         }
//     };

//     const handleSignOut = () => {
//         signOut(auth).then(() => {
//             setUser(null);
//             setIsSigningUp(false);
//         });
//     };

//     const handleDobChange = (event) => {
//         setDob(event.target.value);
//     };

//     const handleSaveAge = async () => {
//         if (dob && isAbove18(dob)) {
//             const age = calculateAge(dob);
//             const userDocRef = doc(db, 'users', user.uid);
//             await setDoc(userDocRef, { age }, { merge: true }); // Store age instead of DOB
//             setIsSigningUp(false); // Reset state after saving age
//             history.push('/'); // Redirect to Vault page
//         } else {
//             alert('You must be 18 or older to access this site.');
//         }
//     };

//     const isAbove18 = (birthdate) => {
//         const today = new Date();
//         const birthDate = new Date(birthdate);
//         let age = today.getFullYear() - birthDate.getFullYear();
//         const monthDiff = today.getMonth() - birthDate.getMonth();
//         if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//             age--;
//         }
//         return age >= 18;
//     };

//     const calculateAge = (birthdate) => {
//         const today = new Date();
//         const birthDate = new Date(birthdate);
//         let age = today.getFullYear() - birthDate.getFullYear();
//         const monthDiff = today.getMonth() - birthDate.getMonth();
//         if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//             age--;
//         }
//         return age;
//     };

//     React.useEffect(() => {
//         if (user) {
//             const checkUserDoc = async () => {
//                 const userDocRef = doc(db, 'users', user.uid);
//                 const userDoc = await getDoc(userDocRef);
//                 if (userDoc.exists() && userDoc.data().age) {
//                     setIsSigningUp(false); // User has age, so no need to prompt
//                     history.push('/'); // Redirect to Vault page
//                 }
//             };
//             checkUserDoc();
//         }
//     }, [user, history]);

//     return (
//         <Theme theme={theme}>
//             <GlobalQuarklyPageStyles pageUrl={"loginsignup"} />
//             <Helmet>
//                 <title>Quarkly export</title>
//                 <meta name={"description"} content={"Web site created using quarkly.io"} />
//                 <link rel={"shortcut icon"} href={"https://uploads.quarkly.io/readme/cra/favicon-32x32.ico"} type={"image/x-icon"} />
//             </Helmet>
//             <Section sm-padding="8px 0 8px 0" quarkly-title="Header-2">
//                 <Override slot="SectionContent" flex-direction="column" justify-content="space-between" align-items="center" lg-flex-direction="row" />
//                 <Box
//                     display="flex"
//                     padding="12px 0 18px 0"
//                     justify-content="center"
//                     align-items="flex-start"
//                     flex-direction="row"
//                     width="100%"
//                     sm-width="50%"
//                     sm-align-items="center"
//                     sm-flex-direction="row"
//                     sm-justify-content="flex-start"
//                     md-width="50%"
//                     lg-width="70%"
//                     md-justify-content="flex-start"
//                     lg-justify-content="flex-start"
//                 >
//                     <LinkBox flex-direction="row" href="/index" display="flex" grid-gap="18px">
//                         <Icon category="gi" icon={GiFairyWings} color="#6d32ec" size="37px" />
//                         <Text
//                             margin="0"
//                             md-margin="0px 0 0px 0"
//                             text-align="left"
//                             font="--headline3"
//                             sm-margin="0px 0 0px 0"
//                             display="block"
//                         >
//                             Smart QR
//                         </Text>
//                     </LinkBox>
//                 </Box>

//                 {user ? (
//                     <Box>
//                         <Text>Welcome, {user.displayName}</Text>
//                         {isSigningUp ? (
//                             <>
//                                 <Input
//                                     type="date"
//                                     value={dob}
//                                     onChange={handleDobChange}
//                                     placeholder="Enter your birthdate"
//                                 />
//                                 <Button onClick={handleSaveAge}>Save Age</Button>
//                             </>
//                         ) : (
//                             <Button onClick={handleSignOut}>Sign Out</Button>
//                         )}
//                     </Box>
//                 ) : (
//                     <Button onClick={() => signInWithGoogle()}>Sign in with Google</Button>
//                 )}
//             </Section>
//         </Theme>
//     );
// });




import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory
import { auth, provider, signInWithPopup, signOut, db } from "../firebase"; // Import Firebase
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Theme, Button, Input, Box, Text, Icon } from "@quarkly/widgets";
import { Helmet } from "react-helmet";
import { GiFairyWings } from "react-icons/gi";
import "../Signin.css"; // Import the new CSS file
import theme from './theme'; 

export default function SigninPage() {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [dob, setDob] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const signedInUser = result.user;
      const userDocRef = doc(db, "users", signedInUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setUser(signedInUser);
        history.push("/"); // Redirect after login
      } else {
        await setDoc(userDocRef, {
          uid: signedInUser.uid,
          displayName: signedInUser.displayName,
          email: signedInUser.email,
        });
        setUser(signedInUser);
        setIsSigningUp(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      setIsSigningUp(false);
    });
  };

  const handleDobChange = (event) => {
    setDob(event.target.value);
  };

  const handleSaveAge = async () => {
    if (dob && isAbove18(dob)) {
      const age = calculateAge(dob);
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, { age }, { merge: true });
      setIsSigningUp(false);
      history.push("/"); // Redirect after saving age
    } else {
      alert("You must be 18 or older to access this site.");
    }
  };

  const isAbove18 = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    if (user) {
      const checkUserDoc = async () => {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().age) {
          setIsSigningUp(false);
          history.push("/");
        }
      };
      checkUserDoc();
    }
  }, [user, history]);

  return (
    <Theme theme={theme}>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="signin-container">
        <GiFairyWings color="#6d32ec" size="50px" />
        <div className="signin-title">Smart QR</div>
        {user ? (
          <div className="signin-content">
            <Text>Welcome, {user.displayName}</Text>
            {isSigningUp ? (
              <>
                <Input
                  type="date"
                  value={dob}
                  onChange={handleDobChange}
                  className="signin-input"
                />
                <Button className="signin-button" onClick={handleSaveAge}>
                  Save Age
                </Button>
              </>
            ) : (
              <Button className="signin-button" onClick={handleSignOut}>
                Sign Out
              </Button>
            )}
          </div>
        ) : (
          <div className="signin-content">
            <button className="signin-button" onClick={signInWithGoogle}>
              <img src="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg" alt="Google" />
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </Theme>
  );
}