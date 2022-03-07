import {React, useState} from "react";

/*
* Props: spending item list, budget categorys
*/

function SpendingItemDisplay(props) {

    function deleteItem(event) {
        console.log("delete button was pressed");
    }

    function editButtonClick(event) {
        console.log("edit button pressed");
        console.log(event.target.itmId);
    }

    function spendingLineItem(item) {
            <tr>
                <td className="spendingDescription">{item.itmDescription}</td>
                <td className="spendingAmount">${ item.amount }</td>
                <td className="spendingCategory">{item.category}</td> {/*! make function that will get the category name.*/}
                <td className="spendingDate">{item.purchaseDate }</td> {/* make function to format date */}
                <td>
                    <button className="editButton editBtnSpend" onClick={editButtonClick}
                    itmId = { item.id }
                    name = { item.itmDescription}
                    purchaseAmount = {item.amount}
                    categoryId = {item.category}
                    purchaseDate = {item.purchaseDate}
                    >edit
                    </button>
                </td>
                <td>
                    <button className="deleteBtn" onClick={deleteItem}
                        itemId = {item.id}
                        name = {item.itmDescription}
                        >Delete
                    </button>
                </td>
            </tr>
    }

    return (
        <div className="spendingItemDisplay">
            <p>Spending</p>
            <table>
                <thead>
                    <tr>
                        <td>Description</td>
                        <td>Amount</td>
                        <td>Category</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {props.spendItems ? props.spendItems.forEach(spendingLineItem) : null}
                </tbody>
            </table>
        </div>
    );
}

export default SpendingItemDisplay;