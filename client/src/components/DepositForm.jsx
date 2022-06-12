import {React, useState} from "react";
import {sendData} from "./serverCommunications.js";

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
        postData();
        clearForm();
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
        let newDepositItem = {id: id, inDescription: name, amount: amount, depositDate: date + ":10:00"};
        console.log(new Date(date + ":10:00"));
        if (checkDateMatch(date)) {
            props.setDepositList((prevList) => {
                let newList = prevList ? Array.from(prevList) : [];
                return (newList.concat(newDepositItem));
            });
            props.setTotalIncome((prevVal) => {
                return (parseFloat(prevVal) + parseFloat(amount));
            });
        }
    }

    async function postData() {
        let data = {itemName: name, amount: amount, date: date};
        let url = "/service/monthIncome";
        const reData = await sendData(url, "POST", data);
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
        <div className="IncomeItemForm form_div">
            <form className="income-form">
                <div className="input_div">
                    <label htmlFor="depositItemName">Name</label>
                    <input id="depositItemName" type="text" value={name} onChange={nameChange} placeholder="name"></input>
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