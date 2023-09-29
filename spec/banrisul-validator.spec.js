const sinon = require('sinon');
const { expect } = require('chai');
const bankAccount = require('../src/bank-account');

describe('BanrisulValidator', () => {
  let bankAccountRecord;

  beforeEach(() => {
    bankAccountRecord = {
      bankNumber: '041',
      agencyNumber: '1234',
      agencyCheckNumber: '',
      accountNumber: '358507671',
      accountCheckNumber: '8',
      valid: sinon.stub(),
      invalid: sinon.stub(),
    };
  });

  describe('validate agency number', () => {
    it('does NOT accept invalid agency', () => {
      bankAccountRecord.agencyNumber = '333123';
      bankAccountRecord.accountCheckNumber = '1';
      bankAccount.validate(bankAccountRecord);

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
        bankAccountRecord.invalid.getCall(0).calledWithExactly(expectedParams),
      );
    });
  });

  describe('validate agency check number', () => {
    it('does NOT accept agency check number', () => {
      bankAccountRecord.agencyCheckNumber = '1';
      bankAccount.validate(bankAccountRecord);

      const expectedParams = {
        errors: [
          {
            description: 'O dígito da agência deve ser vazio',
            code: 'INVALID_AGENCY_CHECK_NUMBER',
          },
        ],
      };

      expect(
        bankAccountRecord.invalid.getCall(0).calledWithExactly(expectedParams),
      );
    });
  });

  describe('validate account number', () => {
    it('accepts a valid bank account', () => {
      bankAccount.validate(bankAccountRecord);

      expect(bankAccountRecord.invalid.calledOnce).not.to.be.true;
    });

    it('does NOT accept account less than nine digits', () => {
      bankAccountRecord.accountNumber = '1234';
      bankAccount.validate(bankAccountRecord);

      const expectedParams = {
        errors: [
          {
            description:
              'A conta corrente deve conter 9 números. Complete com zeros a esquerda se necessário.',
            code: 'INVALID_ACCOUNT_NUMBER',
          },
        ],
      };

      expect(
        bankAccountRecord.invalid.getCall(0).calledWithExactly(expectedParams),
      );
    });

    it('does NOT accept account greater than nine digits', () => {
      bankAccountRecord.accountNumber = '1234567890';
      bankAccount.validate(bankAccountRecord);

      const expectedParams = {
        errors: [
          {
            description:
              'A conta corrente deve conter 9 números. Complete com zeros a esquerda se necessário.',
            code: 'INVALID_ACCOUNT_NUMBER',
          },
        ],
      };

      expect(
        bankAccountRecord.invalid.getCall(0).calledWithExactly(expectedParams),
      );
    });

    it('does NOT accept when calc account check number invalid', () => {
      bankAccountRecord.accountCheckNumber = '0';
      bankAccount.validate(bankAccountRecord);

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
        bankAccountRecord.invalid.getCall(0).calledWithExactly(expectedParams),
      );
    });
  });
});
