import React, { createContext, useEffect, useState } from 'react';
import app from './firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();


    const newUserLogin = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const handelLogin = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)

    }

    const googleLogin= () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }


    const logOut = () =>{
        signOut(auth)
    }

    const authInfo = {
        user,
        loading,
        handelLogin,
        newUserLogin,
        googleLogin,
        logOut,

    }
    useEffect(() => {
        const unSubscribed = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            return unSubscribed()
        }
    }, [])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>

    );
};

export default AuthProvider;