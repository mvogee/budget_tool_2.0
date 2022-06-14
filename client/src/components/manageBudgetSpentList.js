
// create an array [{name: "x", amount: x}, {}, {}] // unless the user adds thousands of budgets size will not make a difference
const manageBudgetSpentList = {

    /**
     * 
     * @param {Array} spendingList 
     * @returns {Array}
     */
    createBudgetSpentListFromSpendingList: (spendingList) => {
        let memoryMap = new Map(); // will hold {key: category, value: index of category in list}
        let list = []; // holds objects in [{category: x, amount: x}]
        spendingList.forEach((item) => {
            if (memoryMap.has(item.category)) {
                list[memoryMap.get(item.category)].amount += parseFloat(item.amount);
            }
            else {
                list.push({category: item.category, amount: parseFloat(item.amount)})
                memoryMap.set(item.category, list.length - 1);
            }
        });
        return (list);
    },
    getValueByCategoryId: (budgetSpentList, category) => {
        let amount = 0.00;
        for (let i = 0; i < budgetSpentList.length; i++) {
            if (budgetSpentList[i].category === category) {
                amount = budgetSpentList[i].amount;
                break ;
            }
        }
        return (amount);
    }
};


export default manageBudgetSpentList;