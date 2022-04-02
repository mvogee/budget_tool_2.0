import {React, useState} from "react";


function selectOptions(item) {
    return (
        <option key={item.id} value={item.id} >{item.category}</option>
    );
}
/*
* props needs to receive a category list, 
* props needs to receive the state handler for spending items.
*/
function SpendingItemForm(props) {
    let day = new Date().getDate();
    day = day < 10 ? "0" + day.toString() : day.toString();
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("None");
    const [date, setDate] = useState(props.yearMonth + "-" + day);

    function submitBtn(event) {
        event.preventDefault();
        alert("submit button pressed");
    }
    
    function nameChange(event) {
        setName(event.target.value);
    }
    function amountChange(event) {
        setAmount(event.target.value);
    }
    function categoryChange(event) {
        setCategory(event.target.value); // this will actually need to take the category name instead of the option value.
    }
    function dateChange(event) {
        console.log(event.target.value);
        setDate(event.target.value);
    }

    return(
        <div className="SpendingItemForm">
            <form id="spendingItem" className="SpendingForm">
                <div className="input_div">
                    <label htmlFor="itemName">Description</label>
                    <input type="text" name="itemName" value={name} onChange={nameChange} required autoFocus />
                </div>
                <div className="input_div">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" step="0.01" name="amount" value={amount} onChange={amountChange}required />
                </div>
                <div className="input_div">
                    <label htmlFor="category">Category</label>
                    <select name="category" value={category} onChange={categoryChange}>
                        <option value="0" key="0">un-categorized</option>
                        {props.budgets ? props.budgets.map(selectOptions) : null}
                        {/* Insert budget category options <option value="element.id">category name</option><*/}
                    </select>
                </div>
                <div className="input_div">
                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" value={date} min="2010-01-01" onChange={dateChange}/> { /*max should be today */}
                </div>
                <button type="submit" name="button" onClick={submitBtn}>add</button>
            </form>
        </div>
    );
}

export default SpendingItemForm;