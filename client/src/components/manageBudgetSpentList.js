import { get } from "express/lib/response";

// create an array [{name: "x", amount: x}, {}, {}] // unless the user adds thousands of budgets size will not make a difference
const manageBudgetSpentList = {
    /**
     *
     * @param {Object} budgetList
     * @returns {Array} returns an array containing [{name: "", amount: 0}] for each budget item
    */
    createBudgetSpentList: (budgetList) => {
        let budgetSpent = [];
        if (!budgetList || !budgetList.length) {
            return (budgetSpent);
        }
        budgetList.forEach((item) => {
            budgetSpent.push({name: item.category, amount: 0.00});
        });
        return (budgetSpent);
    },

    /**
     *
     * @param {Array} budgetSpentList the budgetSpent Array
     * @param {String} name budget name to update the value for
     * @param {Float} addValue the value to be added to the current value. can be negative
     * @returns {Array} returns a copy of the original array with the addValue added to the name category
    */
    updateBudgetSpentItem: (budgetSpentList, name, addValue) => {
        let newList = Array.from(budgetSpentList);
        newList.forEach((item) => {
            if(item.name === name) {
                item.amount += parseFloat(addValue);
            }
        });
        return (newList);
    },

    /**
     * sets all amounts to 0 and returns a new copy of the array
     * @param {Array} budgetSpentList
     * @returns {Array} Returns new copy of the array with zeroed out amounts
    */
    deleteBudgetSpent: (budgetSpentList) => {
        let newList = Array.from(budgetSpentList);
        newList.forEach((item) => {
            item.amount = 0.00;
        });
        return (newList);
    },
    /**
     * @param {Array} budgetSpentList
     * @param {String} name Name of category you'd like the value for
     */
    getValueByName: (budgetSpentList, name) => {
        budgetSpentList.forEach((item) => {
            if(item.name === name) {
                return (item.amount);
            }
        });
        return (0.00);
    }
};


export default manageBudgetSpentList;