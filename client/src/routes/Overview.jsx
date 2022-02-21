import React from "react";

/* TODO:
*   - state functions handlers for all the displays
*   - retriev all needed data from database.
*/

function Overview(props) {
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
