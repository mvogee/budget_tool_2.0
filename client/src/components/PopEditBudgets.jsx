import React from "react";

function PopEditBudgets(props) {
    
    function submitBtn(event) {
        event.preventDefault();
        alert("submit button was pressed");
        // send the updated fields to server and close popup.
    }

    function cancelBtn(event) {
        props.setEditCategoryInput("");
        props.setEditBudgetInput(0);
        props.setIdxEdit(null);
        // close the popup
    }

    function updateCatInput(event) {
        props.setEditCategoryInput(event.target.value);
    }

    function updateBudgetInput(event) {
        props.setEditBudgetInput(event.target.value);
    }

    return (
        <div className="popEdit">
            <p>Edit Category</p>
            <form className="popEditForm">
                <div className="input_div">
                    <label htmlFor="category">Category</label>
                    <input type="text" autoComplete="off" name="category" onChange={updateCatInput} value={props.editCategoryInput} autofocus required/>
                </div>
                <div className="input_div">
                    <label htmlFor="budgeted">Budget</label>
                    <input type="number" step=".01" name="budgeted" onChange={updateBudgetInput} value={props.editBudgetInput} required />
                </div>
                <button className="submitBtn buttons-secondary" type="submit" onClick={submitBtn}>Save</button>
                <button className="cancelBtn buttons-secondary" type="reset" onClick={cancelBtn}>Cancel</button>
            </form>
        </div>
    );
}

export default PopEditBudgets;