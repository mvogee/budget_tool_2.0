import React from "react";
import {Link} from "react-router-dom";

function Login(props) {

    function submitBtn(event) {
        event.preventDefault();
        alert("submit btn was pressed");
        // handle logging in. user should be authenticated and redirected to the overview page.
    }
    function emailChange(event) {
        console.log(event.target.value);
    }
    function passwordChange(event) {
        console.log(event.target.value);
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <p className="infoText secondary-text">Enter your details below to continue.</p>
            <form id="loginForm" className="login-form" name="login">
                <input type="email" name="email" id="loginEmailInput" autoComplete="off" placeholder="Email" onChange={emailChange} value="" />
                <input type="password" name="password" id="loginPassInput" autoComplete="off" placeholder="Password" onChange={passwordChange} value="" />
                <button type="submit" onClick={submitBtn}>Login</button>
            </form>
            <p className="create-acc secondary-text">Don't have a login? <Link className="creat-acc-link" to="/createAcc">Sign up!</Link></p>

        </div>
    );
}

export default Login;
