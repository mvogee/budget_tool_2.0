import { React, useState } from "react";
import PopEditBudgets from "./PopEditBudgets.jsx";
import { sendData } from "./serverCommunications.js";

function BudgetsDisplay(props) {

    const [editBudgetInput, setEditBudgetInput] = useState(0);
    const [editCategoryInput, setEditCategoryInput] = useState("");
    const [idxEdit, setIdxEdit] = useState(0);
    const [displayPopup, setDisplayPopup] = useState(false);

    async function deleteRequest(itemId) {
        let data = {categoryId: itemId};
        let url = "/service/budgets";
        const reData = await sendData(url, "DELETE", data);
        if (reData.success) {
            console.info("item was deleted");
        }
    }

    function deleteItem(event) {
        if (window.confirm("are you sure you want to delete " + event.target.dataset.category + "?") === true) {
            deleteRequest(event.target.dataset.id);
            props.setBudgetList((prevList) => {
                let newBudgetList = Array.from(prevList);
                newBudgetList.splice(event.target.dataset.idx, 1);
                return (newBudgetList);
            });
            props.setTotalBudgeted((prevVal) => {
                return (prevVal - event.target.dataset.amount);
            });
        }
    }

    function editBtn(event) {
        setDisplayPopup(true);
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
        <PopEditBudgets 
            displayPopup={displayPopup} setDisplayPopup={setDisplayPopup}
            budgetList={props.budgets} setBudgetList={props.setBudgetList}
            setTotalBudgeted={props.setTotalBudgeted} editBudgetInput={editBudgetInput}
            setEditBudgetInput={setEditBudgetInput} editCategoryInput={editCategoryInput}
            setEditCategoryInput={setEditCategoryInput} idxEdit={idxEdit} setIdxEdit={setIdxEdit}
        />
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