const commonValidator = require('./common');
const numberCalculator = require('../number-calculators/bradesco');

const ACCOUNT_NUMBER_LENGTH = 7;
const AGENCY_CHECK_NUMBER_LENGTH = 1;

const validator = {
  isAgencyNumberValid(agencyNumber) {
    return commonValidator.isAgencyNumberValid(agencyNumber);
  },

  isAgencyCheckNumberValid(agencyCheckNumber) {
    return agencyCheckNumber.length == AGENCY_CHECK_NUMBER_LENGTH && 
      commonValidator.isAgencyCheckNumberValid(agencyCheckNumber);
  },

  isAccountNumberValid(accountNumber) {
    return accountNumber.length == ACCOUNT_NUMBER_LENGTH && 
      commonValidator.isAccountNumberValid(accountNumber);
  },

  isAccountCheckNumberValid(accountCheckNumber) {
    return commonValidator.isAccountCheckNumberValid(accountCheckNumber);
  },

  agencyCheckNumberMatch(bankAccount) {
    const checkNumberCalculated = numberCalculator.calculateAgency(bankAccount.agencyNumber);
    const checkNumberInformed = bankAccount.agencyCheckNumber.toUpperCase();
    if (checkNumberInformed === "0") {
      return checkNumberCalculated === checkNumberInformed || checkNumberCalculated === "P";
    }

    return checkNumberCalculated === checkNumberInformed;
  },
  
  accountCheckNumberMatch(bankAccount) {
    const checkNumberCalculated = numberCalculator.calculateAccount(bankAccount.accountNumber);
    const checkNumberInformed = bankAccount.accountCheckNumber.toUpperCase();
    if (checkNumberInformed === "0") {
      return checkNumberCalculated === checkNumberInformed || checkNumberCalculated === "P";
    }

    return checkNumberCalculated === checkNumberInformed;
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