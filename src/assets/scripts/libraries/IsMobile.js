const getUserAgentChecker = pattern => (userAgent = navigator.userAgent) =>
  Boolean(userAgent.match(pattern));

const isAndroid = getUserAgentChecker(/Android/i);

const isBlackBerry = getUserAgentChecker(/BlackBerry/i);

const isIos = getUserAgentChecker(/iPhone|iPad|iPod/i);

const isOpera = getUserAgentChecker(/Opera Mini/i);

const isWindowsMobile = getUserAgentChecker(/IEMobile/i);

const isAny = () =>
  isAndroid() || isBlackBerry() || isIos() || isOpera() || isWindowsMobile();

export {
  getUserAgentChecker,
  isAndroid,
  isBlackBerry,
  isIos,
  isOpera,
  isWindowsMobile,
  isAny,
};
