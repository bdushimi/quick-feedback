import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from './firebase'

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth(); // custom hook
    return <authContext.Provider value={auth}>{ children }</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}


const useProvideAuth = () => {
    const [user, setUser] = useState(null);

    const signInWithGithub = () => {
        const provider = new firebase.auth.GithubAuthProvider();
        return firebase
            .auth()
            .signInWithPopup(provider)
            .then((response) => {
                setUser(response.user);
                return response.user
        })
    }


    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(null)
            })
    }


    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user)
                setUser(user);
            else
                setUser(false)
        })

        return () => unsubscribe()

    }, [])

    return {
        user,
        signInWithGithub,
        signout
    }

}
                                                                                                                                                                                                              
