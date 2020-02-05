import {
  getUserAgentChecker,
  isAndroid,
  isBlackBerry,
  isIos,
  isOpera,
  isWindowsMobile,
  isAny,
} from '../src/assets/scripts/libraries/IsMobile';

const USER_AGENTS = {
  ANDROID:
    'Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/_BuildID_) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36',
  IOS:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
  BLACKBERRY:
    'Mozilla/5.0 (BlackBerry; U; BlackBerry 9320; nl) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.714 Mobile Safari/534.11+',
  OPERA:
    'Opera/9.80 (J2ME/MIDP; Opera Mini/5.1.21214/28.2725; U; ru) Presto/2.8.119 Version/11.10',
  WINDOWS_MOBILE:
    'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; HTC; Windows Phone 8X by HTC)',
};

const mockUserAgent = userAgentString =>
  Object.defineProperty(navigator, 'userAgent', {
    get() {
      return userAgentString;
    },
    configurable: true,
  });

describe('isMobile:module', () => {
  test('should have a "getUserAgentChecker method"', () => {
    expect(getUserAgentChecker).toBeInstanceOf(Function);
  });

  test('should have a "isAndroid method"', () => {
    expect(isAndroid).toBeInstanceOf(Function);
  });

  test('should have a "isBlackBerry method"', () => {
    expect(isBlackBerry).toBeInstanceOf(Function);
  });

  test('should have a "isIos method"', () => {
    expect(isIos).toBeInstanceOf(Function);
  });

  test('should have a "isOpera method"', () => {
    expect(isOpera).toBeInstanceOf(Function);
  });

  test('should have a "isWindowsMobile method"', () => {
    expect(isWindowsMobile).toBeInstanceOf(Function);
  });

  test('should have a "isAny method"', () => {
    expect(isAny).toBeInstanceOf(Function);
  });
});

describe('isMobile:getUserAgentChecker:method"', () => {
  test('should return a function given a pattern', () => {
    const actual = getUserAgentChecker(/Android/i);
    const expected = Function;

    expect(actual).toBeInstanceOf(expected);
  });

  test('should return true when called with a given Android pattern on Android userAgent', () => {
    const actual = getUserAgentChecker(/Android/i)(USER_AGENTS.ANDROID);
    expect(actual).toBeTruthy();
  });

  test('should return false when called with a given Android pattern on Android userAgent', () => {
    const actual = getUserAgentChecker(/Android/i)(USER_AGENTS.IOS);
    expect(actual).toBeFalsy();
  });
});

describe('isMobile:isAndroid:method"', () => {
  test('should return a correct condition given a userAgent', () => {
    mockUserAgent(USER_AGENTS.ANDROID);
    expect(isAndroid()).toBeTruthy();

    mockUserAgent(USER_AGENTS.IOS);
    expect(isAndroid()).toBeFalsy();
  });
});

describe('isMobile:isIos:method"', () => {
  test('should return a correct condition given a userAgent', () => {
    mockUserAgent(USER_AGENTS.IOS);
    expect(isIos()).toBeTruthy();

    mockUserAgent(USER_AGENTS.ANDROID);
    expect(isIos()).toBeFalsy();
  });
});

describe('isMobile:isBlackBerry:method"', () => {
  test('should return a correct condition given a userAgent', () => {
    mockUserAgent(USER_AGENTS.BLACKBERRY);
    expect(isBlackBerry()).toBeTruthy();

    mockUserAgent(USER_AGENTS.ANDROID);
    expect(isBlackBerry()).toBeFalsy();
  });
});

describe('isMobile:isOpera:method"', () => {
  test('should return a correct condition given a userAgent', () => {
    mockUserAgent(USER_AGENTS.OPERA);
    expect(isOpera()).toBeTruthy();

    mockUserAgent(USER_AGENTS.ANDROID);
    expect(isOpera()).toBeFalsy();
  });
});

describe('isMobile:isWindowsMobile:method"', () => {
  test('should return a correct condition given a userAgent', () => {
    mockUserAgent(USER_AGENTS.WINDOWS_MOBILE);
    expect(isWindowsMobile()).toBeTruthy();

    mockUserAgent(USER_AGENTS.ANDROID);
    expect(isWindowsMobile()).toBeFalsy();
  });
});

describe('isMobile:isAny:method"', () => {
  test('should return true if is mobile', () => {
    mockUserAgent(USER_AGENTS.ANDROID);
    expect(isAny()).toBeTruthy();

    mockUserAgent(USER_AGENTS.BLACKBERRY);
    expect(isAny()).toBeTruthy();

    mockUserAgent(USER_AGENTS.IOS);
    expect(isAny()).toBeTruthy();

    mockUserAgent(USER_AGENTS.OPERA);
    expect(isAny()).toBeTruthy();

    mockUserAgent(USER_AGENTS.WINDOWS_MOBILE);
    expect(isAny()).toBeTruthy();
  });
});
