import React from "react";

function PopEditBudgets(props) {
    
    function closePopup() {
        props.setEditCategoryInput("");
        props.setEditBudgetInput(0);
        props.setIdxEdit(null);
        props.setDisplayPopup(false);
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

    async function updateServer() {
        let data = {category: props.editCategoryInput, budgeted: props.editBudgetInput, itemId: props.budgetList[props.idxEdit].id};
        console.log("Updating the server");
        let url = "/budgets";
        let opts = {
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data) // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        };

        const response = await fetch(url, opts);
        const reData = await response.json();
        console.log(reData);
        closePopup();
    }

    function submitBtn(event) {
        event.preventDefault();
        // update the local budgetsList at idx
        updateLocalData();
        // update remote at id
        updateServer();
        
    }

    function cancelBtn(event) {
        closePopup();
        // close the popup
    }

    function updateCatInput(event) {
        props.setEditCategoryInput(event.target.value);
    }

    function updateBudgetInput(event) {
        props.setEditBudgetInput(event.target.value);
    }

    return (
        <div className= {props.displayPopup ? "popEdit popDisplay" : "popEdit popDisplayNone"}>
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