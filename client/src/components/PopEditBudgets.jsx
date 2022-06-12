import React from "react";
import {sendData} from "./serverCommunications.js";
import '../styles/popup.css';

function PopEditBudgets(props) {
    
    function closePopup() {
        props.setEditCategoryInput("");
        props.setEditBudgetInput(0);
        props.setIdxEdit(null);
        props.setDisplayPopup(false);
    }
    function updateLocalData() {
        props.setTotalBudgeted((prevVal) => {
            return (prevVal - parseFloat(props.budgetList[props.idxEdit].budget) + parseFloat(props.editBudgetInput));
        });
        props.setBudgetList((prevVal) => {
            let newList = Array.from(prevVal);
            newList[props.idxEdit].category = props.editCategoryInput;
            newList[props.idxEdit].budget = parseFloat(props.editBudgetInput);
            return (newList);
        });
    }

    async function updateServer() {
        let data = {category: props.editCategoryInput, budgeted: props.editBudgetInput, itemId: props.budgetList[props.idxEdit].id};
        let url = "/service/budgets";
        const reData = await sendData(url, "PATCH", data);
        console.log(reData);
        closePopup();
    }

    function submitBtn(event) {
        event.preventDefault();
        updateLocalData();
        updateServer();
        
    }

    function cancelBtn(event) {
        closePopup();
        // close the popup
    }

    function updateCatInput(event) {
        props.setEditCategoryInput(event.target.value);
    }

    function updateBudgetInput(event) {
        props.setEditBudgetInput(event.target.value);
    }

    return (
        <div className= {props.displayPopup ? "popup-container popDisplay" : "popup-container popDisplayNone"}>
            <div className="popupEdit">
                <form className="popEditForm">
                    <p>Edit Category</p>
                    <div className="input_div">
                        <label htmlFor="category">Category</label>
                        <input type="text" autoComplete="off" name="category" onChange={updateCatInput} value={props.editCategoryInput} autoFocus required/>
                    </div>
                    <div className="input_div">
                        <label htmlFor="budgeted">Budget</label>
                        <input type="number" step=".01" name="budgeted" onChange={updateBudgetInput} value={props.editBudgetInput} required />
                    </div>
                    <button className="submitBtn buttons-secondary" type="submit" onClick={submitBtn}>Save</button>
                    <button className="cancelBtn buttons-secondary" type="reset" onClick={cancelBtn}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default PopEditBudgets;