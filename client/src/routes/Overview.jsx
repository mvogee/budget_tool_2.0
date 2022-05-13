import {React, useState, useEffect} from "react";
import {getBudgetData, getPurchaseData, getDepositData} from "../components/overviewServerRequests";
import {getDateYearMonth} from "../components/utils";
/* TODO:
*  - state functions handlers for all the displays
*   - retriev all needed data from database.
*/

function Overview(props) {
    /*
    * data needed:
    * - spendingList for month
    * - depositList for month
    * - budgetItems
    * - yearSpending
    * - yearIncome
    */
    const [monthSpendingList, setMonthSpendingList] = useState();
    const [monthDepositList, setMonthDepositList] = useState();
    const [budget, setBudget] = useState();
    const [categorySpendingMap, setCategorySpendingMap] = useState(new Map());
    const [yearSpendingListMap, setYearSpendingListMap] = useState(new Map());
    const [yearIncomeListMap, setYearIncomeListMap] = useState(new Map());
    
    useEffect(() => {
        getData();
    }, []);

    async function getPastYearSpendingData() {
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
            setYearSpendingListMap(new Map(yearSpendingListMap.set(month + 1 + "-1-" + year, newPurchaseData)));
            month--;
        }
    }

    const getData = async () => {
        let yearMonth = getDateYearMonth(new Date());
        setBudget(await getBudgetData());
        setMonthSpendingList(await getPurchaseData(yearMonth));
        setMonthDepositList(await getDepositData(yearMonth));
        getPastYearSpendingData();
    };
    return (
        <div className="overview">
            <h1>Overview</h1>
            <div className="stat monthTotals">
                <hr />
                <h2>This Month</h2>
                {/* Insert function to display total spending, total income, and total savings for the month.*/}
            </div>

            <hr />
            { /* any budget items this month that are %10 or less until out or over budget */ }
            <div className="watch criticalBudgetItems">
                <h2>Critical budget items</h2>
                    {/* Insert function to display critical budget items. */}
            </div>

            <hr />
            { /* stats: years total +- */ }
            <div className="stat yearSavings">
                <h2>This years savings</h2>
                {/* add display for this years savings*/}
            </div>
            <hr />
            <div className="stats graph">
                <h2>Month to month graph</h2>
                { /* Insert graph to display month to month income and losses */}
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
