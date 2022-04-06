import {React} from "react"

function DepositsDisplay(props) {

    function deleteBtn(event) {
        console.log("delete button was pressed");
        console.log(event.itemName);
    }

    function editBtn(event) {
        console.log("edit button was pressed");
        console.log(event.itemAmount);
    }

    function getStandardDateFormat(date) {
        date = new Date(date);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let fullDate = (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day) + "/" + year;
        return(fullDate)
    }

    function depositLineItem(item) {
        return (
            <tr key={item.id}>
                <td className="depositDescription">{item.inDescription}</td>
                <td className="depositAmount">${parseFloat(item.amount).toFixed(2)}</td>
                <td className="depositDate">{getStandardDateFormat(item.depositDate)}</td>
                <td className="editNode">
                    <button className="editButton"
                        id={item.id}
                        itemname={item.inDescription}
                        itemamount={item.amount}
                        itemdate={item.depositDate}
                        onClick={editBtn}
                        type="button"
                        >Edit
                    </button>
                </td>
                <td>
                    <button className="deleteButton"
                        id={item.id}
                        itemname={item.inDescription}
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
                    {props.depositList ? props.depositList.map(depositLineItem) : null}
                </tbody>
            </table>
        </div>
    );
}

export default DepositsDisplay;