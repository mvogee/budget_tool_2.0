import {React, useState} from "react"

function DepositForm(props) {

    function submitBtn(event) {
        event.preventDefault();
        console.log("submit btn was pressed");
    }

    return (
        <div className="IncomeItemForm">
            <form className="income-form">
                <div className="input_div">
                    <label htmlFor="depositItemName">Name</label>
                    <input id="depositItemName" type="text" placeholder="name"></input>
                </div>
                <div className="input_div">
                    <label htmlFor="depositItemAmount">Amount</label>
                    <input id="depositItemAmount" type="number" placeholder=""></input>
                </div>
                <div className="input_div">
                    <label htmlFor="depositItemDate">Amount</label>
                    <input id="depositItemDate" type="date" value={new Date()}></input>
                </div>
                <button type="submit" onClick={submitBtn}>Add</button>
            </form>
        </div>
    );
}

export default DepositForm;