const commonValidator = require('./common');

const ACCOUNT_NUMBER_LENGTH = 8;

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
    return true;
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