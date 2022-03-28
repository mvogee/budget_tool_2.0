import { React, useState, useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom"
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
/**
  * 
  * @param {String} date // in format yyyy-mm
*/
function getMonthName(date) {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (months[parseInt(date.substring(5)) - 1]);
}

/**
  * 
  * @param {Date} date 
*/
function getDateVal(date) {
  let year = date.getFullYear().toString();
  console.log(year);
  let month = (date.getMonth() + 1).toString();
  console.log(month);
  return (year + "-" + (date.getMonth() + 1 < 10 ? "0" + month : month));
}

// need a utility to get me the standard date format, month name, and the 
function ThisMonth(props) {

  const [month, setMonth] = useState(getDateVal(new Date())); // in the onChange for this it needs to retreive the list data again.
  const [budgetList, setBudgetList] = useState(null); // used for displaying budget progress.
  const [purchaseList, setpurchaseList] = useState(null); // when retrieved from server use month as search filter.
  const [depositList, setDepositList] = useState(null); // when retrieving data use month as search filter. 

  const navigate = useNavigate();
  
  // if month changes we need to retrieve data again
  useEffect(() => {
    const authenticate = async () => {
        let auth = await checkAuth(props.setUser);
        if (auth) {
          // get purchases
          // get deposits
          // get budgets
        }
        else {
          navigate("/login");
        }
    }
  }, []);

  function changeMonth(event) {
    console.log("monthChange", event.target.value);

    setMonth("" + event.target.value);
  }

    return (
        <div className="thisMonth">
            <h1>{getMonthName(month)}</h1>

            {/* create month picker component. /changeMonth form*/}
                <div className="form_div">
                  <form method="POST">
                    <div className="input_div">
                      <label htmlFor="changeMonthInput">Month</label>
                      <input id="changeMonthInput" type="month" name="month" onChange={changeMonth} value={month}/>
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

export default ThisMonth;
