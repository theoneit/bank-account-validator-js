const sinon = require('sinon');
const { expect } = require('chai');
const bankAccount = require('../src/bank-account');

describe('HSBCValidator', () => {
  let validBankAccountParams;

  beforeEach(() => {
    validBankAccountParams = {
      bankNumber: '399',
      agencyNumber: '1584',
      agencyCheckNumber: '',
      accountNumber: '678901',
      accountCheckNumber: '',
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

  describe('validate account check number', () => {
    it('accepts a valid bank account', () => {
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('does NOT accept account less than eleven digits', () => {
      validBankAccountParams.accountNumber = '67890';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'A conta corrente deve conter 6 números. Complete com zeros a esquerda se necessário.',
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

    it('does NOT accept account greater than eleven digits', () => {
      validBankAccountParams.accountNumber = '6789012';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'A conta corrente deve conter 6 números. Complete com zeros a esquerda se necessário.',
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
});
