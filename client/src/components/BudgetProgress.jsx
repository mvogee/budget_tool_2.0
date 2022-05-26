import {React} from "react";

function BudgetProgress(props) {

    function tableItem(item) {
        return (
            <tr key={item.id}>
                <td>{item.category}</td>
                <td>{item.budget}</td>
                <td>{props.categorySpendingMap.get(item.id)}</td>
                <td>{(item.budget - props.categorySpendingMap.get(item.id)).toFixed(2)}</td>
            </tr>
        );
    }

    return (
        <div className="budgetProgress">
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>budgeted</th>
                        <th>spent</th>
                        <th>left</th>
                    </tr>
                </thead>
                <tbody>
                    {props.budgetList ? props.budgetList.map(tableItem) : null}
                </tbody>
            </table>
        </div>
    );
}

export default BudgetProgress;