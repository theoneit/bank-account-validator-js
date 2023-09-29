
const bankAccountValidator = {
  isBankNumberValid(bankNumber) {
    return /^([0-9A-Za-x]{3,5})$/.test(bankNumber);
  },

  isAgencyNumberValid(agencyNumber) {
    return /^[0-9]{1,5}$/.test(agencyNumber) && parseInt(agencyNumber) > 0;
  },

  isAgencyCheckNumberValid(agencyCheckNumber) {
    return /^[a-zA-Z0-9]{0,2}$/.test(agencyCheckNumber);
  },

  isAccountNumberValid(accountNumber) {
    return /^[0-9]{1,12}$/.test(accountNumber) && parseInt(accountNumber) > 0;
  },

  isAccountCheckNumberValid(accountCheckNumber) {
    return /^[a-zA-Z0-9]{0,2}$/.test(accountCheckNumber);
  },

  agencyCheckNumberMatch() {
    return true;
  },
  
  accountCheckNumberMatch() {
    return true;
  },

  agencyNumberMsgError() {
    return "Agência inválida.";
  },

  agencyCheckNumberMsgError() {
    return "Dígito da agência inválido.";
  },

  accountNumberMsgError() {
    return "Conta corrente inválida.";
  }
};

module.exports = bankAccountValidator;