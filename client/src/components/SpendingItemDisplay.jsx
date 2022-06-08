import { React, useState } from "react";
import PopEditSpending from "./PopEditSpending";
import {getCategoryName, getStandardDateFormat, getDateEdit} from "./utils.js";
/*
* Props: spending item list, budget categorys
*/



function SpendingItemDisplay(props) {
    const [nameEdit, setNameEdit] = useState("");
    const [amountEdit, setAmountEdit] = useState(0);
    const [categoryEdit, setCategoryEdit] = useState(0);
    const [dateEdit, setDateEdit] = useState("");
    const [idxEdit, setIdxEdit] = useState(0);
    const [displayPopup, setDisplayPopup] = useState(false);

    async function deleteRequest(itemId) {
        let data = {deleteSpendingItm: itemId};
        let url = "/service/monthSpending";
        let opts = {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        };
        const response = await fetch(url, opts);
        const reData = await response.json();
        console.log(reData);
        if (reData.success) {
            console.log("item was deleted");
        }
    }

    function deleteItem(event) {
        if (window.confirm("Are you sure you want to delete " + event.target.dataset.name) === true) {
            deleteRequest(event.target.dataset.id);
            props.setTotalSpending((prevVal) => prevVal - event.target.dataset.amount);
            let newPurchaseList = props.purchaseList;
            newPurchaseList.splice(event.target.dataset.idx, 1);
            props.setPurchaseList(newPurchaseList);
            props.setCategorySpendingMap(new Map(props.categorySpendingMap.set(parseInt(event.target.dataset.category), parseFloat(props.categorySpendingMap.get(parseInt(event.target.dataset.category))) - parseFloat(event.target.dataset.amount))));
        }
    }

    function editButtonClick(event) {
        setIdxEdit(event.target.dataset.idx);
        setNameEdit(event.target.dataset.name);
        setAmountEdit(event.target.dataset.amount);
        setCategoryEdit(event.target.dataset.catid);
        setDateEdit(getDateEdit(event.target.dataset.date));
        setDisplayPopup(true);
    }

    function spendingLineItem(item, idx) {
        return(
            <tr key={item.id}>
                <td className="spendingDescription">{item.itmDescription}</td>
                <td className="spendingAmount">${ parseFloat(item.amount).toFixed(2) }</td>
                <td className="spendingCategory">{ getCategoryName(item.category, props.budgets) }</td>
                <td className="spendingDate">{ getStandardDateFormat(item.purchaseDate) }</td>
                <td>
                    <button className="editButton editBtnSpend" onClick={editButtonClick} data-id={item.id} data-name={ item.itmDescription} data-amount={item.amount} data-catid={item.category} data-date={item.purchaseDate} data-idx={idx}>Edit</button>
                </td>
                <td>
                    <button className="deleteBtn" onClick={deleteItem} data-id={item.id} data-name={item.itmDescription} data-amount={item.amount} data-category={item.category} data-idx={idx}>Delete</button>
                </td>
            </tr>
        );
    }

    return (
        <div className="spendingItemDisplay">
            <PopEditSpending 
                budgets={props.budgets} displayPopup={displayPopup} setDisplayPopup={setDisplayPopup}
                categorySpendingMap={props.categorySpendingMap} setCategorySpendingMap={props.setCategorySpendingMap}
                purchaseList={props.purchaseList} setPurchaseList={props.setPurchaseList}
                totalSpending={props.totalSpending} setTotalSpending={props.setTotalSpending}
                nameEdit={nameEdit} setNameEdit={setNameEdit}
                amountEdit={amountEdit} setAmountEdit={setAmountEdit}
                categoryEdit={categoryEdit} setCategoryEdit={setCategoryEdit}
                dateEdit={dateEdit} setDateEdit={setDateEdit} idxEdit={idxEdit}
            />
            <table>
                <thead>
                    <tr>
                        <td>Description</td>
                        <td>Amount</td>
                        <td>Category</td>
                        <td>Date</td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {props.purchaseList ? props.purchaseList.map(spendingLineItem) : null}
                </tbody>
            </table>
        </div>
    );
}

export default SpendingItemDisplay;