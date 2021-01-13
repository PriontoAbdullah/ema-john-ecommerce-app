import React from 'react';
import logo from '../../images/logo.png';
import { useAuth } from '../Login/useAuth';
import './Header.css';

const Header = () => {

    const auth = useAuth();
    // console.log(auth.user)

    return (
        <div className="header">
            <img src={logo} alt="logo" />
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                {/* <a href="/inventory">Manage Inventory</a> */}
                {
                    auth.user && <span style={{ color: 'yellow' }}>Welcome {auth.user.name}</span>
                }
                {
                    auth.user ? <a href="/login"> Sign out</a>
                        : <a href="/login"> Sign in</a>
                }
            </nav>
        </div>
    );
};

export default Header;