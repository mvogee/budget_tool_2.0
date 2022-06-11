    /*
    * data needed:
    * - spendingList for month
    * - depositList for month
    * - budgetItems
    */

import { requestData } from "./serverCommunications";
/**
 * This function is used by PopEdit components when initial date is set.
 * @param {yearMonth} String: Year and month to be queried for spending data. format yyyy-mm
 * @returns {Object}
 */
export const getPurchaseData = async(yearMonth) => {
    console.log("requesting purchaseData");
    let url = "/service/monthSpending/" + yearMonth;
    const reData = await requestData(url);
    if (reData.success) {
        return (reData.obj);
    }
    else {
        console.error(reData.message);
        return (null);
    }
}

/**
 * This function is used by PopEdit components when initial date is set.
 * @param {yearMonth} String: Year and month to be queried for spending data. format yyyy-mm
 * @returns {Object}
 */
export const getDepositData = async (yearMonth) => {
    console.log("requesting depositData");
    let url = "/service/monthIncome/" + yearMonth;
    const reData = await requestData(url);
    if (reData.success) {
        return (reData.obj);
    }
    else {
        console.error(reData.message);
        return (null);
    }
}

export const getBudgetData = async () => {
    console.log("requesting budget data");
    let url = "/service/budgets";
    const reData = await requestData(url);
    if (reData.success) {
        return (reData.obj);
    }
    else {
        console.error(reData.message);
        return (null);
    }
}