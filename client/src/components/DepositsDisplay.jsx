import {React, useState} from "react"
import {getStandardDateFormat, getDateEdit} from "./utils.js";
import PopEditDeposit from "./PopEditDeposit";
import {sendData} from "./serverCommunications.js";

function DepositsDisplay(props) {

    const [nameEdit, setNameEdit] = useState("");
    const [amountEdit, setAmountEdit] = useState(0);
    const [dateEdit, setDateEdit] = useState("");
    const [idxEdit, setIdxEdit] = useState("");
    const [displayPopup, setDisplayPopup] = useState(false);

    async function deleteRequest(itemId) {
        let data = {deleteIncomeItm: itemId};
        let url = "/service/monthIncome";
        const reData = await sendData(url, "DELETE", data);
        if (reData.success) {
            console.info("item was deleted");
        }
    }

    function deleteItem(event) {
        if (window.confirm("Are you sure you want to delete " + event.target.dataset.name) === true) {
            deleteRequest(event.target.dataset.id);
            props.setTotalIncome(props.totalIncome - event.target.dataset.amount);
            props.setDepositList((prevList) => {
                let newList = Array.from(prevList);
                newList.splice(event.target.dataset.idx, 1);
                return (newList);
            });
        }
    }

    function editBtn(event) {
        setNameEdit(event.target.dataset.name);
        setAmountEdit(event.target.dataset.amount);
        setDateEdit(getDateEdit(event.target.dataset.date));
        setIdxEdit(event.target.dataset.idx);
        setDisplayPopup(true);
    }

    function depositLineItem(item, idx) {
        return (
            <tr key={item.id}>
                <td className="depositDescription">{item.inDescription}</td>
                <td className="depositAmount">${parseFloat(item.amount).toFixed(2)}</td>
                <td className="depositDate">{getStandardDateFormat(item.depositDate)}</td>
                <td className="editNode">
                    <button className="editButton"
                        data-id={item.id}
                        data-name={item.inDescription}
                        data-amount={item.amount}
                        data-date={item.depositDate}
                        data-idx={idx}
                        onClick={editBtn}
                        type="button"
                        >Edit
                    </button>
                </td>
                <td>
                    <button className="deleteButton"
                        data-id={item.id}
                        data-name={item.inDescription}
                        data-amount={item.amount}
                        data-idx={idx}
                        onClick={deleteItem}
                        type="button"
                        >Delete
                    </button>
                </td>
            </tr>
        );
    }
    // will still need to give popEdit the deposits total to update when updating a deposit
    return (
        <div className="depositDisplay">
        <PopEditDeposit
            displayPopup={displayPopup} setDisplayPopup={setDisplayPopup}
            depositList={props.depositList} setDepositList={props.setDepositList}
            totalIncome={props.totalIncome} setTotalIncome={props.setTotalIncome}
            nameEdit={nameEdit} setNameEdit={setNameEdit}
            amountEdit={amountEdit} setAmountEdit={setAmountEdit}
            dateEdit={dateEdit} setDateEdit={setDateEdit} idxEdit={idxEdit}
        />
            <table>
                <thead>
                    <tr>
                        <td>Description</td>
                        <td>Amount</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {props.depositList ? props.depositList.map(depositLineItem) : null}
                </tbody>
            </table>
        </div>
    );
}

export default DepositsDisplay;