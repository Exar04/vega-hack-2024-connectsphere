import React, { useContext, useEffect, useState } from "react"
import {auth, db} from "../config/firebase"
import { addDoc, collection} from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { useCreateUser } from "../hooks/CreateUser"


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()

    function signup(email, password, username, userType) {
      return createUserWithEmailAndPassword(auth, email, password).then(
        (cred) => {
          // useCreateUser(cred.user.uid)
          const userCollectionRef = collection(db, "users");
          addDoc(userCollectionRef, {
            userId: cred.user.uid,
            posts: {},
            events:{},
            followers:[],
            following:[],
            userEmail: cred.user.email,
            username: username,
            userType: userType,
            bio:"",
          });
        }
      );
    }

    function login(email, password) {
      return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    },[])

    const value = {
        currentUser,
        signup,
        login,
        logOut
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}