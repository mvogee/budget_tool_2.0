const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require('passport');
const session = require("express-session");
const bcrypt = require("bcryptjs");
const mysql = require("./db_config.js").pool;

const utils = require("./utils.js");
const cipher = require("./cipher.js");
app = express();
const port = process.env.port || 3095;

require("./passport_config")(passport);

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("trust proxy", 1);
app.use(session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: 'strict'}
    })
);
app.use(passport.initialize());
app.use(passport.session());

// * --- END BOILERPLATE ----- *


// #old code
// app.post("/login",
//     passport.authenticate('local', {
//         //successRedirect: '/overview', // #update (this is going to need to change. on failure send failed object.)
//         //failureRedirect: '/login', // don't redirect. will handle failure on client side.
//         }),
//         (req, res) => {
//         //res.redirect("/overview"); // the user is bound to the res at this point??
//             res.json({
//                 success: req.user ? true : false,
//                 message: "login successful"
//             }); // #updated. this should work.. needs testing
// );

app.post("/login",
    passport.authenticate('local', {}),
    (req, res) => {
            utils.jsonResponse(res, req.user ? true : false, "login successful");
    }
);

app.post("/createAcc", (req, res) => {
    const pw = req.body.password;
    const email = req.body.email;
    const userName = req.body.userName;
    let sql = "SELECT email FROM users WHERE email=?";
    mysql.query(sql, [email], (err, result) => {
        console.log(result);
        if (err) {
            console.log(err);
            return (err);
        }
        if (result[0]) {
            console.log("email already used for another account");
            //res.redirect('/'); #old code
            utils.jsonResponse(res, false, "Email already used for another account.");
            // res.json({
            //     success: false,
            //     message: "email already used for another account."
            // });
        }
        else {
            let insertSql = "INSERT INTO users(email, password, username) VALUES(?,?,?)";
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return (err);
                }
                bcrypt.hash(pw, salt, (err, hash) => {
                    if (err) {
                        return (err);
                    }
                    mysql.query(insertSql, [email, hash, userName], (error, created) => {
                        console.log("acount created");
                        if (error) {
                            console.log(error);
                            return (error);
                        }
                        console.log(created);
                        //res.redirect("/login"); #old code
                        utils.jsonResponse(res, true, "Account successfuly created");
                        // res.json({
                        //     success: true,
                        //     message: "account successfuly created"
                        // });
                    });
                });
            });
        }
    });
});

app.get("/logout", (req, res) => {
    req.logout();
    //res.redirect("/login"); #old code
    utils.jsonResponse(res, true, "User has been logged out.")
    // res.json({
    //     success: true,
    //     message: "user has been logged out."
    // });
});

app.get("/authenticate", (req, res) => {
    if (req.isAuthenticated()) { // confirm req.isAutnticated will not return true nomatter what.
        utils.jsonResponse(res, true, "user is authenticated.", req.user);
    }
    else {
        utils.jsonFailedAuthResponse(res, "authenticate");
    }
})


