import { React, useState } from "react";
import PopEditSpending from "./PopEditSpending";
import {getCategoryName, getStandardDateFormat, getDateEdit} from "./utils.js";
import {sendData} from "./serverCommunications.js";
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
        const reData = await sendData(url, "DELETE", data);
        if (reData.success) {
            console.log("item was deleted");
        }
    }

    function deleteItem(event) {
        if (window.confirm("Are you sure you want to delete " + event.target.dataset.name) === true) {
            deleteRequest(event.target.dataset.id);
            props.setTotalSpending((prevVal) => prevVal - event.target.dataset.amount);
            let newPurchaseList = Array.from(props.purchaseList);
            newPurchaseList.splice(event.target.dataset.idx, 1);
            props.setPurchaseList(newPurchaseList);
            props.setCategorySpendingMap(map => new Map(map.set(parseInt(event.target.dataset.category), parseFloat(map.get(parseInt(event.target.dataset.category))) - parseFloat(event.target.dataset.amount))));
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