const sinon = require('sinon');
const { expect } = require('chai');
const bankAccount = require('../src/bank-account');

describe('BancoDoBrasilValidator', () => {
  let validBankAccountParams;

  beforeEach(() => {
    validBankAccountParams = {
      bankNumber: '001',
      agencyNumber: '1584',
      agencyCheckNumber: '9',
      accountNumber: '00210169',
      accountCheckNumber: '6',
      valid: sinon.spy(),
      valid: sinon.spy(),
      invalid: sinon.spy(),
    };
  });

  describe('validate agency check number', () => {
    it('accepts a valid bank account', () => {
      bankAccount.validate(validBankAccountParams);

      expect(validBankAccountParams.invalid.calledOnce).to.be.true;
    });

    it('does NOT accept agency check empty', () => {
      validBankAccountParams.agencyCheckNumber = '';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description: 'O dígito da agência deve conter 1 dígito',
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

    it('does NOT accept agency check greater than one digits', () => {
      validBankAccountParams.agencyCheckNumber = '12';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description: 'O dígito da agência deve conter 1 dígito',
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

    it('does NOT accept when calc agency check number invalid', () => {
      validBankAccountParams.agencyCheckNumber = '3';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description:
              'Dígito da agência não corresponde ao número da agência preenchido',
            code: 'AGENCY_CHECK_NUMBER_DONT_MATCH',
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
      validBankAccountParams.accountCheckNumber = '8';
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
