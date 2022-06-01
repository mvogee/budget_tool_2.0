import {React, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import '../styles/login.css';

function Login(props) {
    const [message, setMessage] = useState("Enter your details below to continue.");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();
    
    async function attemptLogin() {
        let data = {email: email, password: pw};
        let url = "/login"
        let opts = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data) // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        };
        const response = await fetch(url, opts);
        const reData = await response.json();
        console.log(reData);
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
        alert("submit btn was pressed");
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
