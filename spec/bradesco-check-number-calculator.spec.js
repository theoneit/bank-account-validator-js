const { expect } = require('chai');
const validator = require('../src/validators/bradesco');
const calculator = require('../src/number-calculators/bradesco');
const numberCalculator = require('../src/number-calculators/bradesco');

describe('BradescoCheckNumberCalculator', () => {
  let bankAccountRecord;

  beforeEach(() => {
    bankAccountRecord = {
      agencyNumber: '1425',
      agencyCheckNumber: '7',
      accountNumber: '0238069',
      accountCheckNumber: '2',
    };

    bankAccountResultTen = {
      agencyNumber: '8221',
      agencyCheckNumber: 'P',
      accountNumber: '0301357',
      accountCheckNumber: '2',
    };

    bankAccountResultEleven = {
      agencyNumber: '8212',
      agencyCheckNumber: '0',
      accountNumber: '0301357',
      accountCheckNumber: 'P',
    };

    bankAccountModuleOne = {
      agencyNumber: '9708',
      accountNumber: '0301357',
      accountCheckNumber: 'P',
    };

    bankAccountModuleZero = {
      agencyNumber: '1453',
      accountNumber: '0325620',
      accountCheckNumber: '0',
    };
  });

  describe('validate Bradesco agency number', () => {
    it('should correctly calculate the check number', () => {
      checkNumberCalculated = calculator.calculateAgency(
        bankAccountRecord.agencyNumber,
      );
      expect(checkNumberCalculated).equals(bankAccountRecord.agencyCheckNumber);
    });

    it('should correctly calculate the check number when result equal ten', () => {
      checkNumberCalculated = calculator.calculateAgency(
        bankAccountResultTen.agencyNumber,
      );
      expect(checkNumberCalculated).equals(
        bankAccountResultTen.agencyCheckNumber,
      );
    });

    it('should correctly calculate the check number when result equal ten and lowercase', () => {
      bankAccountResultTen.agencyCheckNumber = 'p';
      expect(validator.agencyCheckNumberMatch(bankAccountResultTen)).to.be.true;
    });

    it('should correctly calculate the check number when result equal eleven', () => {
      checkNumberCalculated = calculator.calculateAgency(
        bankAccountResultEleven.agencyNumber,
      );
      expect(checkNumberCalculated).equals(
        bankAccountResultEleven.agencyCheckNumber,
      );
    });
  });

  describe('validate Bradesco account number', () => {
    it('should correctly calculate the check number', () => {
      checkNumberCalculated = numberCalculator.calculateAccount(
        bankAccountRecord.accountNumber,
      );
      expect(checkNumberCalculated).equals(
        bankAccountRecord.accountCheckNumber,
      );
    });

    it('should correctly calculate the check number when module equal zero', () => {
      checkNumberCalculated = numberCalculator.calculateAccount(
        bankAccountModuleZero.accountNumber,
      );
      expect(checkNumberCalculated).equals(
        bankAccountModuleZero.accountCheckNumber,
      );
    });

    it('should correctly calculate the check number when module equal one', () => {
      checkNumberCalculated = numberCalculator.calculateAccount(
        bankAccountModuleOne.accountNumber,
      );
      expect(checkNumberCalculated).equals(
        bankAccountModuleOne.accountCheckNumber,
      );
    });

    it('should correctly calculate the check number when module equal one and lowercase', () => {
      bankAccountModuleOne.accountCheckNumber = 'p';
      expect(validator.accountCheckNumberMatch(bankAccountModuleOne)).to.be
        .true;
    });
  });
});
