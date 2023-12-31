import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'

export const AuthContext = createContext()
const auth = getAuth(app)

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userRole, setUserRole] = useState(null);


    // sign up
    const createUserByEmailAndPass = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // signin
    const signInByEmailAndPass = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // sign withgoogle

    const signInByGoogle = (googleProvider) => {
        return signInWithPopup(auth, googleProvider)
    }

    // log out

    const logOut = () => {
        return signOut(auth)
    }

    //update user

    const updateUser = userInfo => {
        return updateProfile(auth.currentUser, userInfo)
    }

  // storing current user info
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false)
                ;
        });

        return () => {
            return unsubscribe();
        }
    }, [])

// checking user role
   useEffect(() => {
    if (user && user.email) {
      fetch(`https://shopify-snqy.onrender.com/api/v1/get-user/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
          setUserRole(data.role || "Buyer");
          
        })
        .catch((error) => {
          console.error("Error fetching user role:", error);
        });
    } else {
      // If user is not authenticated or missing UID, assume the role is "Buyer"
      setUserRole("Buyer");
    }
  }, [user]);

  //passable props
  const authInfo = { loading, 
    user, 
    createUserByEmailAndPass, 
    updateUser, 
    signInByEmailAndPass, 
    logOut, 
    signInByGoogle,
    userRole}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>

    );
};

export default UserContext;