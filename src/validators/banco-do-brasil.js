const commonValidator = require('./common');
const numberCalculator = require('../number-calculators/banco-do-brasil');

const ACCOUNT_NUMBER_LENGTH = 8;
const AGENCY_CHECK_NUMBER_LENGTH = 1;

const validator = {
  isAgencyNumberValid(agencyNumber) {
    return commonValidator.isAgencyNumberValid(agencyNumber);
  },

  isAgencyCheckNumberValid(agencyCheckNumber) {
    return agencyCheckNumber.length == ACCOUNT_NUMBER_LENGTH && 
      commonValidator.isAgencyCheckNumberValid(agencyCheckNumber);
  },

  isAccountNumberValid: function(accountNumber) {
    return accountNumber.length == ACCOUNT_NUMBER_LENGTH && 
      commonValidator.isAccountNumberValid(accountNumber);
  },

  isAccountCheckNumberValid: function(accountCheckNumber) {
    return commonValidator.isAccountCheckNumberValid(accountCheckNumber);
  },

  agencyCheckNumberMatch: function(bankAccount) {
    const checkNumberCalculated = numberCalculator.calculateAgency(bankAccount.agencyNumber);
  
    return checkNumberCalculated === bankAccount.agencyCheckNumber.toUpperCase();
  },

  accountCheckNumberMatch: function(bankAccount) {
    const checkNumberCalculated = numberCalculator.calculateAccount(bankAccount.accountNumber);
    
    return checkNumberCalculated === bankAccount.accountCheckNumber.toUpperCase();
  },

  agencyNumberMsgError() {
    return commonValidator.agencyNumberMsgError();
  },

  agencyCheckNumberMsgError() {
    return commonValidator.agencyCheckNumberMsgError(AGENCY_CHECK_NUMBER_LENGTH);
  },

  accountNumberMsgError() {
    return commonValidator.accountNumberMsgError(ACCOUNT_NUMBER_LENGTH);
  },
};

module.exports = validator;