// -- INCOME ROUTES -- //
app.route("/income")
.get((req, res) => {
    if (req.isAuthenticated()) {
        let sql = "SELECT * FROM projectedIncome WHERE userId=?;";
        mysql.query(sql, req.user.id, (err, result) => {
            if (err) {
                console.log(err);
                utils.jsonResponse(res, false, err);
            }
            utils.jsonResponse(res, true, "Successfully retrieved projected income data.", result);
        });
    }
    else {
        utils.jsonFailedAuthResponse(res, "income");
    }
})
.post((req, res) => {
    if (req.isAuthenticated()) {
        console.log("adding item to projectedIncome");
        let sql = "INSERT INTO projectedIncome(incomeName, hourlyRate, taxRate, retirement, hoursPerWeek, userId) VALUES(?,?,?,?,?,?);";
        mysql.query(sql, [req.body.incomeName, req.body.hourlyRate, (req.body.taxRate / 100), (req.body.retirement / 100), req.body.hoursPerWeek, req.user.id],
            (err, result) => {
                if (err) {
                    console.log(err);
                    utils.jsonResponse(res, false, err);
                }
                else {
                    utils.jsonResponse(res, true, result);
                }
        });
    }
    else {
        utils.jsonFailedAuthResponse(res, "income");
    }
})
.delete((req, res) => {
    if (req.isAuthenticated()) {
        console.log("deleting income item");
        let sql = "DELETE FROM projectedIncome WHERE id=? AND userId=?;";
        mysql.query(sql, [req.body.deleteIncome, req.user.id], (err, result) => {
            if (err) {
                console.log(err);
                utils.jsonResponse(res, false, err);
            }
            else {
                utils.jsonResponse(res, true, result);
            }
        });
    }
    else {
        utils.jsonFailedAuthResponse(res, "income");
    }
})
.patch((req, res) => {
    if (req.isAuthenticated()) {
        console.log("updating income item");
        let sql = "UPDATE projectedIncome SET incomeName=?, hourlyRate=?, taxRate=?, retirement=?, hoursPerWeek=? WHERE id=? AND userId=?;";
        mysql.query(sql, [req.body.incomeName, req.body.hourlyRate, (req.body.taxRate / 100), (req.body.retirement / 100), req.body.hoursPerWeek, req.body.itmId, req.user.id],
            (err, result) => {
                if (err) {
                    console.log(err);
                    utils.jsonResponse(res, false, err);
                }
                else {
                    utils.jsonResponse(res, true, result);
                }
            });
    }
    else {
        utils.jsonFailedAuthResponse(res, "income");
    }
});

// ! thisMonth routes

app.get("/'monthIncome/:month?", (req, res) => {
    if (req.isAuthenticated()) {
        dt = new Date();
        if (req.params.month) {
            dt = new Date(req.params.month + "-02");
        }
        let monthStart = utils.getMonthStart(dt);
        let monthEnd = utils.getMonthEnd(dt);
        let sql = "SELECT * FROM monthIncome WHERE depositDate >=? AND depositDate <=? AND userId=?;";
        mysql.query(sql, [monthStart, monthEnd, req.user.id], (err, result) => {
            if (err) {
                console.log(err);
                jsonResponse(res, false, err);
            }
            else {
                result.forEach(item => {
                    item.inDescription = cipher.decryptString(item.inDescription, process.env.KEY);
                    item.amount = cipher.decryptString(item.amount, process.env.KEY);
                });
                utils.jsonResponse(res, true, "monthIncome data retrieved.", result);
            }
        });
    }
    else {
        utils.jsonFailedAuthResponse(res, "monthIncome");
    }
});

app.get("/monthSpending/:month?", (req, res) => {
    if (req.isAutnticated()) {
        dt = new Date();
        if (req.params.month) {
            dt = new Date(req.params.month + "-02");
        }
        let monthStart = utils.getMonthStart(dt);
        let monthEnd = utils.getMonthEnd(dt);
        let sql = "SELECT * FROM monthSpending WHERE purchaseDate >= ? AND purchaseDate <= ? AND userId=?;";
        mysql.query(sql, [monthStart, monthEnd, req.user.id], (err, result) => {
            if (err) {
                console.log(err);
                utils.jsonResponse(res, false, err);
            }
            else {
                result.foreach(item => {
                    item.itmDescription = cipher.decryptString(item.itmDescription, process.env.KEY);
                    item.amount = cipher.decryptString(item.amount, process.env.KEY);
                });
                utils.jsonResponse(res, true, "MonthSpending data retrieved.", result);
            }
        });
    }
    else {
        utils.jsonFailedAuthResponse(res, "monthSpending");
    }
});

app.get("/budgets", (req, res) => {
    if (req.isAuthenticated()) {
        let sql = "SELECT * FROM budgets WHERE userId=?;";
        mysql.query(sql, req.user.id, (err, result) => {
            if (err) {
                console.log(err);
                utils.jsonResponse(res, false, err);
            }
            else {
                utils.jsonResponse(res, true, "budgets data retrieved.", result);
            }
        });
    }
    else {
        utils.jsonFailedAuthResponse(res, "budgets");
    }
});


app.listen(port, () => {
  console.log("Hello World 2.0!");
});
