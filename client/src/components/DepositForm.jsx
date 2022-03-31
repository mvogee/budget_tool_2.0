import {React, useState} from "react"

function DepositForm(props) {
    let day = new Date().getDate();
    day = day < 10 ? "0" + day.toString() : day.toString();
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(props.yearMonth + "-" + day);

    function submitBtn(event) {
        event.preventDefault();
        console.log("submit btn was pressed");
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
                    <label htmlFor="depositItemDate">Amount</label>
                    <input id="depositItemDate" type="date" value={date} onChange={dateChange}></input>
                </div>
                <button type="submit" onClick={submitBtn}>Add</button>
            </form>
        </div>
    );
}

export default DepositForm;