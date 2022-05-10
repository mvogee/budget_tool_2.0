import {React} from "react";



function PopEditDeposit(props) {
    async function updateServer() {
        let data = {itmId: props.depositList[props.idxEdit].id, itemName: props.nameEdit, amount: props.amountEdit, date: props.dateEdit};
        console.log("Updating the server");
        let url = "/monthIncome";
        let opts = {
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data) // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        };

        const response = await fetch(url, opts);
        const reData = await response.json();
        console.log(reData);
        closePopup();
    }

    function updateLocalItem() {
        console.log("updating local deposit");
        props.setTotalIncome((parseFloat(props.totalIncome)) + (parseFloat(props.amountEdit)) - (parseFloat(props.depositList[props.idxEdit].amount)));
        let newItem = {id: props.depositList[props.idxEdit].id, userId: props.depositList[props.idxEdit].userId, inDescription: props.nameEdit, amount: props.amountEdit, depositDate: props.dateEdit + "T07:00:00.000Z"};
        let depositListCopy = Array.from(props.depositList);
        depositListCopy[props.idxEdit] = newItem;
        props.setDepositList(depositListCopy);
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
        // needs to set the boolean to close popup.
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
        <div className="PopEditDeposit">
        <form className="income-form">
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
    );
}

export default PopEditDeposit;