import Component from '../libraries/Component';

import eventBus from '../eventBus';

Component.define('seats', element => {
  const seatsEl = element;

  const CLASS_SEAT = 'seat';
  const CLASS_SEAT_OCCUPIED = 'seat--occupied';
  const CLASS_SEAT_SELECTED = 'seat--selected';
  const CLASS_ROW = 'row';

  const isFreeSeat = el =>
    el.classList.contains(CLASS_SEAT) &&
    !el.classList.contains(CLASS_SEAT_OCCUPIED);

  const toggleSeatStatus = el => el.classList.toggle(CLASS_SEAT_SELECTED);

  const getSelectedSeatsQuantity = el =>
    el.querySelectorAll(`.${CLASS_SEAT_SELECTED}`).length;

  const getSeatsMatrix = el => {
    const rows = Array.from(el.querySelectorAll(`.${CLASS_ROW}`));
    return rows.map(rowEl => {
      return Array.from(rowEl.querySelectorAll(`.${CLASS_SEAT}`));
    });
  };

  const mapMatrix = (arrMatrix, callback) => {
    return arrMatrix.map((arr, arrIndex) =>
      arr.map((item, itemIndex) => callback(item, arrIndex, itemIndex))
    );
  };

  const getSeatsMatrixClassName = el => {
    return mapMatrix(getSeatsMatrix(el), seatEl => seatEl.className);
  };

  const renderSeatsfromState = seats => {
    const seatsmatrix = getSeatsMatrix(seatsEl);
    mapMatrix(seats, (seatClassName, arrIndex, itemIndex) => {
      const seatEl = seatsmatrix[arrIndex][itemIndex];
      seatEl.className = seatClassName;
    });
  };

  seatsEl.addEventListener('click', event => {
    const seatEl = event.target;

    if (isFreeSeat(seatEl)) toggleSeatStatus(seatEl);

    eventBus.dispatch('setState', {
      seats: getSeatsMatrixClassName(seatsEl),
      selectedSeatQuantity: getSelectedSeatsQuantity(seatsEl),
    });
  });

  eventBus.on('initialState', ({ seats }) => {
    renderSeatsfromState(seats);
  });
});
