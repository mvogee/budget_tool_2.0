import { React } from "react";

/*
* Props: spending item list, budget categorys
*/



function SpendingItemDisplay(props) {
    
    async function deleteRequest(itemId) {
        let data = {deleteSpendingItm: itemId};
        let url = "/monthSpending";
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
        /*
        * Confirm user wants to delete item before deleting.
        * Delete item from the database via DELETE request to /thisMonth.
        * Delete the item from the spendingList state object.
        * Subtract the items total from the spendingTotal state.
        */
        deleteRequest(event.target.id);
        console.log("delete button was pressed");
        console.log(event.target);
        console.log(event.target.id, event.target.name);
        
    }

    function editButtonClick(event) {
        console.log("edit button pressed");
        console.log(event.target.itmId);
    }

    function getCategoryName(catId) {
        let categoryName = "un-categorized";
        if (catId !== 0 && props.budgets) {
            for (let i = 0; i < props.budgets.length; i++) {
                if (props.budgets[i].id === catId) {
                    categoryName = props.budgets[i].category;
                    break;
                }
            }
        }
        return (categoryName);
    }

    function getStandardDateFormat(date) {
        date = new Date(date);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let fullDate = (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day) + "/" + year;
        return(fullDate)
    }

    function spendingLineItem(item) {
        return(
            <tr key={item.id}>
                <td className="spendingDescription">{item.itmDescription}</td>
                <td className="spendingAmount">${ parseFloat(item.amount).toFixed(2) }</td>
                <td className="spendingCategory">{ getCategoryName(item.category) }</td>
                <td className="spendingDate">{ getStandardDateFormat(item.purchaseDate) }</td>
                <td>
                    <button className="editButton editBtnSpend" onClick={editButtonClick} id={item.id} name={ item.itmDescription} purchaseamount={item.amount} categoryid={item.category} purchasedate={item.purchaseDate}>Edit</button>
                </td>
                <td>
                    <button className="deleteBtn" onClick={deleteItem} id={item.id} name={item.itmDescription}>Delete</button>
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