import {React, useState} from "react"

function DepositForm(props) {
    let day = new Date().getDate();
    day = props.yearMonth + "-" + (day < 10 ? "0" + day.toString() : day.toString());
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(day);

    function clearForm() {
        setName("");
        setAmount(0);
        setDate(day);
    }

    function submitBtn(event) {
        event.preventDefault();
        sendData();
        clearForm();
    }

    function setListData(id) {
        let newDepositItem = {id: id, inDescription: name, amount: amount, depositDate: date};
        // check for date matching before adding to deposit list for the current view
        props.setDepositList(props.depositList ? props.depositList.concat(newDepositItem) : [newDepositItem]);
        props.setTotalIncome(parseFloat(props.totalIncome) + parseFloat(amount));
    }

    async function sendData() {
        let data = {itemName: name, amount: amount, date: date};
        let url = "/monthIncome";
        let opts = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
        setListData(reData.obj.insertId);
        console.log(reData);
    }

    function nameChange(event) {
        setName(event.target.value);
    }
    function amountChange(event) {
        setAmount(event.target.value);
    }
    function dateChange(event) {
        setDate(event.target.value);
    }
    return (
        <div className="IncomeItemForm">
            <form className="income-form">
                <div className="input_div">
                    <label htmlFor="depositItemName">Name</label>
                    <input id="depositItemName" type="text" value={name} onChange={nameChange}></input>
                </div>
                <div className="input_div">
                    <label htmlFor="depositItemAmount">Amount</label>
                    <input id="depositItemAmount" type="number" value={amount} onChange={amountChange}></input>
                </div>
                <div className="input_div">
                    <label htmlFor="depositItemDate">Date</label>
                    <input id="depositItemDate" type="date" value={date} onChange={dateChange}></input>
                </div>
                <button type="submit" onClick={submitBtn}>Add</button>
            </form>
        </div>
    );
}

export default DepositForm;