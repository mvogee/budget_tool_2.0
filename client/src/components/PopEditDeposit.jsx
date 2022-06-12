import {React} from "react";
import {sendData} from "./serverCommunications.js";
import "../styles/popup.css";

function PopEditDeposit(props) {
    async function updateServer() {
        let data = {itmId: props.depositList[props.idxEdit].id, itemName: props.nameEdit, amount: props.amountEdit, date: props.dateEdit};
        let url = "/service/monthIncome";
        const reData = await sendData(url, "PATCH", data);
        console.log(reData);
        closePopup();
    }

    function updateLocalItem() {
        console.log("updating local deposit");
        //props.setTotalIncome((parseFloat(props.totalIncome)) + (parseFloat(props.amountEdit)) - (parseFloat(props.depositList[props.idxEdit].amount)));
        props.setTotalIncome((prevVal) => {
            return (parseFloat(prevVal) + parseFloat(props.amountEdit) - (parseFloat(props.depositList[props.idxEdit].amount)));
        });
        let newItem = {id: props.depositList[props.idxEdit].id, userId: props.depositList[props.idxEdit].userId, inDescription: props.nameEdit, amount: props.amountEdit, depositDate: props.dateEdit + "T07:00:00.000Z"};
        props.setDepositList((prevList) => {
            let newDepositList = Array.from(prevList);
            newDepositList[props.idxEdit] = newItem;
            return (newDepositList);
        });
    }
    function submitBtn(event) {
        event.preventDefault();
        updateLocalItem();
        updateServer();
    }
    function closePopup() {
        props.setNameEdit("");
        props.setAmountEdit(0);
        props.setDateEdit("");
        props.setDisplayPopup(false);
    }
    function nameChange(event) {
        props.setNameEdit(event.target.value);
    }
    function amountChange(event) {
        props.setAmountEdit(event.target.value);
    }
    function dateChange(event) {
        props.setDateEdit(event.target.value);
    }
    return (
        <div className={props.displayPopup ? "popup-container popDisplay" : "popup-container popDisplayNone"}>
            <div className="popupEdit">
                <form className="income-form popEditForm">
                    <div className="input_div">
                        <label htmlFor="depositItemName">Name</label>
                        <input id="depositItemName" type="text" value={props.nameEdit} onChange={nameChange}></input>
                    </div>
                    <div className="input_div">
                        <label htmlFor="depositItemAmount">Amount</label>
                        <input id="depositItemAmount" type="number" value={props.amountEdit} onChange={amountChange}></input>
                    </div>
                    <div className="input_div">
                        <label htmlFor="depositItemDate">Date</label>
                        <input id="depositItemDate" type="date" value={props.dateEdit} onChange={dateChange}></input>
                    </div>
                    <button type="submit" onClick={submitBtn}>Save</button>
                    <button type="button" onClick={closePopup}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default PopEditDeposit;