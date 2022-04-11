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
    day = props.yearMonth + "-" + (day < 10 ? "0" + day.toString() : day.toString());
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState(0);
    const [date, setDate] = useState(day);

    function clearForm() {
        setName("");
        setAmount(0);
        setCategory(0);
        setDate(day);
    }

    function setListData(id) {
        let newSpendItem = {id: id, itmDescription: name, amount: amount, category: parseInt(category), purchaseDate: date};
        // need to add check here to make sure we are in the correct selected month.
        props.setPurchaseList(props.purchaseList ? props.purchaseList.concat(newSpendItem) : [newSpendItem]);
        props.setTotalSpending(parseFloat(props.totalSpending) + parseFloat(amount));
    }

    async function sendData() {
        let data = {itemName: name, amount: amount, category: category, date: date};
        let url = "/monthSpending";
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

    function submitBtn(event) {
        event.preventDefault();
        sendData();
        clearForm();
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