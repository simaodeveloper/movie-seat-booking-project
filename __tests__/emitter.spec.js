import Emitter, { MESSAGES } from '../src/assets/scripts/libraries/Emitter';

describe('Emitter:class', () => {
  test('Emitter should be a Constructor', () => {
    const actual = Emitter;
    const expected = Function;

    expect(actual).toBeInstanceOf(expected);
  });

  test('Emitter should create a instance of it self', () => {
    const actual = new Emitter();
    const expected = Emitter;

    expect(actual).toBeInstanceOf(expected);
  });

  test('Emitter instance should have a "on method"', () => {
    const actual = new Emitter();
    const expected = Function;

    expect(actual.on).toBeInstanceOf(expected);
  });

  test('Emitter instance should have a "once method"', () => {
    const actual = new Emitter();
    const expected = Function;

    expect(actual.once).toBeInstanceOf(expected);
  });

  test('Emitter instance should have a "off method"', () => {
    const actual = new Emitter();
    const expected = Function;

    expect(actual.off).toBeInstanceOf(expected);
  });

  test('Emitter instance should have a "dispatch method"', () => {
    const actual = new Emitter();
    const expected = Function;

    expect(actual.dispatch).toBeInstanceOf(expected);
  });
});

describe('Emitter:on:method', () => {
  let emitterInstance;

  beforeEach(() => {
    emitterInstance = new Emitter();
  });

  afterEach(() => {
    emitterInstance = null;
  });

  test('should add a event handler', () => {
    const eventName = 'spy';
    const eventHandler = () => {};

    emitterInstance.on(eventName, eventHandler);

    const actual = emitterInstance.events[eventName];
    const expected = 1;

    expect(actual).toBeDefined();
    expect(actual.length).toBe(expected);
  });

  test('should add two event handlers to the same event', () => {
    const eventName = 'spy';
    const eventHandler = () => {};

    emitterInstance.on(eventName, eventHandler);
    emitterInstance.on(eventName, eventHandler);

    const actual = emitterInstance.events[eventName];
    const expected = 2;

    expect(actual.length).toBe(expected);
  });

  test('should add two event handlers to two different events', () => {
    const eventName = 'spy';
    const eventName2 = 'spy2';
    const eventHandler = () => {};

    emitterInstance.on(eventName, eventHandler);
    emitterInstance.on(eventName2, eventHandler);

    const actual = emitterInstance.events[eventName];
    const expected = 1;

    const actual2 = emitterInstance.events[eventName2];
    const expected2 = 1;

    expect(actual).toBeDefined();
    expect(actual.length).toBe(expected);

    expect(actual2).toBeDefined();
    expect(actual2.length).toBe(expected2);
  });

  test('should throw a error if not provide any params', () => {
    expect(() => emitterInstance.on()).toThrowError(
      new Error(MESSAGES.ARGUMENTS_NOT_PROVIDED)
    );

    expect(() => emitterInstance.on('spyEvent')).toThrowError(
      new Error(MESSAGES.ARGUMENTS_NOT_PROVIDED)
    );
  });
});

describe('Emitter:off:method', () => {
  let emitterInstance;

  beforeEach(() => {
    emitterInstance = new Emitter();
  });

  afterEach(() => {
    emitterInstance = null;
  });

  test('should remove a event handler', () => {
    const eventName = 'spy';
    const eventHandler = () => {};

    emitterInstance.on(eventName, eventHandler);
    emitterInstance.off(eventName, eventHandler);

    expect(() => emitterInstance.dispatch(eventName)).toThrowError(
      new Error(MESSAGES.HANDLER_NOT_DEFINED)
    );
  });

  test('should remove all event handlers when passed just a event name', () => {
    const eventName = 'spy';
    const eventHandler = () => {};

    emitterInstance.on(eventName, eventHandler);
    emitterInstance.off(eventName);

    expect(() => emitterInstance.dispatch(eventName)).toThrowError(
      new Error(MESSAGES.HANDLER_NOT_DEFINED)
    );
  });

  test('should throw a error when pass a invalid event handler', () => {
    const eventName = 'spy';
    const eventHandler = () => {};

    emitterInstance.on(eventName, eventHandler);

    expect(() => emitterInstance.off('spy2')).toThrowError(
      new Error(MESSAGES.EVENT_NOT_EXIST)
    );
  });

  test('should throw a error when pass a invalid event handler', () => {
    const eventName = 'spy';
    const eventHandler = () => {};
    const eventHandler2 = () => {};

    emitterInstance.on(eventName, eventHandler);

    expect(() => emitterInstance.off(eventName, eventHandler2)).toThrowError(
      new Error(MESSAGES.HANDLER_NOT_DEFINED)
    );
  });
});

describe('Emitter:dispatch:method', () => {
  let emitterInstance;

  beforeEach(() => {
    emitterInstance = new Emitter();
  });

  afterEach(() => {
    emitterInstance = null;
  });

  test('should dispatch a event handler', () => {
    const eventName = 'spy';
    const eventHandler = jest.fn();

    emitterInstance.on(eventName, eventHandler);
    emitterInstance.dispatch(eventName);

    expect(eventHandler).toHaveBeenCalled();
  });

  test('should dispatch a event handler with args', () => {
    const eventName = 'spy';
    const args = ['arg1', 'arg2'];
    const eventHandler = jest.fn((...params) => params);

    emitterInstance.on(eventName, eventHandler);
    emitterInstance.dispatch(eventName, ...args);

    expect(eventHandler).toHaveBeenCalledWith(...args);
  });

  test('should throw a error when dispatch a not provided event', () => {
    const eventName = 'spy';

    expect(() => emitterInstance.dispatch(eventName)).toThrowError(
      new Error(MESSAGES.EVENT_NOT_EXIST)
    );
  });
});

describe('Emitter:once:method', () => {
  let emitterInstance;

  beforeEach(() => {
    emitterInstance = new Emitter();
  });

  afterEach(() => {
    emitterInstance = null;
  });

  test('should define a event handler and call it', () => {
    const eventName = 'spy';
    const eventHandler = jest.fn();
    const onMethod = jest.spyOn(emitterInstance, 'on');
    const offMethod = jest.spyOn(emitterInstance, 'off');

    emitterInstance.once(eventName, eventHandler);
    expect(onMethod).toHaveBeenCalled();

    emitterInstance.dispatch(eventName);
    expect(eventHandler).toHaveBeenCalled();
    expect(offMethod).toHaveBeenCalled();
  });
});
