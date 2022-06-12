import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {requestData} from "./serverCommunications.js";
import "../styles/nav.css";

function Nav(props) {
    const navigate = useNavigate();

    function logoutbtn() {
        let url = "/service/logout";
        requestData(url);
        props.setUser(null);
        navigate("/login");
    }
    return (
        <nav className="main-nav">
            <ul>
                <li>
                    <Link id="overview" className="nav-item authOnly" to="/overview">Overview</Link>
                </li>
                <li>
                    <Link id="budgets" className="nav-item authOnly" to="/budgets">Budgets</Link>
                </li>
                <li>
                    <Link id="income" className="nav-item authOnly" to="/income">Income</Link>
                </li>
                <li>
                    <Link id="thisMonth" className="nav-item authOnly" to="/thisMonth">Track</Link>
                </li>
                <li>
                    <Link id="profile" className="nav-item nav-secondary authOnly" to="/profile">{props.userName}</Link>
                </li>
            </ul>
            <button id="logout-button" className="nav-secondary" onClick={logoutbtn}>log out</button> {/* all buttons will go to javascript handlers. */}
        </nav>
    );
}

export default Nav;
