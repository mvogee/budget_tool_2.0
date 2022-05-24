import React from "react";

function IncomeDisplay(props) {

    function deleteBtn(event) {
        // remove from local list
        props.setIncomeList((prevList) => {
            let newList = Array.from(prevList);
            newList.splice(event.target.dataset.idx, 1);
            props.calculateMonthIncome(newList);
            return (newList);
        });
        
        // remove from remote list
    }

    function incomeItem(item, idx) {
        return(
            <tr key={item.id} className="itemRow">
                <td>{item.incomeName}</td>
                <td>{item.hourlyRate}</td>
                <td>{item.hoursPerWeek}</td>
                <td>{item.taxRate}</td>
                <td>{item.retirement}</td>
                <td>
                    <button type="button" className="editBtn"
                        data-id={item.id}
                        data-incomename={item.incomeName}
                        data-hourlyrate={item.hourlyRate}
                        data-hoursperweek={item.hoursPerWeek}
                        data-taxrate={item.taxRate}
                        data-retirement={item.retirement}
                        data-idx={idx}
                        >Edit
                    </button>
                </td>
                <td>
                    <button type="button" className="deleteBtn" onClick={deleteBtn}
                        data-id={item.id}
                        data-incomename={item.incomeName}
                        data-idx={idx}
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