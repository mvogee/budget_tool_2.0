import React from 'react';
import "../styles/profile.css";

/* TODO:
*   - State handlers for forms
*   - Handler for submit button to update password.
*   - Use login route to verify password is correct. should get it back in response.success
*/

function Profile(props) {

    function changeEmailButton(event) {
        event.preventDefault();
        alert("email was changed");
    }

    function passwordChangeButton(event) {
        event.preventDefault();
        alert("password was changed");
    }

    return (
        <div className="profile">
            <h1>Profile</h1>
            <p className="top-stats">User name: {props.user ? props.user.username : "Loading ..."}</p>
            <p className="top-stats">Email: {props.user ? props.user.email : "Loading ..."}</p>
            <form className="emailChangeForm form_div">
                <div className="input_div">
                    <label htmlFor="emailChange">Change email</label>
                    <input id="emailChange" className="emailChangeInput" placeholder="new email address."></input>
                </div>
                <button type="button" onClick={changeEmailButton}>Update</button>
            </form>
            <form className="pwChangeForm form_div">
                <div className="input_div">
                    <label htmlFor="oldPW">Old password.</label>
                    <input id="oldPW" type="password" placeholder="Your current password"></input>
                </div>
                <div className="input_div">
                    <label htmlFor="newPW">New password</label>
                    <input id="newPW" type="password" placeholder="New password"></input>
                </div>
                <div className="input_div">
                    <label htmlFor="confirmPW">Confirm new password</label>
                    <input id="confirmPW" type="password" placeholder="Retype new password"></input>
                </div>
                <button type="button" onClick={passwordChangeButton}>Update</button>
            </form>
        </div>
    );
}

export default Profile;
