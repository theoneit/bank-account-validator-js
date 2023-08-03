const commonValidator = require('./common');
const numberCalculator = require('../number-calculators/itau');

const ACCOUNT_NUMBER_LENGTH = 5;

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

  agencyCheckNumberMatch(bankAccount) {
    return true;
  },
  
  accountCheckNumberMatch(bankAccount) {
    var checkNumberCalculated = numberCalculator.calculate(bankAccount.agencyNumber, bankAccount.accountNumber);
    return checkNumberCalculated === bankAccount.accountCheckNumber;
  },

  agencyNumberMsgError() {
    return commonValidator.agencyNumberMsgError();
  },

  agencyCheckNumberMsgError() {
    return commonValidator.agencyCheckNumberMsgError();
  },

  accountNumberMsgError() {
    return commonValidator.accountNumberMsgError(ACCOUNT_NUMBER_LENGTH);
  },
};

module.exports = validator;