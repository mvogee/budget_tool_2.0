import {React} from "react"
import {getStandardDateFormat} from "./utils.js";

function DepositsDisplay(props) {

    async function deleteRequest(itemId) {
        let data = {deleteIncomeItm: itemId};
        let url = "/monthIncome";
        let opts = {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        };
        const response = await fetch(url, opts);
        const reData = await response.json();
        console.log(reData);
        if (reData.success) {
            console.log("item was deleted");
        }
    }

    function deleteItem(event) {
        if (window.confirm("Are you sure you want to delete " + event.target.dataset.name) === true) {
            deleteRequest(event.target.dataset.id);
            props.setTotalIncome(props.totalIncome - event.target.dataset.amount);
            let newDepositList = props.depositList;
            newDepositList.splice(event.target.dataset.idx, 1);
            props.setDepositList(newDepositList);
        }
    }

    function editBtn(event) {
        console.log("edit button was pressed");
        console.log(event.itemAmount);
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

    return (
        <div className="depositDisplay">
            <p>Deposits</p>
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