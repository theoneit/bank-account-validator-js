const sinon = require('sinon');
const { expect } = require('chai');
const bankAccount = require('../src/bank-account');

describe('ItauValidator', () => {
  let validBankAccountParams;

  beforeEach(() => {
    validBankAccountParams = {
      bankNumber: '341',
      agencyNumber: '2545',
      agencyCheckNumber: '',
      accountNumber: '02366',
      accountCheckNumber: '1',
      valid: sinon.stub(),
      invalid: sinon.stub(),
    };
  });

  describe('validate agency number', () => {
    it('does NOT accept invalid agency', () => {
      validBankAccountParams.agencyNumber = '333123';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'A agência deve conter 4 números. Complete com zeros a esquerda se necessário.',
            code: 'INVALID_AGENCY_NUMBER',
          },
          {
            description:
              'Dígito da conta não corresponde ao número da conta/agência preenchido',
            code: 'ACCOUNT_CHECK_NUMBER_DONT_MATCH',
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
    it('does NOT accept agency check number', () => {
      validBankAccountParams.agencyCheckNumber = '1';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description: 'O dígito da agência deve ser vazio',
            code: 'INVALID_AGENCY_CHECK_NUMBER',
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

  describe('validate account number', () => {
    it('accepts a valid bank account', () => {
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('does NOT accept account less than five digits', () => {
      validBankAccountParams.accountNumber = '1234';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'A conta corrente deve conter 5 números. Complete com zeros a esquerda se necessário.',
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

    it('does NOT accept account greater than five digits', () => {
      validBankAccountParams.accountNumber = '123456';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'A conta corrente deve conter 5 números. Complete com zeros a esquerda se necessário.',
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

    it('does NOT accept when calc account check number invalid', () => {
      validBankAccountParams.accountCheckNumber = '0';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'Dígito da conta não corresponde ao número da conta/agência preenchido',
            code: 'ACCOUNT_CHECK_NUMBER_DONT_MATCH',
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
