import React from 'react';

/* TODO:
*   - display username
*   - display email
*   - email change form.
*   - password change form
*   - State handlers for forms
*   - Handnler for submit button to update password.
*/


function getUser() {
    // make authentication call to server.
    // if user is retrieved display content.
    // if user is not retrieved redirect user to login page.
    return ({id: 1, userName: "Mvogee", email: "mvogee@email.com", password: "xlksdjflksdj"});
}

function Profile(props) {

    let user = getUser();    

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
            <p>userName: { user.userName }</p>
            <p>Email: {user.email}</p>
            <form className="emailChangeForm">
                <label htmlFor="emailChange">Change email</label>
                <input id="emailChange" className="emailChangeInput" placeHolder="new email address."></input>
                <button type="submit" onClick={changeEmailButton}>Change Email</button>
            </form>
            <form className="pwChangeForm">
                <label htmlFor="oldPW">Old password.</label>
                <input id="oldPW" type="password" placeholder="Your current password"></input>
                <label htmlFor="newPW">New password</label>
                <input id="newPW" type="password" placeholder="New password"></input>
                <label htmlFor="confirmPW">Confirm new password</label>
                <input id="confirmPW" type="password" placeholder="Retype new password"></input>
                <button type="submit" onClick={passwordChangeButton}>Change Password</button>
            </form>
        </div>
    );
}

export default Profile;
