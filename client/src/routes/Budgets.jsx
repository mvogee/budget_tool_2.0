import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BudgetsDisplay from "../components/BudgetsDisplay.jsx";
import { requestData, sendData } from "../components/serverCommunications";
import checkAuth from "../checkAuth.js";

function Budgets(props) {

    const [categoryInput, setCategoryInput] = useState("");
    const [budgetInput, setBudgetInput] = useState(0);
    const [budgetList, setBudgetList] = useState(null);
    const [totalBudgeted, setTotalBudgeted] = useState(0);
    const [projectedIncome, setProjectedIncome] = useState(0);
    const runEffect = useRef(true);

    let navigate = useNavigate();

    useEffect(() => {
        const authenticate = async () => {
            let auth = await checkAuth(props.setUser);
            console.log(auth);
            if (auth && runEffect.current) {
                getData();
                getProjectedIncomeData();
                runEffect.current = false;
            }
            else {
                navigate("/login");
            }
        }
        authenticate();
        

        async function getData() {
            let url = "/service/budgets"
            const reData = await requestData(url);
            console.log(reData);
            if (reData.success) {
                setBudgetList(reData.obj);
                setTotalBudgeted(getTotalBudgeted(reData.obj));
            }
        }

        async function getProjectedIncomeData() {
            let url = "/service/income"
            const reData = await requestData(url);
            console.log(reData);
            if (reData.success) {
                setProjectedIncome(calculateProjectedIncome(reData.obj));
            }
        }

    }, [navigate, props.setUser]);

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


    function resetInputs() {
        setBudgetInput("");
        setCategoryInput("");
    }
    async function postData() {
        let data = {category: categoryInput, budgeted: parseInt(budgetInput)};
        let url = "/service/budgets"
        const reData = await sendData(url, "POST", data);
        setListData(reData.obj.insertId);
    }

    function setListData(id) {
        let newBudgetItem = {id: id, category: categoryInput, budget: parseInt(budgetInput) };
        console.log(newBudgetItem);
        setBudgetList((prevList) => {
            let newList = Array.from(prevList ? prevList : []);
            return (newList ? newList.concat(newBudgetItem) : [newBudgetItem]);
        });
        setTotalBudgeted(prevVal => prevVal + newBudgetItem.budget);
    }

    function submitBtn(event) {
        event.preventDefault();
        postData();
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
                <p>Total budgeted: ${totalBudgeted.toFixed(2)}</p>
                <p>Projected Income: ${projectedIncome.toFixed(2)}</p>
                <p>left: ${(projectedIncome - totalBudgeted).toFixed(2)}</p>
            </div>
            <hr />
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
