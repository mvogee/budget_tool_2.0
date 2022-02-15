const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require('passport');
const session = require("express-session");
const bcrypt = require("bcryptjs");
