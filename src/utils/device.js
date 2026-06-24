export function getDeviceType() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
  const isTablet = /ipad|android(?!.*mobile)|tablet|kindle|silk/i.test(userAgent.toLowerCase());
  
  if (isTablet) return 'tablet';
  if (isMobile) return 'mobile';
  return 'desktop';
}

export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function isDesktop() {
  return getDeviceType() === 'desktop' && !isTouchDevice();
}