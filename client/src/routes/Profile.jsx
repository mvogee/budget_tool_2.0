import {React, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import checkAuth from "../checkAuth";
import { sendData } from "../components/serverCommunications";
import "../styles/profile.css";


function Profile(props) {
    const [newPw, setNewPw] = useState("");
    const [confPw, setConfPw] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = async () => {
            let auth = await checkAuth(props.setUser);
            if (!auth) {
                navigate("/login");
            }
        }
        authenticate();
    }, [navigate, props.setUser]);

    function changeEmailButton(event) {
        event.preventDefault();
        if (window.confirm("Update email?") === true) {
            changeEmailRequest();
        }
        
    }

    async function changeEmailRequest() {
        let auth = await checkAuth(props.setUser);
        if (auth) {
            const data = {newEmail: newEmail};
            let url = "/service/updateEmail";
            const reData = await sendData(url, "PATCH", data);
            if (reData.success) {
                setMessage("Email updated!");
            }
            else {
                setMessage("Oops! Something went wrong. Please try again.")
            }
            console.log(reData);
            clearForm();
        }
        else {
            navigate("/login");
        }
    }

    async function changePasswordRequest() {
        let auth = await checkAuth(props.setUser);
        if (auth) {
            const data = {newPw: newPw};
            let url = "/service/updatePassword";
            const reData = await sendData(url, "PATCH", data);
            if (reData.success) {
                setMessage("Password updated!");
            }
            else {
                setMessage("Oops! Something went wrong. Please try again.")
            }
            console.log(reData);
            clearForm();
        }
        else {
            navigate("/login");
        }
    }

    function passwordChangeButton(event) {
        event.preventDefault();
        if ((newPw === confPw) && (window.confirm("Change password?") === true)) {
            changePasswordRequest();
        }
        else {
            if (newPw !== confPw) {
                setMessage("The passwords did not match. Please try again.");
            }
        }
    }

    function clearForm() {
        setConfPw("");
        setNewPw("");
        setNewEmail("");
    }

    function emailInput(event) {
        setNewEmail(event.target.value);
    }
    function newPwInput(event) {
        setNewPw(event.target.value);
    }
    function confPwInput(event) {
        setConfPw(event.target.value);
    }
    return (
        <div className="profile">
            <h1>Profile</h1>
            <p className="top-stats">User name: {props.user ? props.user.username : "Loading ..."}</p>
            <p className="top-stats">Email: {props.user ? props.user.email : "Loading ..."}</p>
            <h3 className="">{message}</h3>
            <form className="emailChangeForm form_div">
                <div className="input_div">
                    <label htmlFor="emailChange">Change email</label>
                    <input id="emailChange" type="email" className="emailChangeInput" placeholder="new email address." value={newEmail} onChange={emailInput}></input>
                </div>
                <button type="button" onClick={changeEmailButton}>Update</button>
            </form>
            <form className="pwChangeForm form_div">
                <div className="input_div">
                    <label htmlFor="newPW">New password</label>
                    <input id="newPW" type="password" placeholder="New password" value={newPw} onChange={newPwInput} autoComplete="true"></input>
                </div>
                <div className="input_div">
                    <label htmlFor="confirmPW">Confirm new password</label>
                    <input id="confirmPW" type="password" placeholder="Retype new password" value={confPw} onChange={confPwInput} autoComplete="true" ></input>
                </div>
                <button type="button" onClick={passwordChangeButton}>Update</button>
            </form>
        </div>
    );
}

export default Profile;
