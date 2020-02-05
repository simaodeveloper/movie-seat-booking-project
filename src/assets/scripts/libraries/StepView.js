import { getElements } from '../utils';

export default class StepView {
  init() {}

  setElementByLabel(label) {
    this.el = getElements(`[data-step-label="${label}"]`)[0];
  }

  enter() {
    this.el.classList.add('step--is-active');
  }

  leave() {
    this.el.classList.remove('step--is-active');
  }
}
