import React from "react";
import {sendData} from "./serverCommunications.js";
import '../styles/popup.css';

function PopEditIncome(props) {

    function closePopup() {
        props.setNameEdit("");
        props.setRateEdit(0);
        props.setHoursEdit(0);
        props.setTaxEdit(0);
        props.setRetireEdit(0);
        props.setidxEdit(null);
        props.setEditId(0);
        props.setDisplayPopup(false);
    }

    function updateLocal() {
        let updatedIncomeItem = {id: props.editId, incomeName: props.nameEdit, hourlyRate: parseFloat(props.rateEdit), hoursPerWeek: parseFloat(props.hoursEdit), taxRate: (props.taxEdit / 100), retirement: (props.retireEdit / 100) };
        props.setIncomeList((prevState) => {
            let newList = Array.from(prevState);
            newList[props.idxEdit] = updatedIncomeItem;
            return (newList);
        });
    }

    async function updateRemote() {
        let data = {itmId: props.editId, incomeName: props.nameEdit, hourlyRate: props.rateEdit, hoursPerWeek: props.hoursEdit, taxRate: props.taxEdit, retirement: props.retireEdit };
        let url = "/service/income";
        const reData = await sendData(url, "PATCH", data);
        console.log(reData);
        closePopup();
    }

    function submitBtn(event) {
        event.preventDefault();
        updateLocal();
        // update the remote copy of incomeList
        updateRemote();
        props.calculateMonthIncome(props.incomeList);
    }

    function cancelBtn(event) {
        closePopup();
    }

    function nameOnChange(event) {
        props.setNameEdit(event.target.value);
    }
    function rateOnChange(event) {
        props.setRateEdit(event.target.value);
    }
    function hoursOnChange(event) {
        props.setHoursEdit(event.target.value);

    }
    function taxOnChange(event) {
        props.setTaxEdit(event.target.value);
    }
    function retireOnChange(event) {
        props.setRetireEdit(event.target.value);
    }
    return (
        <div className={props.displayPopup ? "popup-container popDisplay" : "popup-container popDisplayNone"}>
            <div className="popupEdit">
                <form className="popEditForm">
                    <p>Update income item</p>
                    <div className="input_div">
                        <label htmlFor="incomeName">Income Name</label>
                        <input className="nameInput" name="incomeName" type="text" onChange={nameOnChange} required autoFocus value={props.nameEdit} />
                    </div>
                    <div className="input_div">
                        <label htmlFor="hourlyRate"> Hourly Rate</label>
                        <input className="hourlyRateInput" name="hourlyRate" type="number" step=".01" onChange={rateOnChange} required value={props.rateEdit} />
                    </div>
                    <div className="input_div">
                        <label htmlFor="hoursPerWeek">Hr/Week</label>
                        <input className="hoursPerWeek" name="hoursPerWeek" type="number" step="0.01" onChange={hoursOnChange} required value={props.hoursEdit} />
                    </div>
                    <div className="input_div">
                        <label htmlFor="taxRate">Tax Rate %</label>
                        <input className="taxRateInput" name="taxRate" type="number" step="1" onChange={taxOnChange} value={props.taxEdit} />
                    </div>
                    <div className="input_div">
                        <label htmlFor="retirement">Retirement %</label>
                        <input className="retirementInput" name="retirement" type="number" step="1" onChange={retireOnChange} value={props.retireEdit} />
                    </div>
                    <button className="submitBtn buttons-secondary" type="button" onClick={submitBtn}>Save</button>
                    <button className="cancelBtn buttons-secondary" type="button" onClick={cancelBtn}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default PopEditIncome;