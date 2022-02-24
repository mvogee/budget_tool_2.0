import React from "react";

function PopEditIncome(props) {

    function submitBtn(event) {
        event.preventDefault();
        alert("submit was pressed");
    }

    function cancelBtn(event) {
        alert("cancle pressed");
    }

    return (
        <div className="popEditIncome popEdit">
            <form className="popEditForm">
                <p>Update income item</p>
                <div className="input_div">
                    <label htmlFor="incomeName">Income Name</label>
                    <input className="nameInput" name="incomeName" type="text" required autofocus value="" />
                </div>
                <div className="input_div">
                    <label htmlFor="hourlyRate"> Hourly Rate</label>
                    <input className="hourlyRateInput" name="hourlyRate" type="number" step=".01" required value="" />
                </div>
                <div className="input_div">
                    <label htmlFor="hoursPerWeek">Hr/Week</label>
                    <input className="hoursPerWeek" name="hoursPerWeek" type="number" step="0.01" required value="" />
                </div>
                <div className="input_div">
                    <label htmlFor="taxRate">Tax Rate %</label>
                    <input className="taxRateInput" name="taxRate" type="number" step=".01" value="" />
                </div>
                <div className="input_div">
                    <label htmlFor="retirement">Retirement %</label>
                    <input className="retirementInput" name="retirement" type="number" step=".01" value="" />
                </div>
                <input hidden className="idInput" name="itmId" value="0" />
                <button className="submitBtn buttons-secondary" type="submit" onClick={submitBtn}>Save</button>
                <button className="cancelBtn buttons-secondary" type="button" onClick={cancelBtn}>Cancel</button>
            </form>
        </div>
    );
}

export default PopEditIncome;