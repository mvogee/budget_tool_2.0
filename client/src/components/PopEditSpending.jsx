import { React } from "react";
import {sendData} from "./serverCommunications.js";
import "../styles/popup.css";
function PopEditSpending(props) {

    function updateLocalItem() {
        let newItem = {id: props.purchaseList[props.idxEdit].id, userId: props.purchaseList[props.idxEdit].userId, itmDescription: props.nameEdit, amount: props.amountEdit, category: parseInt(props.categoryEdit), purchaseDate: props.dateEdit + "T07:00:00.000Z"};
        let purchaseListCopy = Array.from(props.purchaseList);
        purchaseListCopy[props.idxEdit] = newItem;
        props.setPurchaseList(purchaseListCopy);
    }

    async function updateServer() {
        let data = {itemName: props.nameEdit, amount: props.amountEdit, category: props.categoryEdit, date: props.dateEdit, itmId: props.purchaseList[props.idxEdit].id};
        let url = "/service/monthSpending";
        const reData = await sendData(url, "PATCH", data);
        if (!reData.success) {
            console.error(reData.message);
        }
        closePopup();
    }
    function submitBtn(event) {
        event.preventDefault();
        updateLocalItem();
        updateServer();
    }
    function closePopup() {
        props.setNameEdit("");
        props.setAmountEdit("");
        props.setCategoryEdit(0);
        props.setDateEdit("");
        props.setDisplayPopup(false);
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
        <div className={props.displayPopup ? "popup-container popDisplay" : "popup-container popDisplayNone"}>
            <div className="popupEdit">
                <form id="spendingItem" className="SpendingForm popEditForm">
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
                    <button type="submit" name="button" onClick={submitBtn}>Save</button>
                    <button type="button" name="cancelBtn" onClick={closePopup}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default PopEditSpending;