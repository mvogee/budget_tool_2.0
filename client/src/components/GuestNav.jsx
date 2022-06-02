import React from "react";
import {Link} from "react-router-dom";

function GuestNav(props) {
    return (
        <nav className="main-nav">
            <ul>
                <li><Link id="landingPage" className="nav-item guestNav" to="/landingPage">Home</Link></li>
                <li><Link id="login" className="nav-item guestNav" to="/login">Log In</Link></li>
                <li><Link id="createAcc" className="nav-item guestNav" to="/createAcc">Create Account</Link></li>
            </ul>
        </nav>
    );
}

export default GuestNav;
