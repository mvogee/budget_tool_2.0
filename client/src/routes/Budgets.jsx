import { React, useState } from "react";
import Link from "react-router-dom";
import PopEditBudgets from "../components/PopEditBudgets.jsx";
/* TODO:
*   - state hanlders for new budget items fields
*   - button hanldler to hanle sumitting new budget items.
*   - button handler for edit button on fields.
*   - button handler for delete button on fields.
*   - funciton to handle loading displaying budgets from the server.
*
* NOTE:
*  - Budgets should be held in a state so that when edits are made we push
*   the edit to the server but we just edit the local object and not have to wait for the server response.
*/

function Budgets(props) {

    const [categoryInput, setCategoryInput] = useState("");
    const [budgetInput, setBudgetInput] = useState(0);

    function submitBtn(event) {
        event.preventDefault();
        alert("submit was pressed");
    }

    function categoryInputChange(e) {
        setCategoryInput(e.target.value);
    }
    function budgetInputChange(e) {
        setBudgetInput(e.target.value);
    }

    return (
        <div className="budgets">
            <h1>Budgets</h1>
            <hr />
            <div className="top-stats">
                <p>Total budgeted:  </p> {/* insert total budgetd */}
                <p>Projected Income:  </p> {/* insert projected income */}
                <p>left:   </p> {/* insert projected income - total budgeted */}
            </div>
            <hr />
                {/*  edit field popup */}
            <div className="form_div">
            <form className="budget-item-form" name="newBudgetItm">
                <div className="input_div">
                    <label htmlFor="category">Category</label>
                    <input type="text" autoComplete="off" name="category" placeholder="Category Name" autofocus required value={categoryInput} onChange={categoryInputChange}/>
                </div>
                <div className="input_div">
                    <label htmlFor="budgeted">Budget</label>
                    <input type="number" step=".01" name="budgeted" placeholder="100.00" required value={budgetInput} onChange={budgetInputChange}/>
                </div>
                <button type="submit" onClick={submitBtn}>Save</button>
            </form>
            </div>
                {/* insert funciton to display the current budgets table. includes buttons to edit and delete the row. popup edit field */}
        </div>
    );
}

export default Budgets;
