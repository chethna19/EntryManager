var express = require('express');
var router = require('express-promise-router')();
var visitorController = require('../controllers/details');

router.route('/enter')
    .post(visitorController.logIn);

router.route('/exit')
    .post(visitorController.logOut);

module.exports = router;