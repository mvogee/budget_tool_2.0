import React from "react";

function Nav(props) {
    return (
        <div className="nav">
            <nav className="main-nav">
                <ul>
                    <li id="overview-li">
                        <a href="/overview">Overview</a>
                    </li>
                    <li id="budget-li">
                        <a href="/budgets">Budget</a>
                    </li>
                    <li id="income-li">
                        <a href="/income">Income</a>
                    </li>
                    <li id="thismonth-li">
                        <a href="/thisMonth">This month</a>
                    </li>
                </ul>
                <a id="username" class="nav-secondary" href="#">{props.userName}</a>
                <a id="logout-button" class="nav-secondary" href="/logout">log out</a> {/* all buttons will go to javascript handlers. */}
            </nav>
        </div>
    );
}

export default Nav;
