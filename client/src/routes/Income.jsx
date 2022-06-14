import { React, useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import IncomeDisplay from "../components/IncomeDisplay.jsx";
import { requestData, sendData } from "../components/serverCommunications";
import checkAuth from "../checkAuth";


function Income(props) {
    const [incomeList, setIncomeList] = useState();
    const [name, setName] = useState("");
    const [hourlyRate, setHourlyRate] = useState(0);
    const [hoursPerWeek, setHoursPerWeek] = useState(40);
    const [taxRate, setTaxRate] = useState(0);
    const [retirement, setRetirement] = useState(0);
    const [grossIncome, setGrossIncome] = useState(0);
    const [netIncome, setNetIncome] = useState(0);
    const runEffect = useRef(true);
    const navigate = useNavigate();
    const refocusInput = useRef(null);

    useEffect(() => {
        const authenticate = async () => {
            let auth = await checkAuth(props.setUser);
            console.log(auth);
            if (auth && runEffect.current) {
                getData();
                runEffect.current = false;
            }
            else if (!auth){
                navigate("/login");
            }
        }
        authenticate();

        async function getData() {
            let url = "/service/income"
            const reData = await requestData(url);
            console.log(reData);
            if (reData.success) {
                setIncomeList(reData.obj);
                calculateMonthIncome(reData.obj);
            }
        }
    }, [navigate, props.setUser]);

    function setInput(e, inputSetter) {
        inputSetter(e.target.value);
    }

    async function postData() {
        let data = {incomeName: name, hourlyRate: hourlyRate, hoursPerWeek: hoursPerWeek, taxRate: taxRate, retirement: retirement };
        let url = "/service/income"
        const reData = await sendData(url, "POST", data);
        setListData(reData.obj.insertId);
        console.log(reData);
    }

    function setListData(id) {
        let newIncomeItem = {id: id, incomeName: name, hourlyRate: hourlyRate, hoursPerWeek: hoursPerWeek, taxRate: (taxRate / 100), retirement: (retirement / 100) };
        setIncomeList((prevVal) => {return (prevVal ? prevVal.concat(newIncomeItem) : [newIncomeItem])});
        calculateMonthIncome(incomeList ? incomeList.concat(newIncomeItem) : [newIncomeItem]);
    }

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

    function clearInputs() {
        setName("");
        setHourlyRate(0);
        setHoursPerWeek(40);
        setTaxRate(0);
        setRetirement(0);
    }

    function submitBtn(event) {
        event.preventDefault();
        postData();
        clearInputs();
        refocusInput.current.focus();
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
