import React from "react";
import {Link} from "react-router-dom";

function Nav(props) {
    function logoutbtn() {
        // make user log out
        alert("logout btn was pressed");
    }
    return (
        <nav className="main-nav">
            <Link to="/overview">Overview</Link>
            <Link to="/budgets">Budgets</Link>
            <Link to="/income">Your Income</Link>
            <Link to="/thisMonth">Tracker</Link>
            <Link to="profile" id="username" className="nav-secondary">{props.userName}</Link>
            <button id="logout-button" class="nav-secondary" onClick={logoutbtn}>log out</button> {/* all buttons will go to javascript handlers. */}
        </nav>
    );
}

export default Nav;
