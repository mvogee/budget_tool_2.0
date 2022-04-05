import { React } from "react";

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
        return(
            <tr key={item.id}>
                <td className="spendingDescription">{item.itmDescription}</td>
                <td className="spendingAmount">${ parseFloat(item.amount).toFixed(2) }</td>
                <td className="spendingCategory">{item.category}</td>
                <td className="spendingDate">{item.purchaseDate }</td>
                <td>
                    <button className="editButton editBtnSpend" onClick={editButtonClick} itmid={ item.id } name = { item.itmDescription} purchaseamount={item.amount} categoryid={item.category} purchasedate={item.purchaseDate}>Edit</button>
                </td>
                <td>
                    <button className="deleteBtn" onClick={deleteItem} itmid = {item.id} name = {item.itmDescription}>Delete</button>
                </td>
            </tr>
        );
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