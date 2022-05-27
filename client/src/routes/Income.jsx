import { React, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import PopEditIncome from "../components/PopEditIncome.jsx";
import IncomeDisplay from "../components/IncomeDisplay.jsx";
import checkAuth from "../checkAuth";
/* TODO:
*   - state handlers for all inputs.
*   - state handlers for variables needed.
*   - Form submit button link to database.
*   - display functions for income table.
*/

function Income(props) {
    const [incomeList, setIncomeList] = useState();
    const [name, setName] = useState("");
    const [hourlyRate, setHourlyRate] = useState(0);
    const [hoursPerWeek, setHoursPerWeek] = useState(40);
    const [taxRate, setTaxRate] = useState(0);
    const [retirement, setRetirement] = useState(0);
    const [grossIncome, setGrossIncome] = useState(0);
    const [netIncome, setNetIncome] = useState(0);
    const navigate = useNavigate();

    function setInput(e, inputSetter) {
        inputSetter(e.target.value);
    }

    async function getData() {
        let url = "/income"
        let opts = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
        // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        };
        const response = await fetch(url, opts);
        const reData = await response.json();
        console.log(reData);
        if (reData.success) {
            setIncomeList(reData.obj);
            calculateMonthIncome(reData.obj);
        }
        
    }

    async function sendData() {
        let data = {incomeName: name, hourlyRate: hourlyRate, hoursPerWeek: hoursPerWeek, taxRate: taxRate, retirement: retirement };
        let url = "/income"
        let opts = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data) // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        };

        const response = await fetch(url, opts);
        const reData = await response.json();
        setListData(reData.obj.insertId);
        console.log(reData);
    }

    function setListData(id) {
        let newIncomeItem = {id: id, incomeName: name, hourlyRate: hourlyRate, hoursPerWeek: hoursPerWeek, taxRate: (taxRate / 100), retirement: (retirement / 100) };
        console.log(newIncomeItem);
        //setIncomeList(incomeList ? incomeList.concat(newIncomeItem) : [newIncomeItem]);
        setIncomeList((prevVal) => {return (prevVal ? prevVal.concat(newIncomeItem) : [newIncomeItem])});
        calculateMonthIncome(incomeList ? incomeList.concat(newIncomeItem) : [newIncomeItem]);
    }

    useEffect(() => {
        const authenticate = async () => {
            let auth = await checkAuth(props.setUser);
            console.log(auth);
            if (auth) {
                getData();
            }
            else {
                navigate("/login");
            }
        }
        authenticate();
    }, []);

    function calculateMonthIncome(incomesList) {
        let gross = 0;
        let net = 0;
        incomesList.forEach((item) => {
            let itemGross = ((parseFloat(item.hourlyRate) * parseFloat(item.hoursPerWeek)) * 4);
            gross += itemGross;
            net += itemGross - (itemGross * item.taxRate) - (itemGross * item.retirement);
        });
        setGrossIncome(gross);
        setNetIncome(net);
    }

    function submitBtn(event) {
        event.preventDefault();
        sendData()
    }

    return (
        <div className="income">
            <h1>Income</h1>
            <div className="top-stats">
                <p>Gross income: ${grossIncome.toFixed(2)} </p>
                <p>Net income: ${netIncome.toFixed(2)} </p>
            </div>
            <hr />
            <div className="form_div">
                <form name="newIncomeItm" >
                    <div className="input_div">
                        <label htmlFor="incomeName">Income Name</label>
                        <input name="incomeName" type="text" placeholder="name" required autoFocus value={name} onChange={(e) => {setInput(e, setName)}} />
                    </div>
                    <div className="input_div">
                        <label htmlFor="hourlyRate">Hourly Rate</label>
                        <input name="hourlyRate" type="number" step=".01" required value={hourlyRate} onChange={(e) => {setInput(e, setHourlyRate)}} />
                    </div>
                    <div className="input_div">
                        <label htmlFor="hoursPerWeek">Hrs/Week</label>
                        <input name="hoursPerWeek" type="number" step="0.01" required value={hoursPerWeek} onChange={(e) => {setInput(e, setHoursPerWeek)}}/>
                    </div>
                    <div className="input_div">
                        <label htmlFor="taxRate">Tax Rate %</label>
                        <input name="taxRate" type="number" step="1" value={taxRate} onChange={(e) => {setInput(e, setTaxRate)}}/>
                    </div>
                    <div className="input_div">
                        <label htmlFor="retirement">Retirement %</label>
                        <input name="retirement" type="number" step="1" value={retirement} onChange={(e) => {setInput(e, setRetirement)}}/>
                    </div>
                    <button type="submit" onClick={submitBtn}>Add</button>
                </form>
            </div>
            <div className="Display">
                <IncomeDisplay incomeList={incomeList} setIncomeList={setIncomeList} calculateMonthIncome={calculateMonthIncome}/>
            </div>
        </div>
    );
}

export default Income;
