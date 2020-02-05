import fetch from 'node-fetch';

import { request, get, post } from '../src/assets/scripts/libraries/HTTP';

global.fetch = fetch;

jest.setTimeout(30000);

describe('HTTP:module', () => {
  test('should have a "request method"', () => {
    const actual = request;
    const expected = Function;

    expect(actual).toBeInstanceOf(expected);
  });

  test('should have a "get method"', () => {
    const actual = get;
    const expected = Function;

    expect(actual).toBeInstanceOf(expected);
  });

  test('should have a "post method"', () => {
    const actual = post;
    const expected = Function;

    expect(actual).toBeInstanceOf(expected);
  });
});

describe('HTTP:request:method', () => {
  test('should return status 200 from GET request', async () => {
    const onFetch = jest.spyOn(global, 'fetch');
    const requestMock = jest.fn().mockImplementation(request);
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const options = {
      method: 'GET',
    };

    const response = await requestMock(url, options);

    expect(response).toBeInstanceOf(Object);
    expect(response.status).toBe(200);
    expect(requestMock).toHaveBeenCalled();
    expect(onFetch).toHaveBeenCalledWith(url, options);
  });
});

describe('HTTP:get:method', () => {
  test('should return status 200 from GET request', async () => {
    const getMock = jest.fn().mockImplementation(get);
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const options = {
      method: 'GET',
    };

    const response = await getMock(url, options);

    expect(response).toBeInstanceOf(Object);
    expect(response.status).toBe(200);
    expect(getMock).toHaveBeenCalled();
  });
});

describe('HTTP:post:method', () => {
  test('should return status 201 from POST request', async () => {
    const postMock = jest.fn().mockImplementation(post);
    const url = 'https://jsonplaceholder.typicode.com/todos/';
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        title:
          'asdasdds sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body:
          'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
      }),
    };

    const response = await postMock(url, options);

    expect(response).toBeInstanceOf(Object);
    expect(response.status).toBe(201);
    expect(postMock).toHaveBeenCalled();
  });
});
