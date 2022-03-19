import { React, useEffect} from "react";

function BudgetsDisplay(props) {

    useEffect(() => {console.log(props.budgets)}, []);

    function budgetItems(item) {
        console.log(item);
        return (
            <tr key={item.id} className="itemRow">
                <td>{item.category}</td>
                <td>{item.budget}</td>
                <td><button className="editButton editButtonBudgets" type="button"
                    id={item.id}
                    category={item.category}
                    budget={item.budget}
                >edit</button>
                </td>
                <td>
                    <button className="deleteBtn" type="button" itmId={item.id} >Delete</button>
                </td>
            </tr>
        );
    }

    return (
        <div className="budgetsDisplay">
            <table className="budgets-table">
                <thead>
                        <tr>
                                <th>Category</th>
                                <th>Budget</th>
                                <th></th>
                                <th></th>
                        </tr>
                </thead>
                <tbody>
                    {props.budgets ? props.budgets.map(budgetItems) : null}
                </tbody>
            </table>
        </div>
    );
}

export default BudgetsDisplay;