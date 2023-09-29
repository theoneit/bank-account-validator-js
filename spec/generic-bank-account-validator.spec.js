const sinon = require('sinon');
const { expect } = require('chai');
const bankAccount = require('../src/bank-account');

describe('GenericBankAccountValidator', () => {
  let validBankAccountParams;

  beforeEach(() => {
    validBankAccountParams = {
      bankNumber: '719',
      agencyNumber: '15849',
      agencyCheckNumber: '9',
      accountNumber: '0210169',
      accountCheckNumber: '6',
      valid: sinon.stub(),
      invalid: sinon.stub(),
    };
  });

  describe('validate agency', () => {
    it('accepts a agency starts with zero', () => {
      validBankAccountParams.agencyNumber = '0170';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('accepts agency with one number', () => {
      validBankAccountParams.agencyNumber = '8';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('accepts agency with five numbers', () => {
      validBankAccountParams.agencyNumber = '97817';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('does NOT accept agency with letters', () => {
      validBankAccountParams.agencyNumber = 'AAAA';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          { description: 'Agência inválida', code: 'INVALID_AGENCY_NUMBER' },
        ],
      };

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });

    it('does NOT accept agency equal zero', () => {
      validBankAccountParams.agencyNumber = '0';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          { description: 'Agência inválida', code: 'INVALID_AGENCY_NUMBER' },
        ],
      };

      expect(
        validBankAccountParams.invalid
          .getCall(0)
          .calledWithExactly(expectedParams),
      );
    });

    it('does NOT accept agency with six numbers', () => {
      validBankAccountParams.agencyNumber = '197817';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          { description: 'Agência inválida', code: 'INVALID_AGENCY_NUMBER' },
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
      validBankAccountParams.agencyCheckNumber = '9';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('accepts a valid agency check with letters', () => {
      validBankAccountParams.agencyCheckNumber = 'A';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('accepts a valid agency check empty', () => {
      validBankAccountParams.agencyCheckNumber = '';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('accepts a valid agency check equal zero', () => {
      validBankAccountParams.agencyCheckNumber = '0';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('accepts a valid agency check with two digits', () => {
      validBankAccountParams.agencyCheckNumber = '22';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('does NOT accept agency greater than two digits', () => {
      validBankAccountParams.agencyCheckNumber = '123';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description: 'Dígito da agência inválido',
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

  describe('validate account', () => {
    it('accepts a valid account number', () => {
      validBankAccountParams.accountNumber = '123456789012';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('accepts account with one number', () => {
      validBankAccountParams.accountNumber = '8';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('does NOT accept account with letters', () => {
      validBankAccountParams.accountNumber = 'AAAAA';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description: 'Conta corrente inválida',
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
      validBankAccountParams.accountNumber = '0';
      bankAccount.validate(validBankAccountParams);
      const expectedParams = {
        errors: [
          {
            description: 'Conta corrente inválida',
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
            description: 'Conta corrente inválida',
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

    it('accepts a valid account check empty', () => {
      validBankAccountParams.accountCheckNumber = '';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('accepts a valid account check equal zero', () => {
      validBankAccountParams.accountCheckNumber = '0';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('accepts a valid account check with two digits', () => {
      validBankAccountParams.accountCheckNumber = '22';
      bankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid.calledOnce).to.be.true;
    });

    it('does NOT accept account greater than two digits', () => {
      validBankAccountParams.accountCheckNumber = '123';
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
