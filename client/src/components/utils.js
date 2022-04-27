
/**
 * 
 * @param {Number} catId 
 * @param {[{}]} budgets 
 * @returns {String} name of cateogry
 */
export function getCategoryName(catId, budgets) {
    let categoryName = "un-categorized";
    if (catId !== 0 && budgets) {
        for (let i = 0; i < budgets.length; i++) {
            if (budgets[i].id === catId) {
                categoryName = budgets[i].category;
                break;
            }
        }
    }
    return (categoryName);
}

/**
 * 
 * @param {date} date as long a new Date will get the correct date from the parameter it can be anything.
 * @returns {String} Date in standard format as a string.  
 */
export function getStandardDateFormat(date) {
    date = new Date(date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let fullDate = (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day) + "/" + year;
    return(fullDate)
}