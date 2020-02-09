import Component from './libraries/Component';
import Storage from './libraries/Storage';
import StorageAdapter from './StorageAdapter';

import eventBus from './eventBus';

import './components/warning';
import './components/movie';
import './components/seats';

document.addEventListener('DOMContentLoaded', () => {
  const dbAdapter = new StorageAdapter(localStorage);
  const store = new Storage(dbAdapter);

  let state = store.get('state');

  if (!state) {
    state = {
      seats: [],
      moviePrice: 0,
      selectedSeatQuantity: 0,
    };

    store.set('state', state);
  }

  eventBus.on('setState', payload => {
    state = { ...state, ...payload };
    store.set('state', state);
    eventBus.dispatch('getState', state);
  });

  Component.init();

  eventBus.dispatch('initialState', state);
});
