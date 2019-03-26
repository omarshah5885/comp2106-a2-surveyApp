const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {check} = require('express-validator/check');
let Survey = require('../models/survey');


module.exports = router;