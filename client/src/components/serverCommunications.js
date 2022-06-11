/**
 * 
 * @param {String} route the route to request the server data
 */
export async function requestData(route) {
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
    const response = await fetch(route, opts);
    const reData = await response.json();
    return (reData);
}

/**
 * 
 * @param {String} route the route to send the data to
 * @param {String} method "POST, PATCH, DELETE"
 * @param {Object} data the data to be send to the server
 */
export async function sendData(route, method, data) {
    let opts = {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
    const response = await fetch(route, opts);
    const reData = await response.json();
    return (reData);
}