/* istanbul ignore file */

/**
 * @author Daniel Simão da Silva
 */

import Checkers from './checker';

const validators = [
  {
    name: 'minLength',
    checker: condition => value => value.length >= condition,
    message: 'Please, provide at least 2 characters!',
  },
  {
    name: 'required',
    checker: (condition = true) => value =>
      condition && value !== undefined && value.length > 0,
    message: 'Please, provide a value!',
  },
  {
    name: 'fullname',
    checker: (condition = 2) => value =>
      value.split(/\s/gi).length >= condition,
    message: 'Please, provide your fullname!',
  },
  {
    name: 'email',
    checker: () => value => {
      const reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      return reEmail.test(value);
    },
    message: 'Please, provide a valid e-mail.!',
  },
];

validators.forEach(validator => Checkers.add(validator));
