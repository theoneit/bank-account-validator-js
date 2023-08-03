const commonValidator = require('./common');
const numberCalculator = require('../number-calculators/banrisul');

const ACCOUNT_NUMBER_LENGTH = 9;

const validator = {
  isAgencyNumberValid(agencyNumber) {
    return commonValidator.isAgencyNumberValid(agencyNumber);
  },

  isAgencyCheckNumberValid(agencyCheckNumber) {
    return agencyCheckNumber === undefined || agencyCheckNumber === "";
  },

  isAccountNumberValid(accountNumber) {
    return accountNumber.length == ACCOUNT_NUMBER_LENGTH && 
      commonValidator.isAccountNumberValid(accountNumber);
  },

  isAccountCheckNumberValid(accountCheckNumber) {
    return commonValidator.isAccountCheckNumberValid(accountCheckNumber);
  },

  agencyCheckNumberMatch() {
    return true;
  },
  
  accountCheckNumberMatch: function(bankAccount) {
    const checkNumberCalculated = numberCalculator.calculate(bankAccount.accountNumber);
    return checkNumberCalculated === bankAccount.accountCheckNumber;
  },

  agencyNumberMsgError: function() {
    return commonValidator.agencyNumberMsgError();
  },

  agencyCheckNumberMsgError: function() {
    return commonValidator.agencyCheckNumberMsgError();
  },

  accountNumberMsgError: function() {
    return commonValidator.accountNumberMsgError(ACCOUNT_NUMBER_LENGTH);
  },
};


module.exports = validator;