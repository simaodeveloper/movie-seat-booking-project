import Component from '../libraries/Component';

import eventBus from '../eventBus';

Component.define('movie', element => {
  const movieSelectEl = element.querySelector('.movie__select');

  const getMovieSelectValue = () => ({
    moviePrice: Number(movieSelectEl.value),
  });

  const setSelectFirstState = moviePrice => {
    const optionsEl = Array.from(movieSelectEl.children);
    optionsEl.forEach((options, index) => {
      if (options.value === String(moviePrice)) {
        movieSelectEl.selectedIndex = String(index);
      }
    });
  };

  movieSelectEl.addEventListener('change', () =>
    eventBus.dispatch('setState', getMovieSelectValue())
  );

  eventBus.on('initialState', ({ moviePrice }) => {
    setSelectFirstState(moviePrice);
    movieSelectEl.dispatchEvent(new Event('change'));
  });
});
