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


// -- Projected INCOME ROUTES -- //
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
                    utils.jsonResponse(res, true, "Added item to projectedIncome", result);
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
                utils.jsonResponse(res, true, "Deleted item from projectedIncome", result);
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
                    utils.jsonResponse(res, true, "updated Item in projectedIncome", result);
                }
            });
    }
    else {
        utils.jsonFailedAuthResponse(res, "income");
    }
});

// -- monthIncome Routes --//
app.route("/monthIncome/:month?")
.get((req, res) => {
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
})
.post((req, res) => {
    if (req.isAuthenticated()) {
        let sql = "INSERT INTO monthIncome(inDescription, amount, depositDate, userId) VALUES(?, ?, ?, ?);";
        let itemName = cipher.encryptString(req.body.itemName, process.env.KEY);
        let amount = cipher.encryptString(req.body.amount, process.env.KEY);
        mysql.query(sql, [itemName, amount, req.body.date, req.user.id], (err, result) => {
            if (err) {
                console.log(err);
                utils.jsonResponse(res, false, err);
            }
            else {
                utils.jsonResponse(res, true, "Added item to monthIncome.", result);
            }
        });
    }
    else {
        utils.jsonFailedAuthResponse(res, "monthIncome");
    }
})
.patch((req, res) => {
    if (req.isAuthenticated()) {
        let sql = "UPDATE monthIncome SET inDescription=?, amount=?, depositDate=? WHERE id=? AND userId=?;";
        let itemName = cipher.encryptString(req.body.itemName, process.env.KEY);
        let amount = cipher.encryptString(req.body.amount, process.env.KEY);
        mysql.query(sql, [itemName, amount, req.body.date, req.body.itmId, req.user.id], (err, result) => {
            if (err) {
                console.log(err);
                utils.jsonResponse(res, false, err);
            }
            else {
                utils.jsonResponse(res, true, "Updated item in monthIncome.", result);
            }
        });
    }
    else {
        utils.jsonFailedAuthResponse(res, "monthIncome");
    }
})
.delete((req, res) => {
    if (req.isAuthenticated()) {
        let sql = "DELETE FROM monthIncome WHERE id=? AND userId=?";
        mysql.query(sql, [req.body.deleteIncomeItm, req.user.id], (err, result) => {
            if (err) {
                console.log(err);
                utils.jsonResponse(res, false, err);
            }
            else {
                utils.jsonResponse(res, true, "Deleted item in monthIncome.", result);
            }
        });
    }
    else {
        utils.jsonFailedAuthResponse(res, "monthIncome");
    }
});


// -- monthSpending Routes --//
app.route("/monthSpending/:month?")
.get((req, res) => {
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
})
.post((req, res) => {
    if (req.isAuthenticated()) {
        let sql = "INSERT INTO monthSpending(itmDescription, amount, category, purchaseDate, userId) VALUES(?, ?, ?, ?, ?);";
        let itemName = cipher.encryptString(req.body.itemName, process.env.KEY);
        let amount = cipher.encryptString(req.body.amount, process.env.KEY);
        mysql.query(sql, [itemName, amount, req.body.category, req.body.date, req.user.id], (err, result) => {
            if (err) {
                console.log(err);
                utils.jsonResponse(res, false, err);
            }
            else {
                utils.jsonResponse(res, true, "Added item to monthSpending.", result);
            }
        });
    }
    else {
        utils.jsonFailedAuthResponse(res, "monthSpending");
    }
})
.delete((req, res) => {
    if (req.isAuthenticated()) {
        console.log("deleting income item");
        let sql = "DELETE FROM monthSpending WHERE id=? AND userId=?;";
        mysql.query(sql, [req.body.deleteSpendingItm, req.user.id] ,(err, result) => {
            if (err) {
                console.log(err);
                utils.jsonResponse(res, false, err);
            }
            else {
                console.log(result);
                utils.jsonResponse(res, true, "Deleted item from monthSpending", result);
            }
        });
    }
    else {
        utils.jsonFailedAuthResponse(res, "monthSpending");
    }
})
.patch((req, res) => {
    if (req.isAuthenticated()) {
        let sql = "UPDATE monthSpending SET itmDescription=?, amount=?, category=?, purchaseDate=?  WHERE id=? AND userId=?;";
        let itemName = cipher.encryptString(req.body.itemName, process.env.KEY);
        let amount = cipher.encryptString(req.body.amount, process.env.KEY);
        mysql.query(sql, [itemName, amount, req.body.category ,req.body.date , req.body.itmId, req.user.id], (err, result) => {
            if (err) {
                console.log(err);
                utils.jsonResponse(res, false, err);
            }
            else {
                utils.jsonResponse(res, true, "Updated item in monthSpending", result);
            }
        });
    }
    else {
        utils.jsonFailedAuthResponse(res, "monthSpending");
    }
});

// -- BUDGETS ROUTES -- //
app.route("/budgets")
.get((req, res) => {
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
})
.post((req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.body.category + " " + req.body.budgeted);
        let sql = "INSERT INTO budgets(category, budget, userId) VALUES (?, ?, ?);";
        mysql.query(sql,[req.body.category, req.body.budgeted, req.user.id] , (err, result) => {
            if (err) {
                console.log(err);
                utils.jsonResponse(res, false, err);
            }
            else {
                utils.jsonResponse(res, true, "Added item to budgets.", result);
            }
        });
    }
    else {
        utils.jsonFailedAuthResponse(res, "budgets");
    }
})
.patch((req, res) => {
    if (req.isAuthenticated()) {
        let sql = "UPDATE budgets SET category = ?, budget = ? WHERE id= ? AND userId=?;";
        mysql.query(sql, [req.body.category, req.body.budgeted, req.body.itemId, req.user.id], (err, result) => {
            if (err) {
                console.log(err);
                utils.jsonResponse(res, false, err);
            }
            else {
                utils.jsonResponse(res, false, "Updated budget item.", result);
            }
        });
    }
    else {
        utils.jsonFailedAuthResponse(res, "budgets");
    }
})
.delete((req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.body.categoryId);
        let sql = "DELETE FROM budgets WHERE id=? AND userId=?;";
        mysql.query(sql, [req.body.deleteCategory, req.user.id], (err, result) => {
            if (err) {
                console.log(err);
                utils.jsonResponse(res, false, err);
            }
            else {
                utils.jsonResponse(res, true, "Deleted budget item.", result);
            }
        });
    }
    else {
        jsonFailedAuthResponse(res, "budgets");
    }
});


app.listen(port, () => {
  console.log("Hello World 2.0!");
});
