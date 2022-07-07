import React from "react";
import {Link} from "react-router-dom";
import '../styles/landingPage.css';

function LandingPage(props) {
    return (
        <div className="landingPage home_page_wrapper">
            <h1>Budget Tool</h1>
            <p className="secondary-text">Welcome to the Budgeting Tool!</p>

            <Link className="create-acc-btn" to="/createAcc">Start Your Budget!</Link>

            <div className="description_wrapper">
                <p className="secondary-text">Create and manage your budget in a simple and easy to use platform.</p>
                <ul>
                    <li className="secondary-text">Easy to understand overview of your budget.</li>
                    <li className="secondary-text">Create spending categories.</li>
                    <li className="secondary-text">Monthly income calculations.</li>
                    <li className="secondary-text">Track your monthly income and spending.</li>
                </ul>
            </div>
            <h3>Overview and stats</h3>
            <img src={require("../img/OverviewScreenshot.png")} alt="Screenshot of overview page." />
            <hr/>
            <h3>Monthly tracking</h3>
            <img src={require("../img/ThisMonthScreenshot.png")} alt="Screenshot of Monthly tracking." />
            <hr/>
            <h3>Easy budget building</h3>
            <img src={require("../img/BudgetScreenshot.png")} alt="Screenshot of budget building." />
            <Link className="create-acc-btn" to="/createAcc">Start Your Budget!</Link>
        </div>
    );
}

export default LandingPage;
