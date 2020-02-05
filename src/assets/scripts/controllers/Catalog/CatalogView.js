import Step from '../../libraries/Step';
import Lazy from '../../libraries/Lazy';

import { isAny as isMobile } from '../../libraries/IsMobile';

import { getElements, renderDOM, stripTags } from '../../utils';

export default class CatalogView extends Step.View {
  init() {
    this.ui = {
      catalogList: getElements('[ref="catalog-list"]')[0],
    };
  }

  getCardTemplate({ id, url, name, price, warnings }) {
    return `
      <article class="c-card o-catalog__grid__item">
        <div class="c-card__container">
          <figure class="c-card__figure">
            <img data-src="${url}" alt="" class="c-card__image">
          </figure>
          <h3 class="c-card__title t-text--bold">${name}</h3>
          <div class="c-card__wrap">
            <div class="c-card__price t-text--light">$${price}</div>
            <ul class="c-card__warnings">
              ${warnings
                .map(
                  warning => `
                  <li class="c-card__warnings__item o-icon--${
                    warning.icon
                  }" title="${stripTags(warning.text)}">
                    <svg class="o-icon o-icon--fluid"><use xlink:href="images/icons.svg#svg-${
                      warning.icon
                    }" /></svg>
                  </li>
                `
                )
                .join('')}
            </ul>
          </div>
          <button class="c-btn c-btn--default c-btn--full c-card__button" data-plant-id="${id}">buy now</button>
        </div>
      </article>
    `;
  }

  showCards() {
    let delay = 100;
    const cards = getElements('.c-card', this.ui.catalogList);
    const images = cards.map(card => getElements('img[data-src]', card)[0]);
    return Lazy.wait(images).then(() => {
      cards.forEach(card => {
        delay += 50;
        setTimeout(() => card.classList.add('show'), delay);
      });
    });
  }

  getCardsTemplatesMap(productList) {
    return productList.map(product => this.getCardTemplate(product)).join('');
  }

  sliderSetup() {
    if (isMobile()) {
      const sliderEl = document.querySelector('[data-js-slider]');

      const {
        jsSliderWidthUnit: widthUnit,
        jsSliderSpaceBetween: spaceBetween,
      } = sliderEl.dataset;

      const childrenLength = sliderEl.children.length;

      const sliderWidth =
        (Number(widthUnit) + Number(spaceBetween)) * childrenLength;

      sliderEl.style.width = `${sliderWidth}px`;
    }
  }

  removeLoader() {
    const loader = getElements('[ref="loader"]', this.ui.catalogList)[0];
    loader.remove();
  }

  renderCards(htmlString) {
    renderDOM(htmlString, this.ui.catalogList);
  }
}
