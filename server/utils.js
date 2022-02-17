
/**
* @param {object} res - the express response object
* @param {boolean} success - successful
* @param {message} message - success message to be sent back to the client
* @param {obj} obj - OPTIONAL. information object to be sent back to the user.
**/
// move to utilities
function jsonResponse(res, success, message, data = null) {
    res.json({
        success: success,
        message: message,
        obj: obj
    });
}


module.exports = {
    jsonResponse: jsonResponse
}
