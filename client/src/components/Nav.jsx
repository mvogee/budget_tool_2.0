import React from "react";
import {Link} from "react-router-dom";

function Nav(props) {



    function logoutbtn() {
        // make user log out
        alert("logout btn was pressed");
    }
    return (
        <nav className="main-nav">
            <Link id="overview" className="nav-item authOnly" to="/overview">Overview</Link>
            <Link id="budgets" className="nav-item authOnly" to="/budgets">Budgets</Link>
            <Link id="income" className="nav-item authOnly" to="/income">Your Income</Link>
            <Link id="thisMonth" className="nav-item authOnly" to="/thisMonth">Tracker</Link>
            <Link id="profile" className="nav-item nav-secondary authOnly" to="/profile">{props.userName}</Link>
            <button id="logout-button" className="nav-secondary" onClick={logoutbtn}>log out</button> {/* all buttons will go to javascript handlers. */}
        </nav>
    );
}

export default Nav;
