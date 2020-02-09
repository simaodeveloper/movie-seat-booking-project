import Component from '../libraries/Component';

import eventBus from '../eventBus';

Component.define('warning', element => {
  const countEl = element.querySelector('#count');
  const totalEl = element.querySelector('#total');

  const setCountQuantity = selectedSeatQuantity => {
    countEl.textContent = selectedSeatQuantity;
  };

  const setTotalValue = (moviePrice, selectedSeatQuantity) => {
    totalEl.textContent = moviePrice * selectedSeatQuantity;
  };

  const changeStateHandler = ({ moviePrice, selectedSeatQuantity }) => {
    setCountQuantity(selectedSeatQuantity);
    setTotalValue(moviePrice, selectedSeatQuantity);
  };

  eventBus.on('initialState', changeStateHandler);
  eventBus.on('getState', changeStateHandler);
});
