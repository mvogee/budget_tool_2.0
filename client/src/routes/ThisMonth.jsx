import React from "react";

/* TODO:
*   - create month picker component
*   - create components for spending form and income form
*   - create components for displaying income and spending
*   - create component for displaying budgets and current statuses
*   - handle states for all above components and manage state functions.
*/

function ThisMonth(props) {
    return (
        <div className="thisMonth">
            <h1>ThisMonth</h1>

            {/* create month picker component. /changeMonth form*/}
                <div className="form_div">
                  <form method="POST">
                    <div className="input_div">
                      <label htmlFor="changeMonthInput">Month</label>
                      <input id="changeMonthInput" type="month" name="month" onChange={/* create funtion */ console.log("change")} />
                    </div>
                  </form>
                </div>

                <hr />

                <div className="top-stats">
                  <p>Total spending: $<span className="monthTotal" id="totalSpending">00.00</span></p>
                  <p>Total income: $<span className="monthTotal" id="totalIncome">00.00</span></p>
                  <p>Savings: $<span className="monthTotal" id="totalSavings">00.00</span></p>
                </div>

                <hr />


                <div className="spending">
                    <h3>Spending</h3>
                    {/* isnert spending item form component */}
                    <div className="form_div">

                    </div>
                    <div className="spending-display" >
                        {/* isnert spending item display component */}
                    </div>
                </div>

                <hr />

                <div className="deposit">
                  <h3>Deposits</h3>
                  <div className="form_div">
                      {/* Insert desposit item form component */}
                  </div>
                  <div className="deposite-display" >
                      {/* Insert desposit item display component */}
                  </div>

                </div>

                <hr />

                <div className="budgetProgress">
                    {/* insert budget progress component */}
                    <h3>Budgets</h3>
                </div>

        </div>
    );
}

export default ThisMonth;
