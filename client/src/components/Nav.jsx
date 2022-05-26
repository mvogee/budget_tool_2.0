import React from "react";
import {Link, useNavigate} from "react-router-dom";
import "../styles/nav.css";

function Nav(props) {
    const navigate = useNavigate();

    function logoutbtn() {
        // make user log out
        alert("logout btn was pressed");
        let opts = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        };
        fetch("/logout", opts);
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
                    <Link id="income" className="nav-item authOnly" to="/income">Your Income</Link>
                </li>
                <li>
                    <Link id="thisMonth" className="nav-item authOnly" to="/thisMonth">Tracker</Link>
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
