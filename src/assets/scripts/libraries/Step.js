import StepView from './StepView';

export default class Step {
  constructor(step, steps, stage, view) {
    this.step = step;
    this.steps = steps;
    this.stage = stage;
    this.view = view;

    this.view.setElementByLabel(this.step.label);
    this.view.init();
  }

  start() {
    this.view.enter();
  }

  enter() {
    this.view.enter();
  }

  leave() {
    this.view.leave();
  }
}

Step.View = StepView;
