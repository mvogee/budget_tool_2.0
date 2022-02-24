import React from "react";

function PopEditBudgets(props) {
    
    function submitBtn(event) {
        event.preventDefault();
        alert("submit button was pressed");
        // send the updated fields to server and close popup.
    }

    function cancelBtn(event) {
        alert("cancel button was pressed");
        // close the popup
    }

    return (
        <div className="popEdit">
            <form className="popEditForm">
                <div className="input_div">
                    <label htmlFor="category">Category</label>
                    <input type="text" autoComplete="off" name="category" placeholder="Category Name" autofocus required/>
                </div>
                <div className="input_div">
                    <label htmlFor="budgeted">Budget</label>
                    <input type="number" step=".01" name="budgeted" placeholder="100.00" value="" required />
                </div>
                <button className="submitBtn buttons-secondary" type="submit" onClick={submitBtn}>Save</button>
                <button className="cancelBtn buttons-secondary" type="reset" onClick={cancelBtn}></button>
            </form>
        </div>
    );
}

export default PopEditBudgets;