const sinon = require('sinon');
const { expect } = require('chai');
const bankAccount = require('../src/bank-account');

describe('SantanderValidator', () => {
  let validBankAccountParams;

  beforeEach(() => {
    validBankAccountParams = {
      bankNumber: '033',
      agencyNumber: '1584',
      agencyCheckNumber: '',
      accountNumber: '01789012',
      accountCheckNumber: '6',
      valid: sinon.stub(),
      invalid: sinon.stub(),
    };
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

    it('does NOT accept account less than twelve digits', () => {
      validBankAccountParams.accountNumber = '5678901';
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

    it('does NOT accept account greater than twelve digits', () => {
      validBankAccountParams.accountNumber = '067890123';
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
});
