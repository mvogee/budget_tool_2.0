import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopEditBudgets from "../components/PopEditBudgets.jsx";
import BudgetsDisplay from "../components/BudgetsDisplay.jsx";
import checkAuth from "../checkAuth.js";

function Budgets(props) {

    const [categoryInput, setCategoryInput] = useState("");
    const [budgetInput, setBudgetInput] = useState(0);
    const [budgetList, setBudgetList] = useState(null);
    const [totalBudgeted, setTotalBudgeted] = useState(0);
    const [projectedIncome, setProjectedIncome] = useState(0);

    let navigate = useNavigate();

    function getTotalBudgeted(budgetList) {
        let total = 0;
        if (budgetList) {
            budgetList.forEach((item) => {
                total += item.budget;
            });
        }
        return (total);
    }

    function calculateProjectedIncome(incomes) {
        let total = 0;
        if (incomes) {
            incomes.forEach((item) => {
                let monthlyGross = item.hourlyRate * item.hoursPerWeek * 4;
                let monthlyNet = monthlyGross - (monthlyGross * item.taxRate) - (monthlyGross * item.retirement);
                total += monthlyNet;
            });
        }
        return (total);
    }

    async function getProjectedIncomeData() {
        let url = "/income"
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
            setProjectedIncome(calculateProjectedIncome(reData.obj));
        }
    }

    async function getData() {
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
            setTotalBudgeted(getTotalBudgeted(reData.obj));
        }
    }
    function resetInputs() {
        setBudgetInput("");
        setCategoryInput("");
    }
    async function sendData() {
        let data = {category: categoryInput, budgeted: parseInt(budgetInput)};
        let url = "/budgets"
        let opts = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
        setListData(reData.obj.insertId);
        console.log(reData);
    }

    useEffect(() => {
        const authenticate = async () => {
            let auth = await checkAuth(props.setUser);
            console.log(auth);
            if (auth) {
                getData();
                getProjectedIncomeData();
            }
            else {
                navigate("/login");
            }
        }
        authenticate();
    }, []);

    function setListData(id) {
        let newBudgetItem = {id: id, category: categoryInput, budget: parseInt(budgetInput) };
        console.log(newBudgetItem);
        setBudgetList(budgetList ? budgetList.concat(newBudgetItem) : [newBudgetItem]);
    }

    function submitBtn(event) {
        event.preventDefault();
        sendData();
        resetInputs();
    }

    function categoryInputChange(e) {
        setCategoryInput(e.target.value);
    }
    function budgetInputChange(e) {
        setBudgetInput(e.target.value);
    }

    return (
        <div className="budgets">
            <h1>Budgets</h1>
            <hr />
            <div className="top-stats">
                <p>Total budgeted: ${getTotalBudgeted(budgetList)}</p>
                <p>Projected Income: ${projectedIncome}</p> {/* insert projected income */}
                <p>left: ${projectedIncome - totalBudgeted}</p> {/* insert projected income - total budgeted */}
            </div>
            <hr />
                {/*  edit field popup */}
            <div className="form_div">
            <form className="budget-item-form" name="newBudgetItm">
                <div className="input_div">
                    <label htmlFor="category">Category</label>
                    <input type="text" autoComplete="off" name="category" placeholder="Category Name" autoFocus required value={categoryInput} onChange={categoryInputChange}/>
                </div>
                <div className="input_div">
                    <label htmlFor="budgeted">Budget</label>
                    <input type="number" step=".01" name="budgeted" placeholder="100.00" required value={budgetInput} onChange={budgetInputChange}/>
                </div>
                <button type="submit" onClick={submitBtn}>Save</button>
            </form>
            </div>
                <BudgetsDisplay budgets={budgetList} setBudgetList={setBudgetList} totalBudgeted={totalBudgeted} setTotalBudgeted={setTotalBudgeted}/>
        </div>
    );
}

export default Budgets;
