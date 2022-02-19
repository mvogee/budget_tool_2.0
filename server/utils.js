

function getMonthStart(date) {
    let m = (date.getMonth() + 1).toString();
    if (date.getMonth() + 1 < 10) {
        m = "0" + m;
    }
    let y = date.getFullYear().toString();
    let monthStart = y + "-" + m + "-01";
    return (monthStart);
};

function getMonthEnd(date) {
    let y = date.getFullYear().toString();
    let m = (date.getMonth() + 1).toString();
    if (date.getMonth() + 1 < 10) {
        m = "0" + m;
    }
    let d = new Date(y,m, 0).getDate().toString();
    return (y+"-" + m + "-" +d);
};

module.exports = {
    getMonthStart: getMonthStart,
    getMonthEnd: getMonthEnd
}
