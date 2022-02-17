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

app.listen(port, () => {
  console.log("Hello World 2.0!");
});
