const { expect } = require('chai');
const calculator = require('../src/number-calculators/banrisul');

describe('BanrisulCheckNumberCalculator', () => {
  let bankAccount;

  beforeEach(() => {
    bankAccount = {
      accountNumber: '358507671',
      accountCheckNumber: '8',
    };

    bankAccountModuleOne = {
      accountNumber: '358507670',
      accountCheckNumber: '6',
    };

    bankAccountModuleZero = {
      accountNumber: '358507675',
      accountCheckNumber: '0',
    };
  });

  describe('validate Banrisul account number', () => {
    it('should correctly calculate the check number', () => {
      checkNumberCalculated = calculator.calculate(bankAccount.accountNumber);
      expect(checkNumberCalculated).equals(bankAccount.accountCheckNumber);
    });

    it('should correctly calculate the check number with module one', () => {
      checkNumberCalculated = calculator.calculate(
        bankAccountModuleOne.accountNumber,
      );
      expect(checkNumberCalculated).equals(
        bankAccountModuleOne.accountCheckNumber,
      );
    });

    it('should correctly calculate the check number with module zero', () => {
      checkNumberCalculated = calculator.calculate(
        bankAccountModuleZero.accountNumber,
      );
      expect(checkNumberCalculated).equals(
        bankAccountModuleZero.accountCheckNumber,
      );
    });
  });
});
