const getComponentSelector = name => `[data-component-name="${name}"]`;

export default class Component {
  static init() {
    this.components.forEach(({ name, controller }) => {
      const elements = Array.from(
        document.querySelectorAll(getComponentSelector(name))
      );

      elements.forEach(element => {
        const { componentParams } = element.dataset;
        const params = JSON.parse(componentParams || '{}');
        controller(element, params);
      });
    });
  }

  static define(name, controller) {
    if (!this.components) {
      this.components = [];
    }

    const component = this.components.find(
      componentItem => componentItem.name === name
    );

    if (component) {
      throw new Error(`The ${name} component already exists!`);
    }

    this.components.push({
      name,
      controller,
    });
  }
}
