import {React, useState} from "react";
import PopEditIncome from "./PopEditIncome";
import {sendData} from "./serverCommunications.js";

function IncomeDisplay(props) {
    const [idxEdit, setidxEdit] = useState(0);
    const [editId, setEditId] = useState(null);
    const [nameEdit, setNameEdit] = useState("");
    const [rateEdit, setRateEdit] = useState("");
    const [hoursEdit, setHoursEdit] = useState(0);
    const [taxEdit, setTaxEdit] = useState(0);
    const [retireEdit, setRetireEdit] = useState(0);
    const [displayPopup, setDisplayPopup] = useState(false);

    async function deleteRequest(itemId) {
        let data = {deleteIncome: itemId};
        let url = "/service/income";
        const reData = await sendData(url, "DELETE", data);
        console.log(reData);
        if (reData.success) {
            console.log("item was deleted");
        }
    }

    function deleteBtn(event) {
        if (window.confirm("Are you sure you want to delete " + event.target.dataset.incomename + "?") === true) {
            props.setIncomeList((prevList) => {
                let newList = Array.from(prevList);
                newList.splice(event.target.dataset.idx, 1);
                props.calculateMonthIncome(newList);
                return (newList);
            });
            deleteRequest(event.target.dataset.id);
        }
    }

    function editBtn(event) {
        setDisplayPopup(true);
        setidxEdit(event.target.dataset.idx);
        setEditId(event.target.dataset.id);
        setNameEdit(event.target.dataset.incomename);
        setRateEdit(event.target.dataset.hourlyrate);
        setHoursEdit(event.target.dataset.hoursperweek);
        setTaxEdit((event.target.dataset.taxrate) * 100);
        setRetireEdit((event.target.dataset.retirement) * 100);
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
                    <button type="button" className="editBtn" onClick={editBtn}
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
        <PopEditIncome
            displayPopup={displayPopup} setDisplayPopup={setDisplayPopup}
            incomeList={props.incomeList} setIncomeList={props.setIncomeList}
            editId={editId} setEditId={setEditId}
            nameEdit={nameEdit} setNameEdit={setNameEdit}
            rateEdit={rateEdit} setRateEdit={setRateEdit}
            hoursEdit={hoursEdit} setHoursEdit={setHoursEdit}
            taxEdit={taxEdit} setTaxEdit={setTaxEdit}
            retireEdit={retireEdit} setRetireEdit={setRetireEdit}
            idxEdit={idxEdit} setidxEdit={setidxEdit}
            calculateMonthIncome={props.calculateMonthIncome}
        />
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