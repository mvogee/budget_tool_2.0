import React from "react";

function IncomeDisplay(props) {

    function incomeItem(item) {
        return(
            <tr key={item.id} className="itemRow">
                <td>{item.incomeName}</td>
                <td>{item.hourlyRate}</td>
                <td>{item.hoursPerWeek}</td>
                <td>{item.taxRate}</td>
                <td>{item.retirement}</td>
                <td>
                    <button type="button" className="editBtn"
                        id={item.id}
                        incomename={item.incomeName}
                        hourlyrate={item.hourlyRate}
                        hoursperweek={item.hoursPerWeek}
                        taxrate={item.taxRate}
                        retirement={item.retirement}
                        >Edit
                    </button>
                </td>
                <td>
                    <button type="button" className="deleteBtn"
                        id={item.id}
                        incomename={item.incomeName}
                        >Delete
                    </button>
                </td>
            </tr>
        );
    }

    return (
        <div className="incomeDisplayy">
            <table className="income-table">
                <thead>
                    <tr>
                        <th>Income Name</th>
                        <th>Hourly Rate</th>
                        <th>Hours per week</th>
                        <th>Tax Rate</th>
                        <th>Retirement</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.incomeList ? props.incomeList.map(incomeItem) : null}
                </tbody>
            </table>
        </div> 
    );
}

export default IncomeDisplay;