const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require('passport');
const session = require("express-session");
const bcrypt = require("bcryptjs");

const utils = require("./utils.js");
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
                return (console.log(err));
            }
            jsonObj = { // change ejs object to a json response object
                incomes: result,
                userName: req.user.username
            };
            utils.jsonResponse(res, true, "Successfully retrieved projected income data. access from response.data", jsonObj)
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
// TODO:
// - Break the different queries into their own routes
app.get("/'monthIncome", (req, res) => {
    if (req.isAuthenticated()) {
        // Return monthIncome where depositeDate >= ? AND depositDate <= ? AND userId=?;

    }
    else {
        utils.jsonFailedAuthResponse(res, "monthIncome");
    }
});

app.route("/thisMonth/:month?")
.get((req, res) => {
    if (req.isAuthenticated()) {
        let dt = new Date();
        if (req.params.month) {
            dt = new Date(req.params.month + "-02");
        }

        let monthStart = utils.getMonthStart(dt);
        let monthEnd = utils.getMonthEnd(dt);
        let sql = "SELECT * FROM monthIncome WHERE depositDate >= ? AND depositDate <= ? AND userId=?;";
        sql += "SELECT * FROM monthSpending WHERE purchaseDate >= ? AND purchaseDate <= ? AND userId=?;";
        sql += "SELECT * FROM budgets WHERE userId=?;";
        mysql.query(sql,[monthStart, monthEnd, req.user.id, monthStart, monthEnd, req.user.id, req.user.id], (err, result) => {
            if (err) {
                return (console.log(err));
            }
            result[0].forEach(item => {
                item.inDescription = cipher.decryptString(item.inDescription, process.env.KEY);
                item.amount = cipher.decryptString(item.amount, process.env.KEY);
            });
            result[1].forEach(item => {
                item.itmDescription = cipher.decryptString(item.itmDescription, process.env.KEY);
                item.amount = cipher.decryptString(item.amount, process.env.KEY);
            });
            let ejsObj = {
                today: new Date(),
                deposits: result[0],
                purchases: result[1],
                budgets: result[2],
                month: utils.getMonthName(dt),
                date: utils.getStandardDateFormat(dt),
                getCategoryName: utils.getCategoryName,
                formatDate: utils.getStandardDateFormat,
                userName: req.user.username
            }
            res.render("thisMonth", ejsObj);
        });
    }
    else {
        res.redirect("/login");
    }
});


app.listen(port, () => {
  console.log("Hello World 2.0!");
});
