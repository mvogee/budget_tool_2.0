import {React} from "react";



function PopEditDeposit(props) {

    function submitBtn(event) {
        event.preventDefault();
    }
    function cancelBtn(event) {
        event.preventDefault();
    }
    function nameChange(event) {
        props.setNameEdit(event.target.value);
    }
    function amountChange(event) {
        props.setAmountEdit(event.target.value);
    }
    function dateChange(event) {
        props.setDateChange(event.target.value);
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
            <button type="button" onClick={cancelBtn}>Cancel</button>
        </form>
    </div>
    );
}

export default PopEditDeposit;