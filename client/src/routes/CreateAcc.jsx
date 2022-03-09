import { React, useState } from "react";
import {Link} from "react-router-dom";

/* TODO:
*   - create state handlers for each input field.
*   - on submit button press submit the request to the server to create acccount
*/

function CreateAcc(props) {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState(""); 
    
    async function createAccRequest() {
        let data = {
            password: password,
            email: email,
            userName: userName
        };
        const url = "/createAcc";
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
        const resData = await response.json();
        console.log(resData);
        // if logged in go ahead and set user to returned user.
        // if failed display message
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
