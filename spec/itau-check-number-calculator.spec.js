const { expect } = require('chai');
const validator = require('../src/validators/itau');
const calculator = require('../src/number-calculators/itau');
const numberCalculator = require('../src/number-calculators/itau');

describe('ItauCheckNumberCalculator', () => {
  let bankAccountParams;

  beforeEach(() => {
    bankAccountParams = {
      agencyNumber: '2545',
      accountNumber: '02366',
      accountCheckNumber: '1',
    };

    bankAccountModuleZero = {
      agencyNumber: '1874',
      accountNumber: '10009',
      accountCheckNumber: '0',
    };
  });

  describe('validate Itaú account number', () => {
    it('should correctly calculate the check number', () => {
      checkNumberCalculated = numberCalculator.calculate(
        bankAccountParams.agencyNumber,
        bankAccountParams.accountNumber,
      );
      expect(checkNumberCalculated).equals(
        bankAccountParams.accountCheckNumber,
      );
    });

    it('should correctly calculate the check number with module zero', () => {
      checkNumberCalculated = numberCalculator.calculate(
        bankAccountModuleZero.agencyNumber,
        bankAccountModuleZero.accountNumber,
      );
      expect(checkNumberCalculated).equals(
        bankAccountModuleZero.accountCheckNumber,
      );
    });
  });
});
