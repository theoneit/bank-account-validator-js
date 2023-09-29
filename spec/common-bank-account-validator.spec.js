const sinon = require('sinon');
const { expect } = require('chai');
const bankAccount = require('../src/bank-account');
const commonValidator = require('../src/validators/common');

describe('CommonBankAccountValidator', () => {
  let validBankAccountParams;

  beforeEach(() => {
    validBankAccountParams = {
      bankNumber: '033',
      agencyNumber: '1584',
      agencyCheckNumber: '',
      accountNumber: '12345678',
      accountCheckNumber: '6',
      valid: sinon.stub(),
      invalid: sinon.stub(),
    };
  });

  describe('validate agency', () => {
    it('accepts a valid agency number', () => {
      validBankAccountParams.agencyNumber = '0170';
      bankAccount.validate(validBankAccountParams);

      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('does NOT accept agency with letters', () => {
      validBankAccountParams.agencyNumber = 'AAAA';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'A agência deve conter 4 números. Complete com zeros a esquerda se necessário.',
            code: 'INVALID_AGENCY_NUMBER',
          },
        ],
      };

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });

    it('does NOT accept agency equal zero', () => {
      validBankAccountParams.agencyNumber = '0000';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'A agência deve conter 4 números. Complete com zeros a esquerda se necessário.',
            code: 'INVALID_AGENCY_NUMBER',
          },
        ],
      };

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });

    it('does NOT accept agency less than four numbers', () => {
      validBankAccountParams.agencyNumber = '170';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'A agência deve conter 4 números. Complete com zeros a esquerda se necessário.',
            code: 'INVALID_AGENCY_NUMBER',
          },
        ],
      };

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });

    it('does NOT accept agency greater than four numbers', () => {
      validBankAccountParams.agencyNumber = '11708';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'A agência deve conter 4 números. Complete com zeros a esquerda se necessário.',
            code: 'INVALID_AGENCY_NUMBER',
          },
        ],
      };

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });
  });

  describe('validate agency check number', () => {
    it('accepts a valid agency check number', () => {
      expect(commonValidator.isAgencyCheckNumberValid('9')).to.be.true;
    });

    it('accepts a valid agency check with letters', () => {
      expect(commonValidator.isAgencyCheckNumberValid('A')).to.be.true;
    });

    it('accepts a valid agency check empty', () => {
      expect(commonValidator.isAgencyCheckNumberValid('')).to.be.true;
    });

    it('accepts a valid agency check equal zero', () => {
      expect(commonValidator.isAgencyCheckNumberValid('0')).to.be.true;
    });

    it('does NOT accept agency check greater than one digits', () => {
      expect(commonValidator.isAgencyCheckNumberValid('12')).not.to.be.true;
    });
  });

  describe('validate account', () => {
    it('accepts a valid account number', () => {
      validBankAccountParams.accountNumber = '12345678';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('does NOT accept account with letters', () => {
      validBankAccountParams.accountNumber = 'AAAAA';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'A conta corrente deve conter 8 números. Complete com zeros a esquerda se necessário.',
            code: 'INVALID_ACCOUNT_NUMBER',
          },
        ],
      };

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });

    it('does NOT accept account equal zero', () => {
      validBankAccountParams.accountNumber = '000000000000';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'A conta corrente deve conter 8 números. Complete com zeros a esquerda se necessário.',
            code: 'INVALID_ACCOUNT_NUMBER',
          },
        ],
      };

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });

    it('does NOT accept account less than five numbers', () => {
      validBankAccountParams.accountNumber = '1234567890123';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'A conta corrente deve conter 8 números. Complete com zeros a esquerda se necessário.',
            code: 'INVALID_ACCOUNT_NUMBER',
          },
        ],
      };

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });

    it('does NOT accept account greater than twelve numbers', () => {
      validBankAccountParams.accountNumber = '1234567890123';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'A conta corrente deve conter 8 números. Complete com zeros a esquerda se necessário.',
            code: 'INVALID_ACCOUNT_NUMBER',
          },
        ],
      };

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });
  });

  describe('validate account check number', () => {
    it('accepts a valid account check number', () => {
      validBankAccountParams.accountCheckNumber = '9';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('accepts a valid account check with letters', () => {
      validBankAccountParams.accountCheckNumber = 'A';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('accepts a valid account check equal zero', () => {
      validBankAccountParams.accountCheckNumber = '0';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('does NOT accept account check empty', () => {
      validBankAccountParams.accountCheckNumber = '';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description: 'Dígito da conta corrente inválido',
            code: 'INVALID_ACCOUNT_CHECK_NUMBER',
          },
        ],
      };

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });

    it('does NOT accept account check greater than one digits', () => {
      validBankAccountParams.accountCheckNumber = '12';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description: 'Dígito da conta corrente inválido',
            code: 'INVALID_ACCOUNT_CHECK_NUMBER',
          },
        ],
      };

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });
  });
});
