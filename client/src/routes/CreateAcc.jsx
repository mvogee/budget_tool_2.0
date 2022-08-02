import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendData } from "../components/serverCommunications";
import "../styles/createAcc.css";

/* TODO:
*   - create state handlers for each input field.
*   - on submit button press submit the request to the server to create acccount
*/

function CreateAcc(props) {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [msgText, setMsgText] = useState(null)
    const navigate = useNavigate();
    
    async function createAccRequest() {
        let data = {
            password: password,
            email: email,
            userName: userName
        };
        const url = "/service/createAcc";
        const resData = await sendData(url, "POST", data);
        if (await resData.success) {
            navigate("/Login");
        }
        else {
            setMsgText("failed to create user. the username or email may already be taken.");
        }
    }

    function submitBtn(event) {
        event.preventDefault();
        alert("submit button was pressed");
        createAccRequest();
    }
    
    function updateEmailField(event) {
        setEmail(event.target.value);
    }
    function updateUserNameField(event) {
        setUserName(event.target.value);
    }
    function updatePasswordField(event) {
        setPassword(event.target.value);
    }
    function updateConfirmPwField(event) {
        setConfirmPw(event.target.value);
    }

    return (
        <div className="createAcc">
            <h1>Create Account</h1>
            <p className="infoText secondary-text">Create your account</p>
            {msgText ? <p>{msgText}</p> : null}
            <div className="new-acc">
                <form className="new-acc-form" id="newAccountForm" name="createAcc">

                    <label htmlFor="createEmailInput">Email</label>
                    <input type="email" name="email" id="createEmailInput" autoComplete="off" placeholder="Youremail@email.com" value={email} onChange={updateEmailField}/>
                    <label htmlFor="createUserNameInput">UserName</label>
                    <input type="text" name="userName" id="createUserNameInput" autoComplete="off" placeholder="User Name" value={userName} onChange={updateUserNameField}/>
                    <label htmlFor="createPasswordInput">Create a Password</label>
                    <input type="password" name="password" id="createPassInput" autoComplete="off" placeholder="Password" value={password} onChange={updatePasswordField}/>
                    <label htmlFor="createPassConf">Confirm Password</label>
                    <input type="password" name="confirmpassword" id="createPassConf" autoComplete="off" placeholder="Retype password" value={confirmPw} onChange={updateConfirmPwField}/>
                    <button type="submit" onClick={submitBtn}>Create Account</button>
                </form>
            </div>
            <p className="create-acc secondary-text">Already have an account?<Link className="creat-acc-link" to="/login"> Log In!</Link></p>
        </div>
    );
}

export default CreateAcc;
