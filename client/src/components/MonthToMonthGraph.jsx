import {React} from "react";
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';

    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );

    function parseData(monthMap) {
        if (!monthMap) {
            return null;
        }
        let dataArray = [];
        monthMap.forEach((month) => {
            let total = 0;
            month.forEach((item) => {total += parseFloat(item.amount)});
            dataArray.unshift(total);
        });
        return (dataArray);
    }

    function parseSavings(monthSavings, monthSpendings) {
        let dataArray = [];
        for (let i = 0; i < 12; i++) {
            dataArray.push(monthSavings[i] - monthSpendings[i]);
        }
        return (dataArray);
    }

    function getLabels() {
        let labels = []
        const months = ["Jan","Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = new Date().getMonth() + 1;
        for (let i = 0; i < 12; i++) {
            if (date > 11) {
                date = 0;
            }
            labels.push(months[date]);
            date++;
        }
        console.log(labels);
        return (labels);
    }
// props: yearSpendingMap, yearIncomeMap
function MonthToMonthGraph(props) {
    const spending = parseData(props.yearSpendingMap);
    const income = parseData(props.yearIncomeMap);
    const savings = parseSavings(income, spending);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };
    const labels = getLabels();
    const data = {
        labels,
        datasets: [
            {
                label: 'Spending',
                data: spending,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Income',
                data: income,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Savings',
                data: savings,
                borderColor: 'rgb(53, 162, 120)',
                backgroundColor: 'rgba(53, 162, 120, 0.5)',
            }
        ],
    }

    return (
        <div className="monthToMonthGraph">
            <Line options={options} data={data}/>
        </div>
    );
}

export default MonthToMonthGraph;
