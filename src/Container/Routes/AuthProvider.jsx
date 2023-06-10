import React, { createContext, useEffect, useState } from 'react';
import app from './firebase.config';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const authInfo = {
        user,
        loading
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