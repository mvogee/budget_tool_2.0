
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


/**
 * This function is used by PopEdit components when initial date is set.
 * @param {editDate} Date gotten from element.
 * @returns {String} Date in standard format as a string.  
 */
export function getDateEdit(editDate) {
    let date = new Date(editDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let fullDate = ("" + year + "-" + (month < 10 ? "0" + month.toString() : month.toString()) + "-" + (day < 10 ? "0" + day.toString() : day.toString()));
    return (fullDate);
}

/**
  * 
  * @param {Date} date 
  * @return {String} Date string in format yyyy-mm
*/
export function getDateYearMonth(date) {
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    return (year + "-" + (date.getMonth() + 1 < 10 ? "0" + month : month));
}