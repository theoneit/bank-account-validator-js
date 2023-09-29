const MUTIPLY_WEIGHT = [2,7,6,5,4,3,2];

const numberCalculator = {
  calculateAccount(accountNumber) {
    const numbers = accountNumber.split("");
    let sequenceSum = 0;
    for (let index = 0; index < numbers.length; index++) {
      const number = parseInt(numbers[index]);
      sequenceSum += this.multiplyAccordingWeight(number, index);
    }

    return numberCalculator.accountModule(sequenceSum);
  },

  multiplyAccordingWeight(number, index) {
    return number * MUTIPLY_WEIGHT[index];
  },

  accountModule(sequenceSum) {
    const module = sequenceSum % 11;
    if(module === 0) {
      return "0";
    } else {
      if (module === 1) {
        return "P";
      } else {
        return (11 - module).toString();
      }
    }
  },

  calculateAgency(agencyNumber) {
    const numbers = agencyNumber.split("");
    let sequenceSum = 0;
    for (let index = 0; index < numbers.length; index++) {
      const seq = 5 - index;
      sequenceSum += (parseInt(numbers[index]) * seq);
    }
    return numberCalculator.agencyModule(sequenceSum);
  },

  agencyModule(sequenceSum) {
    const result = 11 - (sequenceSum % 11);
    if(result === 10) {
      return "P";
    } else {
      if (result === 11) {
        return "0";
      } else {
        return result.toString();
      }
    }
  },
};

module.exports = numberCalculator;