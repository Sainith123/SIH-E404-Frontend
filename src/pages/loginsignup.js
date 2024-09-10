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
            <Text style={{color :'#fff'}}>Welcome, {user.displayName}</Text>
            {isSigningUp ? (
              <>
                <Input
                  type="date"
                  value={dob}
                  onChange={handleDobChange}
                  className="signin-input"
                />
                <Button  style={{ 
                        background: '#4CAF50', 
                        color: '#fff', 
                        padding: '10px 20px', 
                        borderRadius: '5px', 
                        marginBottom: '20px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }} onClick={handleSaveAge}>
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