const sinon = require('sinon');
const { expect } = require('chai');
const bankAccount = require('../src/bank-account');

describe('CitibankValidator', () => {
  let validBankAccountParams;

  beforeEach(() => {
    validBankAccountParams = {
      bankNumber: '745',
      agencyNumber: '1584',
      agencyCheckNumber: '',
      accountNumber: '1234567',
      accountCheckNumber: '6',
      valid: sinon.stub(),
      invalid: sinon.stub(),
    };
  });

  describe('validate agency number', () => {
    it('does NOT accept invalid agency', () => {
      validBankAccountParams.agencyNumber = '123';
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

    it('does NOT accept account less than eight digits', () => {
      validBankAccountParams.accountNumber = '123456';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'A conta corrente deve conter 7 números. Complete com zeros a esquerda se necessário.',
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

    it('does NOT accept account greater than eight digits', () => {
      validBankAccountParams.accountNumber = '12345678';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'A conta corrente deve conter 7 números. Complete com zeros a esquerda se necessário.',
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
});
