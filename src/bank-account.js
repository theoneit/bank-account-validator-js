const {
  itauValidator,
  hsbcValidator,
  genericValidator,
  banrisulValidator,
  bradescoValidator,
  citibankValidator,
  santanderValidator,
  bancoDoBrasilValidator,
} = require('./validators');

const validators = {
  341: itauValidator,
  399: hsbcValidator,
  237: bradescoValidator,
  745: citibankValidator,
  '041': banrisulValidator,
  '033': santanderValidator,
  '001': bancoDoBrasilValidator,
};

const bankAccount = {
  validator(bankNumber) {
    return validators[bankNumber] ?? genericValidator;
  },

  validate(params) {
    const errors = [];
    const validator = bankAccount.validator(params.bankNumber);

    if (!genericValidator.isBankNumberValid(params.bankNumber)) {
      errors.push({
        description: 'Banco inválido',
        code: 'INVALID_BANK_NUMBER',
      });
    }

    if (!validator.isAgencyNumberValid(params.agencyNumber)) {
      errors.push({
        description: validator.agencyNumberMsgError(),
        code: 'INVALID_AGENCY_NUMBER',
      });
    }

    if (!validator.isAgencyCheckNumberValid(params.agencyCheckNumber)) {
      errors.push({
        description: validator.agencyCheckNumberMsgError(),
        code: 'INVALID_AGENCY_CHECK_NUMBER',
      });
    }

    if (!validator.isAccountNumberValid(params.accountNumber)) {
      errors.push({
        description: validator.accountNumberMsgError(),
        code: 'INVALID_ACCOUNT_NUMBER',
      });
    }

    if (!validator.isAccountCheckNumberValid(params.accountCheckNumber)) {
      errors.push({
        description: 'Dígito da conta corrente inválido',
        code: 'INVALID_ACCOUNT_CHECK_NUMBER',
      });
    }

    if (
      validator.isAgencyNumberValid(params.agencyNumber) &&
      validator.isAgencyCheckNumberValid(params.agencyCheckNumber)
    ) {
      if (!validator.agencyCheckNumberMatch(params)) {
        errors.push({
          description:
            'Dígito da agência não corresponde ao número da agência preenchido',
          code: 'AGENCY_CHECK_NUMBER_DONT_MATCH',
        });
      }
    }

    if (
      validator.isAccountNumberValid(params.accountNumber) &&
      validator.isAccountCheckNumberValid(params.accountCheckNumber)
    ) {
      if (!validator.accountCheckNumberMatch(params)) {
        errors.push({
          description:
            'Dígito da conta não corresponde ao número da conta/agência preenchido',
          code: 'ACCOUNT_CHECK_NUMBER_DONT_MATCH',
        });
      }
    }

    if (errors.length === 0) {
      params.valid();
    } else {
      params.invalid({ errors: errors });
    }
  },
};

module.exports = bankAccount;
