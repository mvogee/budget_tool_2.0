import {React, useState} from "react";


/*
* props needs to receive a category list, 
* props needs to receive the state handler for spending items.
*/
function SpendingItemForm(props) {

    function submitBtn(event) {
        event.preventDefault();
        alert("submit button pressed");
    }

    return(
        <div className="SpendingItemForm">
            <form id="spendingItem" className="SpendingForm">
                <div className="input_div">
                    <label htmlFor="itemName">Description</label>
                    <input type="text" name="itemName" placeholder="name" required autoFocus />
                </div>
                <div className="input_div">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" step="0.01" name="amount" placeholder="amount" required />
                </div>
                <div className="input_div">
                    <label htmlFor="category">Category</label>
                    <select name="category" form="spendingItem">
                        <option value="0" default>uncategorized</option>
                        {/* Insert budget category options <option value="element.id">category name</option><*/}
                    </select>
                </div>
                <div className="input_div">
                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" value="<%= date %>" min="2010-01-01" max="<%= today %>" /> { /*max should be today */}
                </div>
                <button type="submit" name="button" onClick={submitBtn}>add</button>
            </form>
        </div>
    );
}

export default SpendingItemForm;