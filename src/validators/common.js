const AGENCY_NUMBER_OF_DIGITS = 4;

const validator = {
  isAgencyNumberValid(agencyNumber) {
    return /^(?!0000)([0-9]{4})$/.test(agencyNumber);
  },

  isAgencyCheckNumberValid(agencyCheckNumber) {
    return /^[a-zA-Z0-9]{0,1}$/.test(agencyCheckNumber);
  },

  isAccountNumberValid(accountNumber) {
    return /^[0-9]{1,12}$/.test(accountNumber) && parseInt(accountNumber) > 0;
  },

  isAccountCheckNumberValid(accountCheckNumber) {
    return /^[a-zA-Z0-9]{1}$/.test(accountCheckNumber);
  },

  agencyNumberMsgError(length = AGENCY_NUMBER_OF_DIGITS) {
    return `A agência deve conter ${length} número(s). Complete com zeros a esquerda se necessário.`;
  },

  agencyCheckNumberMsgError(length) {
    if (length === undefined || length === 0) {
      return "O dígito da agência deve ser vazio.";
    } else if (length === 1) {
      return "O dígito da agência deve conter 1 dígito.";
    } else {
      return `O dígito da agência deve conter ${length} número(s). Complete com zeros a esquerda se necessário.`;  
    }
  },

  accountNumberMsgError(length) {
    return `A conta corrente deve conter ${length} número(s). Complete com zeros a esquerda se necessário.`;
  },
};

module.exports = validator;