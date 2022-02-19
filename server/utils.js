
/**
* @param {object} res - the express response object
* @param {boolean} success - successful
* @param {string} message - success message to be sent back to the client
* @param {obj} obj - OPTIONAL. information object to be sent back to the user.
**/
function jsonResponse(res, success, message, data = null) {
    res.json({
        success: success,
        message: message,
        obj: obj
    });
}

function jsonFailedAuthResponse(res, route) {
    res.json({
        success: false,
        message: "Authentication failed on route /" + route + ". Please log in and try again.",
        obj: null
    })
}

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
    jsonResponse: jsonResponse,
    jsonFailedAuthresponse: jsonFailedAuthResponse,
    getMonthStart: getMonthStart,
    getMonthEnd: getMonthEnd
}
