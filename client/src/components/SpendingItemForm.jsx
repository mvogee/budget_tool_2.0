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

    function checkDateMatch(date) {
        let itemMonth = new Date(date).getMonth() + 1;
        let itemYear = new Date(date).getFullYear();
        let userYear = parseInt(props.yearMonth.slice(0,4));
        let userMonth = parseInt(props.yearMonth.slice(5));
        if (itemYear === userYear && itemMonth === userMonth) {
            return (true);
        }
        else {
            return (false);
        }
    }

    function setListData(id) {
        let newSpendItem = {id: id, itmDescription: name, amount: amount, category: parseInt(category), purchaseDate: date + ":10:00"};
        if (checkDateMatch(date)) {
            //props.setPurchaseList(props.purchaseList ? props.purchaseList.concat(newSpendItem) : [newSpendItem]);
            props.setPurchaseList((prevList) => {
                return (prevList ? Array.from(prevList).concat(newSpendItem) : [newSpendItem]);
            });
            props.setTotalSpending((prevVal) => (parseFloat(prevVal) + parseFloat(amount)));
            props.setCategorySpendingMap(new Map(props.categorySpendingMap.set(newSpendItem.category, parseFloat(props.categorySpendingMap.get(newSpendItem.category)) + parseFloat(newSpendItem.amount))));
        }
        
    }

    async function sendData() {
        let data = {itemName: name, amount: amount, category: category, date: date};
        let url = "/service/monthSpending";
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
        <div className="SpendingItemForm form_div">
            <form id="spendingItem" className="SpendingForm">
                <div className="input_div">
                    <label htmlFor="itemName">Description</label>
                    <input type="text" name="itemName" value={name} onChange={nameChange} placeholder="name" required autoFocus />
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