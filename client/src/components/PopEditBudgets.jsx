import React from "react";

function PopEditBudgets(props) {
    
    function resetInputs() {
        props.setEditCategoryInput("");
        props.setEditBudgetInput(0);
        props.setIdxEdit(null);
    }
    function updateLocalData() {
        props.setTotalBudgeted((prevVal) => {
            return (prevVal - parseFloat(props.budgetList[props.idxEdit].budget) + parseFloat(props.editBudgetInput));
        });
        props.setBudgetList((prevVal) => {
            let newList = Array.from(prevVal);
            newList[props.idxEdit].category = props.editCategoryInput;
            newList[props.idxEdit].budget = parseFloat(props.editBudgetInput);
            return (newList);
        });
    }
    function submitBtn(event) {
        event.preventDefault();
        // update the local budgetsList at idx
        updateLocalData();
        // update remote at id
        
    }

    function cancelBtn(event) {
        resetInputs();
        // close the popup
    }

    function updateCatInput(event) {
        props.setEditCategoryInput(event.target.value);
    }

    function updateBudgetInput(event) {
        props.setEditBudgetInput(event.target.value);
    }

    return (
        <div className="popEdit">
            <p>Edit Category</p>
            <form className="popEditForm">
                <div className="input_div">
                    <label htmlFor="category">Category</label>
                    <input type="text" autoComplete="off" name="category" onChange={updateCatInput} value={props.editCategoryInput} autoFocus required/>
                </div>
                <div className="input_div">
                    <label htmlFor="budgeted">Budget</label>
                    <input type="number" step=".01" name="budgeted" onChange={updateBudgetInput} value={props.editBudgetInput} required />
                </div>
                <button className="submitBtn buttons-secondary" type="submit" onClick={submitBtn}>Save</button>
                <button className="cancelBtn buttons-secondary" type="reset" onClick={cancelBtn}>Cancel</button>
            </form>
        </div>
    );
}

export default PopEditBudgets;