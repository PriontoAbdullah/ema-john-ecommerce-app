import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import React, { useState, createContext, useContext, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext); // return


export const PrivateRoute = ({ children, ...rest }) => {  // Private Routing  
    const auth = useAuth(); // call hook

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (children) :
                    (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { form: location }
                            }}
                        >

                        </Redirect>
                    )
            }
        >

        </Route>
    )
}


const getUser = user => {
    const { displayName, email, photoURL } = user;
    return { name: displayName, email, photo: photoURL };
}

const Auth = () => {

    const [user, setUser] = useState(null);

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        return firebase.auth().signInWithPopup(provider)
            .then(result => {
                // console.log(result);
                const signedInUser = getUser(result.user);
                setUser(signedInUser);
                return result.user;
            })
            .catch(error => {
                console.log(error);
                setUser(null);
                return error.message;
            })
    }

    const signOut = () => {

        return firebase.auth().signOut()
            .then(result => {
                setUser(null);
                return true;
            })
            .catch(error => {
                console.log(error);
                return error.message;
            })
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const currentUser = getUser(user);
                // console.log(currentUser)
                setUser(currentUser);
            }
            else {
                // no user is signed in
            }
        })
    }, [])

    return {
        user,
        signInWithGoogle,
        signOut
    }

}

export default Auth;