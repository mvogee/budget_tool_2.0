import React from "react";
import {Navigate} from "react-router-dom";
import PopEditIncome from "../components/PopEditIncome.jsx";
import checkAuth from "../checkAuth";
/* TODO:
*   - state handlers for all inputs.
*   - state handlers for variables needed.
*   - Form submit button link to database.
*   - display functions for income table.
*/

function Income(props) {

    checkAuth(props.setUser);

    function submitBtn(event) {
        event.preventDefault();
        alert("submit button was pressed");
    }
    if (props.user) {
        return (
            <div className="income">
                <h1>Income</h1>
                    <div className="top-stats">
                        <p>Gross income: {/* display gross income */} </p>
                        <p>Net income: {/* display net income */} </p>
                    </div>
                    <hr />
                    <div className="form_div">
                        <form name="newIncomeItm" >
                            <div className="input_div">
                                <label htmlFor="incomeName">Income Name</label>
                                <input name="incomeName" type="text" required autofocus placeholder="My Paycheck" />
                            </div>
                            <div className="input_div">
                                <label htmlFor="hourlyRate">Hourly Rate</label>
                                <input name="hourlyRate" type="number" step=".01" required placeholder="35.25" />
                            </div>
                            <div className="input_div">
                                <label htmlFor="hoursPerWeek">Hrs/Week</label>
                                <input name="hoursPerWeek" type="number" step="0.01" required placeholder="40" />
                            </div>
                            <div className="input_div">
                                <label htmlFor="taxRrate">Tax Rate %</label>
                                <input name="taxRate" type="number" step="1" placeholder="15" />
                            </div>
                            <div className="input_div">
                                <label htmlFor="retirement">Retirement %</label>
                                <input name="retirement" type="number" step="1" placeholder="7" />
                            </div>
                            <button type="submit" onClick={submitBtn}>Add</button>
                        </form>
                    </div>
            </div>
        );
    }
    else {
        return (<Navigate className="redirectRoute" to="/login"/>)
    }
    
}

export default Income;
