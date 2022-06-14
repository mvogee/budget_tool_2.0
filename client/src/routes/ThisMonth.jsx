import { React, useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom"
import SpendingItemForm from "../components/SpendingItemForm";
import SpendingItemDisplay from "../components/SpendingItemDisplay";
import DepositForm from "../components/DepositForm";
import DepositsDisplay from "../components/DepositsDisplay";
import BudgetProgress from "../components/BudgetProgress";
import checkAuth from "../checkAuth";
import { getDateYearMonth } from "../components/utils";
import { requestData } from "../components/serverCommunications";
import "../styles/thisMonth.css";

/**
  * 
  * @param {String} date // in format yyyy-mm
*/
function getMonthName(date) {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (months[parseInt(date.substring(5)) - 1]);
}

function ThisMonth(props) {

  const [yearMonth, setYearMonth] = useState(getDateYearMonth(new Date())); // in the onChange for this it needs to retreive the list data again.
  const [budgetList, setBudgetList] = useState(null); // used for displaying budget progress.
  const [purchaseList, setPurchaseList] = useState(null); // when retrieved from server use month as search filter.
  const [depositList, setDepositList] = useState(null); // when retrieving data use month as search filter. 
  const [totalSpending, setTotalSpending] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [categorySpendingMap, setCategorySpendingMap] = useState(new Map());
  const runEffect = useRef(true);


  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
        let auth = await checkAuth(props.setUser);
        if (auth && runEffect.current) {
          await getPurchaseData(yearMonth);
          await getDepositData(yearMonth);
          await getBudgetData();
          runEffect.current = false;
        }
        else if (!auth){
          navigate("/login");
        }
    }
    authenticate();
  }, [navigate, props.setUser, yearMonth]);

  function addToCategoryMap(item) {
    if (categorySpendingMap.has(item.category)) {
      setCategorySpendingMap(map => new Map(map.set(item.category, map.get(item.category) + parseFloat(item.amount))));
    }
    else {
      setCategorySpendingMap(map => new Map(map.set(item.category, parseFloat(item.amount))));
    }
  }

  async function getPurchaseData(yearMonth) {
    console.log("requesting purchaseData");
    let url = "/service/monthSpending/" + yearMonth;
    const reData = await requestData(url);
    if (reData.success) {
        setPurchaseList(reData.obj);
        let total = 0;
        reData.obj.forEach((item) => {
          total += parseFloat(item.amount);
          addToCategoryMap(item);
        });
        setTotalSpending(total.toFixed(2));
    }
  }

  async function getDepositData(yearMonth) {
    console.log("requesting Deposit data");
    let url = "/service/monthIncome/" + yearMonth;
    const reData = await requestData(url);
    if (reData.success) {
        setDepositList(reData.obj);
        let total = 0;
        reData.obj.forEach((item) => {total += parseFloat(item.amount)});
        setTotalIncome(total.toFixed(2));
    }
  }

  async function getBudgetData() {
    let url = "/service/budgets"
    const reData = await requestData(url);
    if (reData.success) {
        setBudgetList(reData.obj);
    }
  }

  function changeMonth(event) {
    categorySpendingMap.clear(); // this breaks react state 
    // setCategorySpendingMap(new Map());
    setYearMonth("" + event.target.value);
    getPurchaseData(event.target.value);
    getDepositData(event.target.value);
  }

    return (
        <div className="thisMonth">
        <a className="pageNav" href="#spendingDiv">Spending</a>
        <a className="pageNav" href="#depositDiv">Deposits</a>
        <a className="pageNav" href="#budgetProgressDiv">Budget status</a>
            <h1>{getMonthName(yearMonth)}</h1>
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


                <div id="spendingDiv" className="spending">
                  <h3>Spending</h3>
                  <SpendingItemForm
                    yearMonth={yearMonth} categorySpendingMap={categorySpendingMap}
                    setCategorySpendingMap={setCategorySpendingMap} budgets={budgetList}
                    purchaseList={purchaseList} setPurchaseList={setPurchaseList}
                    totalSpending={totalSpending} setTotalSpending={setTotalSpending}
                  />
                  <SpendingItemDisplay
                    categorySpendingMap={categorySpendingMap} setCategorySpendingMap={setCategorySpendingMap}
                    purchaseList={purchaseList} setPurchaseList={setPurchaseList}
                    budgets={budgetList} totalSpending={totalSpending}
                    setTotalSpending={setTotalSpending}
                  />
                </div>
                  <hr />

                <div id="depositDiv" className="deposit">
                  <h3>Deposits</h3>
                  <DepositForm yearMonth={yearMonth}
                    depositList={depositList} setDepositList={setDepositList}
                    totalIncome={totalIncome} setTotalIncome={setTotalIncome}
                  />
                  <DepositsDisplay
                    depositList={depositList} setDepositList={setDepositList}
                    totalIncome={totalIncome} setTotalIncome={setTotalIncome}
                  />
                </div>

                  <hr />

                <div id="budgetProgressDiv" className="budgetProgress">
                    <h3>Budgets</h3>
                    <BudgetProgress budgetList={budgetList} categorySpendingMap={categorySpendingMap}/>
                </div>

        </div>
    );
}

export default ThisMonth;
