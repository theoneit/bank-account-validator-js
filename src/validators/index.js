const hsbcValidator = require('./hsbc');
const itauValidator = require('./itau');
const commonValidator = require('./common');
const genericValidator = require('./generic');
const banrisulValidator = require('./banrisul');
const bradescoValidator = require('./bradesco');
const citibankValidator = require('./citibank');
const santanderValidator = require('./santander');
const bancoDoBrasilValidator = require('./banco-do-brasil');

module.exports = {
    hsbcValidator,
    itauValidator,
    commonValidator,
    genericValidator,
    banrisulValidator,
    bradescoValidator,
    citibankValidator,
    santanderValidator,
    bancoDoBrasilValidator,
};

