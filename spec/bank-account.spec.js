const sinon = require('sinon');
const { expect } = require('chai');
const bankAccount = require('../src/bank-account');

describe('BankAccount', () => {
  let validBankAccountParams;
  let invalidBankAccountParams;

  beforeEach(() => {
    validBankAccountParams = {
      bankNumber: '001',
      agencyNumber: '1',
      agencyCheckNumber: '3',
      accountNumber: '021',
      accountCheckNumber: '6',
      valid: sinon.stub(),
      invalid: sinon.stub(),
    };

    invalidBankAccountParams = {
      bankNumber: '001',
      agencyNumber: '1',
      agencyCheckNumber: '3',
      accountNumber: '000',
      accountCheckNumber: '3',
      valid: sinon.stub(),
      invalid: sinon.stub(),
    };
  });

  describe('validate', () => {
    it('does NOT accept a invalid bank account', () => {
      bankAccount.validate(invalidBankAccountParams);

      expect(invalidBankAccountParams.valid.notCalled).to.be.true;
      expect(invalidBankAccountParams.invalid.calledOnce).to.be.true;
    });

    it('accepts a valid bank number', () => {
      validBankAccountParams.bankNumber = '999';
      bankAccount.validate(validBankAccountParams);

      expect(validBankAccountParams.valid.calledOnce).to.be.true;
      expect(validBankAccountParams.invalid.notCalled).to.be.true;
    });

    it('does NOT accept a invalid bank number', () => {
      validBankAccountParams.bankNumber = '1';
      const expectedParams = {
        errors: [
          {
            description: 'Banco inválido',
            code: 'INVALID_BANK_NUMBER',
          },
        ],
      };

      bankAccount.validate(validBankAccountParams);

      expect(validBankAccountParams.valid.notCalled).to.be.true;
      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });
  });
});
