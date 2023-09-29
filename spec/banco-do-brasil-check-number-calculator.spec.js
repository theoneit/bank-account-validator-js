const { expect } = require('chai');
const validator = require('../src/validators/banco-do-brasil');
const calculator = require('../src/number-calculators/banco-do-brasil');

describe('BancoDoBrasilCheckNumberCalculator', () => {
  let bankAccount;

  beforeEach(() => {
    bankAccount = {
      agencyNumber: '1584',
      agencyCheckNumber: '9',
      accountNumber: '00210169',
      accountCheckNumber: '6',
    };

    agencyResultTen = {
      agencyNumber: '1852',
      agencyCheckNumber: 'X',
    };

    agencyResultEleven = {
      agencyNumber: '3494',
      agencyCheckNumber: '0',
    };

    accountResultTen = {
      accountNumber: '10089934',
      accountCheckNumber: 'X',
    };

    accountResultEleven = {
      accountNumber: '10089939',
      accountCheckNumber: '0',
    };
  });

  describe('validate BancoDoBrasil agency number', () => {
    it('should correctly calculate the check number', () => {
      checkNumberCalculated = calculator.calculateAgency(
        bankAccount.agencyNumber,
      );
      expect(checkNumberCalculated).equals(bankAccount.agencyCheckNumber);
    });

    it('should correctly calculate the check number when module equal ten', () => {
      checkNumberCalculated = calculator.calculateAgency(
        agencyResultTen.agencyNumber,
      );
      expect(checkNumberCalculated).equals(agencyResultTen.agencyCheckNumber);
    });

    it('should correctly calculate the check number when module equal ten and lowercase', () => {
      agencyResultTen.agencyCheckNumber = 'x';
      expect(validator.agencyCheckNumberMatch(agencyResultTen)).to.be.true;
    });

    it('should correctly calculate the check number when module equal eleven', () => {
      checkNumberCalculated = calculator.calculateAgency(
        agencyResultEleven.agencyNumber,
      );
      expect(checkNumberCalculated).equals(
        agencyResultEleven.agencyCheckNumber,
      );
    });
  });

  describe('validate BancoDoBrasil account number', () => {
    it('should correctly calculate the check number', () => {
      checkNumberCalculated = calculator.calculateAccount(
        bankAccount.accountNumber,
      );
      expect(checkNumberCalculated).equals(bankAccount.accountCheckNumber);
    });

    it('should correctly calculate the check number when result equal ten', () => {
      checkNumberCalculated = calculator.calculateAccount(
        accountResultTen.accountNumber,
      );
      expect(checkNumberCalculated).equals(accountResultTen.accountCheckNumber);
    });

    it('should correctly calculate the check number when result equal ten and lowercase', () => {
      checkNumberCalculated = calculator.calculateAccount(
        accountResultTen.accountNumber,
      );
      expect(checkNumberCalculated).equals(accountResultTen.accountCheckNumber);
    });

    it('should correctly calculate the check number when result equal eleven', () => {
      checkNumberCalculated = calculator.calculateAccount(
        accountResultEleven.accountNumber,
      );
      expect(checkNumberCalculated).equals(
        accountResultEleven.accountCheckNumber,
      );
    });
  });
});
