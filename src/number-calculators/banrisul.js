const MULTIPLY_WEIGHT = [3,2,4,7,6,5,4,3,2];

const numberCalculator = {
  calculate(accountNumber) {
    const numbers = accountNumber.split("");
    let sequenceNumber = 0;
    
    for (let index = 0; index < numbers.length; index++) {
      const number = parseInt(numbers[index]);
      sequenceNumber += this.multiplyAccordingWeight(number, index);
    }

    return numberCalculator.moduleEleven(sequenceNumber).toString();
  },

  multiplyAccordingWeight(number, index) {
    return number * MULTIPLY_WEIGHT[index];
  },

  moduleEleven(sequenceSum) {
    const module = sequenceSum % 11;
    if (module === 0) {
      return 0;
    } else if (module == 1) {
      return 6;
    }
    return 11 - module;
  }
};

module.exports = numberCalculator;