import React from "react";
import {Link} from "react-router-dom";

function GuestNav(props) {
    return (
        <nav className="main-nav">
            <Link id="landingPage" className="nav-item" to="/landingPage">Home</Link>
            <Link id="login" className="nav-item" to="/login">Log In</Link>
            <Link id="createAcc" className="nav-item" to="/createAcc">Create Account</Link>
        </nav>
    );
}

export default GuestNav;
