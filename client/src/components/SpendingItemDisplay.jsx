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