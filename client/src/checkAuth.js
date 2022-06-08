
async function checkAuth(setUser) {
    // make call to server to authenticate and return false if no user otherwise return user
    let url = "/service/authenticate";
    let opts = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        };
    const response = await fetch(url, opts);
    let data = await response.json();
    if (data.success) {
        console.log("user authenticated success");
        setUser(data.obj);
        return (true);
    }
    else {
        console.log("user authentication failed");
        setUser(null);
        return (false);
    }
}

export default checkAuth;