const numberCalculator = {
  calculate(agencyNumber, accountNumber) {
    const numbers = (agencyNumber + accountNumber).split('');
    let sequenceSum = 0;
    for (let index = 0; index < numbers.length; index++) {
      const number = parseInt(numbers[index]);
      let sequence = numberCalculator.multiplyAccordingParity(number, index);
      sequence = numberCalculator.adjustAccordingLength(sequence);
      sequenceSum += sequence;
    }

    return numberCalculator.module(sequenceSum);
  },

  multiplyAccordingParity(number, index) {
    return number * (index % 2 === 0 ? 2 : 1);
  },

  adjustAccordingLength(sequenceNumber) {
    let sequence = sequenceNumber;

    if (sequence && sequence > 9) {
      const numbers = sequence.toString().split('');

      sequence = 0;
      for (let index = 0; index < numbers.length; index++) {
        sequence += parseInt(numbers[index]);
      }
    }

    return sequence;
  },

  module(sequenceSum) {
    const module = sequenceSum % 10;

    if (module === 0) {
      return '0';
    } else {
      return (10 - module).toString();
    }
  },
};

module.exports = numberCalculator;
