import { React, useState} from "react";
import {Navigate} from "react-router-dom"
import SpendingItemForm from "../components/SpendingItemForm";
import SpendingItemDisplay from "../components/SpendingItemDisplay";
import DepositForm from "../components/DepositForm";
import DepositsDisplay from "../components/DepositsDisplay";
import checkAuth from "../checkAuth";
/* TODO:
*   - create month picker component
*   - create components for spending form and income form
*   - create components for displaying income and spending
*   - create component for displaying budgets and current statuses
*   - handle states for all above components and manage state functions.
*/

function getMonthName(date) {

}

// need a utility to get me the standard date format, month name, and the 
function ThisMonth(props) {
  
  checkAuth(props.setUser)
  const [month, setMonth] = useState(new Date());

    if (props.user) {
      return (
          <div className="thisMonth">
              <h1>{getMonthName(month)}</h1>

              {/* create month picker component. /changeMonth form*/}
                  <div className="form_div">
                    <form method="POST">
                      <div className="input_div">
                        <label htmlFor="changeMonthInput">Month</label>
                        <input id="changeMonthInput" type="month" name="month" onChange={/* create funtion */ console.log("change")} value={month}/>
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
                      < SpendingItemForm /> {/* props: spending items list state handler */}
                      {/* isnert spending item form component */}
                      <div className="form_div">

                      </div>
                      <div className="spending-display" >
                      < SpendingItemDisplay />
                          {/* isnert spending item display component */}
                      </div>
                  </div>

                  <hr />

                  <div className="deposit">
                    <h3>Deposits</h3>
                    <div className="form_div">
                        {/* Insert desposit item form component */}
                        <DepositForm />
                    </div>
                    <div className="deposite-display" >
                        {/* Insert desposit item display component */}
                        <DepositsDisplay />
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
    else {
      return (<Navigate className="redirectRoute" to="/login"/>)
    }
}

export default ThisMonth;
