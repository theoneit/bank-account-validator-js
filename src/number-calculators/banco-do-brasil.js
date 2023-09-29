const numberCalculator = {
  calculateAccount(accountNumber) {
    const numbers = accountNumber.split('');
    let sequenceSum = 0;
    for (let index = 0; index < numbers.length; index++) {
      const sequence = 9 - index;
      sequenceSum += parseInt(numbers[index]) * sequence;
    }

    return numberCalculator.module(sequenceSum);
  },

  calculateAgency(agencyNumber) {
    const numbers = agencyNumber.split('');
    let sequenceSum = 0;
    for (let index = 0; index < numbers.length; index++) {
      let sequence = 5 - index;
      sequenceSum += parseInt(numbers[index]) * sequence;
    }
    return numberCalculator.module(sequenceSum);
  },

  module(sequenceSum) {
    const result = 11 - (sequenceSum % 11);
    if (result === 10) {
      return 'X';
    } else {
      if (result === 11) {
        return '0';
      } else {
        return result.toString();
      }
    }
  },
};

module.exports = numberCalculator;
