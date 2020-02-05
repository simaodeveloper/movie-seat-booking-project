/**
 * @author Daniel Simão da Silva
 */

export default class Checkers {
  save(rule) {
    this.rules = [...(this.rules || []), rule];
    return this;
  }

  create() {
    const rules = [...this.rules];
    this.rules = [];
    return rules;
  }

  static add({ name, checker, message: error }) {
    Checkers.prototype[name] = function setRule(options) {
      const { condition, message } = {
        condition: undefined,
        message: '',
        ...options,
      };

      return this.save({
        name,
        message: message || error,
        test: checker(condition),
      });
    };
  }
}
