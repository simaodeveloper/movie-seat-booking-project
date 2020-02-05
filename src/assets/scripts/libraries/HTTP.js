// global fetch
export const request = async (url, options) =>
  fetch(url, {
    ...options,
  });

export const get = async (url, options) =>
  request(url, {
    ...options,
    method: 'GET',
  });

export const post = async (url, options) =>
  request(url, {
    ...options,
    method: 'POST',
  });
