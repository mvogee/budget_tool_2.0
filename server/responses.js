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

/**
* @param {object} res - Express response object
* @param {string} route - the route that failed the authentication
**/
function jsonFailedAuthResponse(res, route) {
    res.json({
        success: false,
        message: "Authentication failed on route /" + route + ". Please log in and try again.",
        obj: null
    })
}

module.exports = {
    jsonResponse: jsonResponse,
    jsonFailedAuthresponse: jsonFailedAuthResponse
}
