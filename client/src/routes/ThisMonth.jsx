import { React, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import SpendingItemForm from "../components/SpendingItemForm";
import SpendingItemDisplay from "../components/SpendingItemDisplay";
import DepositForm from "../components/DepositForm";
import DepositsDisplay from "../components/DepositsDisplay";
import checkAuth from "../checkAuth";

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
  let month = (date.getMonth() + 1).toString();
  return (year + "-" + (date.getMonth() + 1 < 10 ? "0" + month : month));
}

// need a utility to get me the standard date format, month name, and the 
function ThisMonth(props) {

  const [yearMonth, setYearMonth] = useState(getDateVal(new Date())); // in the onChange for this it needs to retreive the list data again.
  const [budgetList, setBudgetList] = useState(null); // used for displaying budget progress.
  const [purchaseList, setPurchaseList] = useState(null); // when retrieved from server use month as search filter.
  const [depositList, setDepositList] = useState(null); // when retrieving data use month as search filter. 
  const [totalSpending, setTotalSpending] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);


  const navigate = useNavigate();
  
  async function getPurchaseData(yearMonth) {
    console.log("requesting purchaseData");
    let url = "/monthSpending/" + yearMonth;
    let opts = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
    // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
    const response = await fetch(url, opts);
    const reData = await response.json();
    console.log(reData);
    if (reData.success) {
        setPurchaseList(reData.obj);
        let total = 0;
        reData.obj.forEach((item) => {total += parseFloat(item.amount)});
        setTotalSpending(total.toFixed(2));
    }
}

  async function getDepositData(yearMonth) {
    console.log("requesting Deposit data");
    let url = "/monthIncome/" + yearMonth;
    let opts = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
    // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
    const response = await fetch(url, opts);
    const reData = await response.json();
    console.log(reData);
    if (reData.success) {
        setDepositList(reData.obj);
        let total = 0;
        reData.obj.forEach((item) => {total += parseFloat(item.amount)});
        setTotalIncome(total.toFixed(2));
    }
}

  async function getBudgetData() {
    let url = "/budgets"
    let opts = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
    // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
    const response = await fetch(url, opts);
    const reData = await response.json();
    console.log(reData);
    if (reData.success) {
        setBudgetList(reData.obj);
    }
}

  // if month changes we need to retrieve data again
  useEffect(() => {
    const authenticate = async () => {
        let auth = await checkAuth(props.setUser);
        if (auth) {
          await getPurchaseData(yearMonth);
          await getDepositData(yearMonth);
          await getBudgetData();
        }
        else {
          navigate("/login");
        }
    }
    authenticate();
  }, []);


  function changeMonth(event) {
    setYearMonth("" + event.target.value);
    getPurchaseData(event.target.value);
    getDepositData(event.target.value);
  }

    return (
        <div className="thisMonth">
            <h1>{getMonthName(yearMonth)}</h1>

            {/* create month picker component. /changeMonth form*/}
                <div className="form_div">
                  <form method="POST">
                    <div className="input_div">
                      <label htmlFor="changeMonthInput">Month</label>
                      <input id="changeMonthInput" type="month" name="month" onChange={changeMonth} value={yearMonth}/>
                    </div>
                  </form>
                </div>

                <hr />

                <div className="top-stats">
                  <p>Total spending: $<span className="monthTotal" id="totalSpending">{parseFloat(totalSpending).toFixed(2)}</span></p>
                  <p>Total income: $<span className="monthTotal" id="totalIncome">{parseFloat(totalIncome).toFixed(2)}</span></p>
                  <p>Savings: $<span className="monthTotal" id="totalSavings">{(totalIncome - totalSpending).toFixed(2)}</span></p>
                </div>

                <hr />


                <div className="spending">
                  <h3>Spending</h3>
                  <SpendingItemForm yearMonth={yearMonth} budgets={budgetList} purchaseList={purchaseList} setPurchaseList={setPurchaseList} totalSpending={totalSpending} setTotalSpending={setTotalSpending}/>
                  <SpendingItemDisplay purchaseList={purchaseList} setPurchaseList={setPurchaseList} budgets={budgetList} totalSpending={totalSpending} setTotalSpending={setTotalSpending}/>
                </div>
                  <hr />

                <div className="deposit">
                  <h3>Deposits</h3>
                  <DepositForm yearMonth={yearMonth} depositList={depositList} setDepositList={setDepositList} totalIncome={totalIncome} setTotalIncome={setTotalIncome}/>
                  <DepositsDisplay depositList={depositList} setDepositList={setDepositList} totalIncome={totalIncome} setTotalIncome={setTotalIncome}/>
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
