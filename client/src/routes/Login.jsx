import {React, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { sendData } from "../components/serverCommunications";
import '../styles/login.css';

function Login(props) {
    const [message, setMessage] = useState("Enter your details below to continue.");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();
    
    async function attemptLogin() {
        let data = {email: email, password: pw};
        let url = "/service/login"
        const reData = await sendData(url, "POST", data);
        if (await reData.success) {
            props.setUser(reData.obj);
            navigate("/overview");
        }
        else {
            setMessage("Failed to log in. Incorrect email or password.");
        }
    }

    function submitBtn(event) {
        event.preventDefault();
        attemptLogin();
    }
    function emailChange(event) {
        setEmail(event.target.value);
    }
    function passwordChange(event) {
        setPw(event.target.value);
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <p className="infoText secondary-text">{message}</p>
            <form id="loginForm" className="login-form" name="login">
                <input type="email" name="email" id="loginEmailInput" autoComplete="off" placeholder="Email" onChange={emailChange} value={email} />
                <input type="password" name="password" id="loginPassInput" autoComplete="off" placeholder="Password" onChange={passwordChange} value={pw} />
                <button type="submit" onClick={submitBtn}>Login</button>
            </form>
            <p className="create-acc secondary-text">Don't have a login? <Link className="creat-acc-link" to="/createAcc">Sign up!</Link></p>

        </div>
    );
}

export default Login;
