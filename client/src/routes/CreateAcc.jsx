import React from "react";
import {Link} from "react-router-dom";

/* TODO:
*   - create state handlers for each input field.
*   - on submit button press submit the request to the server to create acccount
*/

function CreateAcc(props) {

    function submitBtn(event) {
        event.preventDefault();
        alert("submit button was pressed");
    }
    
    return (
        <div className="createAcc">
            <h1>Create Account</h1>
            <p className="infoText secondary-text">Create your account</p>
            <div className="new-acc">
                <form className="new-acc-form" id="newAccountForm" name="createAcc">

                    <label htmlFor="createEmailInput">Email</label>
                    <input type="email" name="email" id="createEmailInput" autoComplete="off" placeholder="Youremail@email.com" />
                    <label htmlFor="createUserNameInput">UserName</label>
                    <input type="text" name="userName" id="createUserNameInput" autoComplete="off" placeholder="User Name" />
                    <label htmlFor="createPasswordInput">Create a Password</label>
                    <input type="password" name="password" id="createPassInput" autoComplete="off" placeholder="Password" />
                    <label htmlFor="createPassConf">Confirm Password</label>
                    <input type="password" name="confirmpassword" id="createPassConf" autoComplete="off" placeholder="Retype password" />
                    <button type="submit" onClick={submitBtn}>Create Account</button>
                </form>
            </div>
            <p className="create-acc secondary-text">Already have an account?<Link className="creat-acc-link" to="/login"> Log In!</Link></p>
        </div>
    );
}

export default CreateAcc;
