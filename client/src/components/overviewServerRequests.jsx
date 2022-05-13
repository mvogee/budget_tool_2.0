    /*
    * data needed:
    * - spendingList for month
    * - depositList for month
    * - budgetItems
    */


/**
 * This function is used by PopEdit components when initial date is set.
 * @param {yearMonth} String: Year and month to be queried for spending data. format yyyy-mm
 * @returns {Object}
 */
export const getPurchaseData = async(yearMonth) => {
    console.log("requesting purchaseData");
    let url = "/monthSpending/" + yearMonth;
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
    let url = "/monthIncome/" + yearMonth;
    let opts = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    };
    const response = await fetch(url, opts);
    const reData = await response.json();
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
    let url = "/budgets";
    let opts = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    };
    const response = await fetch(url, opts);
    const reData = await response.json();
    if (reData.success) {
        return (reData.obj);
    }
    else {
        console.error(reData.message);
        return (null);
    }
}