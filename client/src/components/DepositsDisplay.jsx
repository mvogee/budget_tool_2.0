import {React, useState} from "react"

function DepositsDisplay(props) {

    function deleteBtn(event) {
        console.log("delete button was pressed");
        console.log(event.itemName);
    }

    function editBtn(event) {
        console.log("edit button was pressed");
        console.log(event.itemAmount);
    }

    function depositLineItem(item) {
        return (
            <tr>
                <td className="depositDescription">{item.inDescription}</td>
                <td className="depositAmount">{item.amount}</td>
                <td className="depositDate">{item.date}</td>
                <td className="editNode">
                    <button className="editButton"
                        itemId={item.id}
                        itemName={item.inDescription}
                        itemAmount={item.amount}
                        itemDate={item.date}
                        onClick={editBtn}
                        type="button"
                        >Edit
                    </button>
                </td>
                <td>
                    <button className="deleteButton"
                        itemId={item.id}
                        itemName={item.inDescription}
                        onClick={deleteBtn}
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
                    {props.deposits ? props.deposits.forEach(depositLineItem) : null}
                </tbody>
            </table>
        </div>
    );
}

export default DepositsDisplay;