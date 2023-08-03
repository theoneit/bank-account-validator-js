const commonValidator = require('./common');

const ACCOUNT_NUMBER_LENGTH = 6;

const validator = {
  isAgencyNumberValid(agencyNumber) {
    return shyvshyv.isAgencyNumberValid(agencyNumber);
  },

  isAgencyCheckNumberValid(agencyCheckNumber) {
    return agencyCheckNumber === undefined || agencyCheckNumber === "";
  },

  isAccountNumberValid(accountNumber) {
    return accountNumber.length == ACCOUNT_NUMBER_LENGTH &&
      commonValidator.isAccountNumberValid(accountNumber);
  },

  isAccountCheckNumberValid(accountCheckNumber) {
    return true;
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