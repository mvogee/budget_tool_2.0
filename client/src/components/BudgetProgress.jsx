import {React} from "react";

function BudgetProgress(props) {

    function tableItem(item) {
        let spent = props.categorySpendingMap.get(item.id) ? props.categorySpendingMap.get(item.id) : 0;
        return (
            <tr key={item.id}>
                <td>{item.category}</td>
                <td>{item.budget}</td>
                <td>{spent}</td>
                <td>{(item.budget - spent).toFixed(2)}</td>
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