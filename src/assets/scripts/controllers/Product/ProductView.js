import Step from '../../libraries/Step';
import Lazy from '../../libraries/Lazy';

import { getElements, renderDOM, breakLineByIndex } from '../../utils';

export default class ProductView extends Step.View {
  init() {
    this.ui = {
      productItem: getElements('[data-js-product]')[0],
      form: getElements('[data-js-form]')[0],
      formRequest: getElements('.c-form__request')[0],
      formMessage: getElements('.c-form__message')[0],
    };
  }

  static createElementErrorMessage({
    tagErrorMessage,
    classErrorMessage,
    name,
    ruleName,
    message,
  }) {
    return `
      <${tagErrorMessage} class="${classErrorMessage}" data-validator-name="${name}" data-validator-rule="${ruleName}">
        <svg class="o-icon o-icon--micro"><use xlink:href="images/icons.svg#svg-exclamation-circle-solid"/></svg>
        <span class="${classErrorMessage}-text">${message}</span>
      </${tagErrorMessage}>
    `;
  }

  getProductTemplateMap(products) {
    return products.map(this.getProductTemplate).join('');
  }

  getProductTemplate({ name, price, url, alt, warnings }) {
    return `
      <div class="c-product">
        <div class="c-product__container">
          <h2 class="c-product__title o-title o-title--highlight">
            ${breakLineByIndex(name)}
          </h2>
          <div class="c-product__price o-text--light">
            $${price}
          </div>
          <figure class="c-product__figure">
            <img data-src="${url}" alt="${alt}" class="c-product__image">
          </figure>
          <ul class="c-product__warnings">
            ${warnings
              .map(
                warning => `
                <li class="c-product__warnings__item">
                  <span class="c-product__warnings__icon">
                    <svg class="o-icon o-icon--fluid o-icon--${warning.icon}">
                      <use xlink:href="images/icons.svg#svg-${warning.icon}" />
                    </svg>
                  </span>
                  <span class="c-product__warnings__text">
                    ${warning.text}
                  </span>
                </li>
              `
              )
              .join('')}
          </ul>
        </div>
      </div>
    `;
  }

  showProduct() {
    const product = getElements('.c-product', this.ui.productItem)[0];
    const images = getElements('img[data-src]', product);

    return Lazy.wait(images).then(() => {
      product.classList.add('show');
    });
  }

  static removeMessageError(name, ruleName, context) {
    const errorMessages = getElements(
      `[data-validator-name="${name}"][data-validator-rule="${ruleName}"]`,
      context
    );

    if (errorMessages && errorMessages.length > 0) {
      errorMessages.forEach(messageEl => messageEl.remove());
    }
  }

  handlerInvalidField(name, ruleName, error) {
    const element = getElements(`[name="${name}"]`, this.ui.form)[0];
    const parent = element.parentNode;

    ProductView.removeMessageError(name, ruleName, parent);

    parent.classList.add('validate--error');

    parent.insertAdjacentHTML(
      'beforeend',
      ProductView.createElementErrorMessage({
        name,
        ruleName,
        tagErrorMessage: 'span',
        classErrorMessage: 'validate--message-error',
        message: error,
      })
    );
  }

  handlerValidField(name, ruleName) {
    const element = getElements(`[name="${name}"]`, this.ui.form)[0];
    const parent = element.parentNode;

    parent.classList.remove('validate--error');

    ProductView.removeMessageError(name, ruleName, parent);
  }

  hideForm(cb) {
    const transitionendHandler = () => {
      cb();
      this.ui.form.removeEventListener('transitionend', transitionendHandler);
    };

    this.ui.form.addEventListener('transitionend', transitionendHandler);
    this.ui.form.classList.remove('show');
  }

  showFormMessage() {
    this.ui.formRequest.classList.add('t-display--hide');
    this.ui.formMessage.classList.add('t-display--show-flex');

    const images = getElements('img[data-src]', this.ui.formMessage);

    Lazy.wait(images, { delay: 200 }).then(() => {
      this.ui.form.classList.add('show');
    });
  }

  removeLoader() {
    const loader = getElements('[ref="loader"]', this.ui.productItem)[0];
    loader.remove();
  }

  renderProduct(htmlString) {
    renderDOM(htmlString, this.ui.productItem);
  }
}
