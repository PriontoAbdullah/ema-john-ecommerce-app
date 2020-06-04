import React from 'react';
import Auth from './useAuth';

const Login = () => {

    const auth = Auth();
    // console.log(auth.signInWithGoogle);
    const handleSignIn = () => {
        auth.signInWithGoogle()
            .then(response => {
                console.log('Redirect Now');
                window.location.pathname = '/review';  // Location API
                // useHistory = hook, useLocation=hook , History API
            })
    }

    const handleSignOut =() => {
        auth.signOut()
        .then(response => {
            window.location.pathname='/';
        })
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {
                auth.user ? <button onClick={handleSignOut}>Sign Out</button> :
                    <button onClick={handleSignIn}>Sign in with Google</button>
            }
        </div>
    );
};

export default Login;