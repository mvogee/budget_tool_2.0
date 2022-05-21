import {React, useState, useEffect} from "react";
import {getBudgetData, getPurchaseData, getDepositData} from "../components/overviewServerRequests";
import {getDateYearMonth} from "../components/utils";
import MonthToMonthGraph from "../components/MonthToMonthGraph";
/* TODO:
*  - state functions handlers for all the displays
*   - retriev all needed data from database.
*/

function Overview(props) {

    const [totalSpending, setTotalSpending] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [criticalBudgetItems, setCriticalBudgetItems] = useState();
    const [twelveMonthSaving, setTwelveMonthSaving] = useState(0);
    const [yearIncomeMap, setYearIncomeMap] = useState();
    const [yearSpendingMap, setYearSpendingMap] = useState();

    useEffect(() => {
        getInitialData();
    }, []);

    function getListTotal(list) {
        let total = 0;
        list ? list.forEach((item) => {total += parseFloat(item.amount)}) : total = 0;
        return (total);
    }

    async function getPastYearSpendingData() {
        let dataListMap = new Map();
        let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        for (let i = 0; i < 12; i++) {
            if (month < 0) {
                month = 11;
                year--;
            }
            let yearMonth = "" + year + "-" + months[month];
            let newPurchaseData = await getPurchaseData(yearMonth);
            dataListMap.set(month + 1 + "-1-" + year, newPurchaseData);
           // setYearSpendingListMap(new Map(yearSpendingListMap.set(month + 1 + "-1-" + year, newPurchaseData)));
            month--;
        }
        return (dataListMap);
    }

    async function getPastYearDepositData() {
        let dataListMap = new Map();
        let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        for (let i = 0; i < 12; i++) {
            if (month < 0) {
                month = 11;
                year--;
            }
            let yearMonth = "" + year + "-" + months[month];
            let newDepositData = await getDepositData(yearMonth);
            dataListMap.set(month + 1 + "-1-" + year, newDepositData);
            //setYearDepositListMap(new Map(yearDepositListMap.set(month + 1 + "-1-" + year, newDepositData)));
            month--;
        }
        return (dataListMap);
    }

    function getCriticalBudgetItems(budgets, spendingList) {
        let critBudgetItems = [];
        if (budgets) {
            budgets.forEach((item) => {
                if (parseFloat(item.budget) - parseFloat(spendingList.get(item.id)) < parseFloat(item.budget * 0.1)) {
                    critBudgetItems.push({id: item.id, categoryName: item.category, budget: parseFloat(item.budget), spent: spendingList.get(item.id)})
                }
            });
        }
        return (critBudgetItems);
    }

    function getCategorySpendMap(purchaseData) {
        let catSpendMap = new Map();
        if (purchaseData) {
            purchaseData.forEach((item) => {
                if (catSpendMap.has(item.category)) {
                    catSpendMap.set(item.category, parseFloat(catSpendMap.get(item.category)) + parseFloat(item.amount))
                }
                else {
                    catSpendMap.set(item.category, parseFloat(item.amount));
                }
            });
        }
        return (catSpendMap);
    }

    function getTwelveMonthSavings(yearSpending, yearDeposits) {
        let income = 0;
        let spending = 0;
        if (yearDeposits) {
            yearDeposits.forEach((month) => {
                month.forEach(item => {
                    income += parseFloat(item.amount);
                });
            });
        }
        if (yearSpending) {
            yearSpending.forEach((month) => {
                month.forEach((item) => {
                    spending += parseFloat(item.amount);
                });
            });
        }
        return (income - spending);
    }

    async function getMonthData(yearMonth = (new Date())) {
        let purchaseData = await getPurchaseData(yearMonth);
        let depositData = await getDepositData(yearMonth);

        setTotalSpending(getListTotal(purchaseData));
        setTotalIncome(getListTotal(depositData));
        let budgets = await getBudgetData();
        let categorySpendingMap = getCategorySpendMap(purchaseData);
        let criticalBudgetItems = getCriticalBudgetItems(budgets, categorySpendingMap);
        setCriticalBudgetItems(criticalBudgetItems);
        // get critical budget items
        // do the month to month graphs
    }

    async function getInitialData() {
        //let yearMonth = getDateYearMonth(new Date());
        getMonthData();


        let pastYearSpending = await getPastYearSpendingData();
        let pastYearDeposits = await getPastYearDepositData();
        setTwelveMonthSaving(getTwelveMonthSavings(pastYearSpending, pastYearDeposits));
        setYearIncomeMap(pastYearDeposits);
        setYearSpendingMap(pastYearSpending);
        
    };

    function critBudgetItemDisplay(item) {
        return(
            <p key={item.id}>{item.categoryName}: ${(item.budget - item.spent).toFixed(2)}</p>
        );
    }

    return (
        <div className="overview">
            <h1>Overview</h1>
            <div className="stat monthTotals">
                <hr />
                <h2>This Month</h2>
                <ul>
                    <li>Spending: ${totalSpending.toFixed(2)}</li>
                    <li>Income: ${totalIncome.toFixed(2)}</li>
                    <li>Savings: ${(totalIncome - totalSpending).toFixed(2)}</li>
                </ul>
            </div>

            <hr />
            <div className="watch criticalBudgetItems">
                <h2>Critical budget items</h2>
                    {criticalBudgetItems ? criticalBudgetItems.map(critBudgetItemDisplay) : <p>No critical budget items!</p>}
            </div>

            <hr />
            <div className="stat yearSavings">
                <h2>Past 12 Months</h2>
                <p>${twelveMonthSaving.toFixed(2)}</p>
            </div>
            <hr />
            <div className="stats graph">
                <h2>Month to month graph</h2>
                <MonthToMonthGraph yearIncomeMap={yearIncomeMap} yearSpendingMap={yearSpendingMap}/>
            </div>

            <hr />

            <div className="stat pieChart">
                <h2>Spending this month</h2>
                { /* Insert pieChart for monthly expenses */}
            </div>
        </div>
    );
}

export default Overview;
