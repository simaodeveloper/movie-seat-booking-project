/**
 * @author Daniel Simão da Silva
 */

import Checkers from './checker';
import './checker.validators';

import Emitter from '../Emitter';

export default class Validator extends Emitter {
  schema(rules) {
    this.rules = { ...rules };
    return this;
  }

  isAllValid() {
    return Object.keys(this.rules).every(name => this.rules[name].isValid);
  }

  setRuleValidity(name, rulesValidated) {
    this.rules[name].isValid = rulesValidated.every(Boolean);
  }

  execute(valueSchema) {
    const valueNames = Object.keys(valueSchema);

    valueNames.forEach(property => {
      const rulesValidated = [];
      const rules = this.rules[property];
      let breaked = true;

      for (let index = 0; index < rules.length; index += 1) {
        const rule = rules[index];

        const valid = rule.test(valueSchema[property]);

        if (!valid) {
          breaked = !breaked;
          rulesValidated.push(valid);
          this.dispatch('error', property, rule.name, rule.message);
          break;
        }

        rulesValidated.push(valid);
        this.dispatch('valid', property, rule.name);
      }

      if (!breaked) return;

      this.setRuleValidity(property, rulesValidated);
    });

    if (this.isAllValid()) {
      this.dispatch('success');
    }
  }
}

export { Validator, Checkers };
