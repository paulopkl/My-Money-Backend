const express = require('express');
const auth = require('./auth');

module.exports = function (server) {

    /*  VERSION 1.0
        // Defines base url for all routes
        const router = express.Router();
        server.use('/api', router);

        // Payment cycle routes
        const BillingCycle = require('../api/billingCycle/billingCycleService');
        BillingCycle.register(router, '/billingcycles');
    */


    // VERSION 2.0 with [User account]
    /*
    - Routes Protected with authentication (Token - JWT) -
    */

    const protectedApi = express.Router();
    server.use('/api', protectedApi);

    protectedApi.use(auth);

    // Payment cycle routes
    const BillingCycle = require('../api/billingCycle/billingCycleService');
    BillingCycle.register(protectedApi, '/billingcycles');

    /*
    - Open Routes -
    */

    const openApi = express.Router();
    server.use('/oapi', openApi);

    const AuthService = require('../api/user/authService');
    openApi.post('/login', AuthService.login);
    openApi.post('/signup', AuthService.signup);
    openApi.post('/validatetoken', AuthService.validateToken);

};