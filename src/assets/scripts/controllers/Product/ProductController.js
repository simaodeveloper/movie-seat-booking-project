import Step from '../../libraries/Step';
import api from '../../API';

import { prepareProductsToDisplay } from '../_helpers';
import { getValuesFromFormAsObject } from '../../utils';

import { Validator, Checkers } from '../../libraries/Validator';

const validator = new Validator();
const checkers = new Checkers();

export default class ProductController extends Step {
  constructor(step, steps, stage, view) {
    super(step, steps, stage, view);
    this.params = this.stage.getParams(this.step.label);
    this.loadEvents();
  }

  enter(direction) {
    super.enter(direction);
    this.mountProduct();
  }

  loadEvents() {
    const schema = validator
      .schema({
        name: checkers
          .required({ message: 'Please, provide a name!' })
          .minLength({
            condition: 2,
            message: 'Please, provide at least 2 characters!',
          })
          .fullname({
            condition: 2,
            message: 'Please, provide your fullname!',
          })
          .create(),
        email: checkers
          .required({ message: 'Please, provide a email!' })
          .email()
          .create(),
      })
      .on('valid', (name, ruleName) =>
        this.view.handlerValidField(name, ruleName)
      )
      .on('error', (name, ruleName, error) =>
        this.view.handlerInvalidField(name, ruleName, error)
      )
      .on('success', () => {
        api
          .postProduct({
            ...getValuesFromFormAsObject(this.view.ui.form),
            id: this.params.plantId,
          })
          .then(response => {
            this.view.hideForm(() => this.view.showFormMessage(response));
          })
          .catch(err => err);
      });

    this.view.ui.form.addEventListener('submit', function submitHandler(event) {
      event.preventDefault();
      schema.execute(getValuesFromFormAsObject(this));
    });
  }

  mountProduct() {
    api
      .getProductById(this.params.plantId)
      .then(response => this.saveProduct(response))
      .then(response => this.transformDataToDisplay(response))
      .then(products => this.view.getProductTemplateMap(products))
      .then(htmlString => {
        this.view.removeLoader();
        this.view.renderProduct(htmlString);
        this.view.showProduct();
      });
  }

  transformDataToDisplay(product) {
    return prepareProductsToDisplay.call(this, [product]);
  }

  saveProduct(response) {
    const state = { ...this.step.state };
    state.product = response;
    this.stage.setCurrentStepState(state);
    return state.product;
  }
}
