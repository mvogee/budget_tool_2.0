import { React, useState} from "react";
import {getCategoryName} from "./utils.js";
function PopEditSpending(props) {

    function submitBtn(event) {

    }
    function cancelBtn(event) {

    }
    function selectOptions(item) {
        return (
            <option key={item.id} value={item.id} >{item.category}</option>
        );
    }
    function nameChange(event) {
        props.setNameEdit(event.target.value);
    }
    function amountChange(event) {
        props.setAmountEdit(event.target.value);
    }
    function categoryChange(event) {
        props.setCategoryEdit(event.target.value);
    }
    function dateChange(event) {
        props.setDateEdit(event.target.value);
    }
    return (
        <div className="editForm">
            <form id="spendingItem" className="SpendingForm">
                <div className="input_div">
                    <label htmlFor="itemName">Description</label>
                    <input type="text" name="itemName" value={props.nameEdit} onChange={nameChange} required autoFocus />
                </div>
                <div className="input_div">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" step="0.01" name="amount" value={props.amountEdit} onChange={amountChange}required />
                </div>
                <div className="input_div">
                    <label htmlFor="category">Category</label>
                    <select name="category" value={props.categoryEdit} onChange={categoryChange}>
                        <option value="0" key="0">un-categorized</option>
                        {props.budgets ? props.budgets.map(selectOptions) : null}
                    </select>
                </div>
                <div className="input_div">
                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" value={props.dateEdit} min="2010-01-01" onChange={dateChange}/> { /*max should be today */}
                </div>
                <button type="submit" name="button" onClick={submitBtn}>add</button>
                <button type="button" name="cancelBtn" onClick={cancelBtn}>Cancel</button>
            </form>
        </div>
    );
}

export default PopEditSpending;