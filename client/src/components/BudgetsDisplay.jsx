import { React, useState } from "react";
import PopEditBudgets from "./PopEditBudgets.jsx";

function BudgetsDisplay(props) {

    const [editBudgetInput, setEditBudgetInput] = useState(0);
    const [editCategoryInput, setEditCategoryInput] = useState("");
    const [idxEdit, setIdxEdit] = useState(0);

    async function deleteRequest(itemId) {
        let data = {categoryId: itemId};
        let url = "/budgets";
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
        if (window.confirm("are you sure you want to delete " + event.target.dataset.category + "?") === true) {
            deleteRequest(event.target.dataset.id);
            let newBudgetList = props.budgets;
            newBudgetList.splice(event.target.dataset.idx, 1);
            props.setBudgetList(newBudgetList);
            props.setTotalBudgeted(props.totalBudgeted - event.target.dataset.amount);
        }
    }
    function editBtn(event) {
        setEditBudgetInput(event.target.dataset.budget);
        setEditCategoryInput(event.target.dataset.category);
        setIdxEdit(event.target.dataset.idx);
    }
    function budgetItems(item, idx) {
        return (
            <tr key={item.id} className="itemRow">
                <td>{item.category}</td>
                <td>{item.budget}</td>
                <td>
                <button className="editButton editButtonBudgets" onClick={editBtn} data-id={item.id} data-category={item.category} data-budget={item.budget} data-idx={idx}>Edit</button>
                </td>
                <td>
                    <button className="deleteBtn" onClick={deleteItem} data-id={item.id} data-category={item.category} data-amount={item.budget} data-idx={idx}>Delete</button>
                </td>
            </tr>
        );
    }

    return (
        <div className="budgetsDisplay">
        <PopEditBudgets budgetList={props.budgets} setBudgetList={props.setBudgetList} setTotalBudgeted={props.setTotalBudgeted} editBudgetInput={editBudgetInput} setEditBudgetInput={setEditBudgetInput} editCategoryInput={editCategoryInput} setEditCategoryInput={setEditCategoryInput} idxEdit={idxEdit} setIdxEdit={setIdxEdit}/>
            <table className="budgets-table">
                <thead>
                        <tr>
                                <th>Category</th>
                                <th>Budget</th>
                                <th></th>
                                <th></th>
                        </tr>
                </thead>
                <tbody>
                    {props.budgets ? props.budgets.map(budgetItems) : null}
                </tbody>
            </table>
        </div>
    );
}

export default BudgetsDisplay;