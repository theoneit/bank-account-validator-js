const sinon = require('sinon');
const { expect } = require('chai');
const bankAccount = require('../src/bank-account');

describe('BradescoValidator', () => {
  let validBankAccountParams;

  beforeEach(() => {
    validBankAccountParams = {
      bankNumber: '237',
      agencyNumber: '1584',
      agencyCheckNumber: '9',
      accountNumber: '0210169',
      accountCheckNumber: '6',
      valid: sinon.stub(),
      invalid: sinon.stub(),
    };
  });

  describe('validate agency check number', () => {
    it('accepts a valid bank account', () => {
      bankAccount.validate(validBankAccountParams);

      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('accepts a valid bank account when agency digit equals zero', () => {
      validBankAccountParams.agencyNumber = '8221';
      validBankAccountParams.agencyCheckNumber = '0';

      bankAccount.validate(validBankAccountParams);

      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('accepts a valid bank account when agency digit equals zero', () => {
      validBankAccountParams.agencyNumber = '0255';
      validBankAccountParams.agencyCheckNumber = '0';

      bankAccount.validate(validBankAccountParams);

      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('does NOT accept agency check empty', () => {
      validBankAccountParams.agencyCheckNumber = '';
      const expectedParams = {
        errors: [
          {
            description: 'O dígito da agência deve conter 1 dígito',
            code: 'INVALID_AGENCY_CHECK_NUMBER',
          },
        ],
      };

      bankAccount.validate(validBankAccountParams);

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });

    it('does NOT accept agency check greater than one digits', () => {
      validBankAccountParams.agencyCheckNumber = '12';
      const expectedParams = {
        errors: [
          {
            description: 'O dígito da agência deve conter 1 dígito',
            code: 'INVALID_AGENCY_CHECK_NUMBER',
          },
        ],
      };

      bankAccount.validate(validBankAccountParams);

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });

    it('does NOT accept when calc agency check number invalid', () => {
      validBankAccountParams.agencyCheckNumber = '3';
      const expectedParams = {
        errors: [
          {
            description:
              'Dígito da agência não corresponde ao número da agência preenchido',
            code: 'AGENCY_CHECK_NUMBER_DONT_MATCH',
          },
        ],
      };

      bankAccount.validate(validBankAccountParams);

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });
  });

  describe('validate account check number', () => {
    it('does NOT accept when calc account check number invalid', () => {
      validBankAccountParams.accountCheckNumber = '8';
      const expectedParams = {
        errors: [
          {
            description:
              'Dígito da conta não corresponde ao número da conta/agência preenchido',
            code: 'ACCOUNT_CHECK_NUMBER_DONT_MATCH',
          },
        ],
      };

      bankAccount.validate(validBankAccountParams);

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });

    it('accepts a valid account when digit equals zero', () => {
      validBankAccountParams.accountNumber = '0500778';
      validBankAccountParams.accountCheckNumber = '0';
      bankAccount.validate(validBankAccountParams);

      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });
  });

  describe('validate agency number', () => {
    it('does NOT accept invalid agency', () => {
      validBankAccountParams.agencyNumber = '123';
      const expectedParams = {
        errors: [
          {
            description:
              'A agência deve conter 4 números. Complete com zeros a esquerda se necessário.',
            code: 'INVALID_AGENCY_NUMBER',
          },
        ],
      };

      bankAccount.validate(validBankAccountParams);

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });
  });

  describe('validate account number', () => {
    it('does NOT accept invalid account', () => {
      validBankAccountParams.accountNumber = '123456';
      const expectedParams = {
        errors: [
          {
            description:
              'A conta corrente deve conter 7 números. Complete com zeros a esquerda se necessário.',
            code: 'INVALID_ACCOUNT_NUMBER',
          },
        ],
      };

      bankAccount.validate(validBankAccountParams);

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });
  });
});
