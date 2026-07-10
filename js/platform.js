/* ============================================
   PLATFORM DETECTION & DOWNLOAD LOGIC
   رَفِيق — Platform.js
   ============================================ */

const Platform = (() => {
  const ua = navigator.userAgent || '';
  const plat = navigator.platform || '';
  const maxTouch = navigator.maxTouchPoints || 0;

  /* ---------- detection helpers ---------- */
  const isIOS = /iPad|iPhone|iPod/.test(plat) ||
    (ua.includes('Mac') && maxTouch > 1);          // iPad on iPadOS 13+
  const isIPhone = /iPhone/.test(plat) || (ua.includes('iPhone'));
  const isIPad   = isIOS && (plat === 'MacIntel' && maxTouch > 1) || /iPad/.test(plat);
  const isAndroid = /Android/.test(ua);
  const isWindows = /Win/.test(plat);
  const isMac     = /Mac/.test(plat) && !isIOS;
  const isLinux   = /Linux/.test(plat) && !isAndroid;

  /* ---------- public API ---------- */
  return {
    isIOS,
    isIPhone,
    isIPad,
    isAndroid,
    isWindows,
    isMac,
    isLinux,

    /** Returns a human-readable platform name */
    getName() {
      if (isIPhone)   return 'iPhone';
      if (isIPad)     return 'iPad';
      if (isIOS)      return 'iOS';
      if (isAndroid)  return 'Android';
      if (isWindows)  return 'Windows';
      if (isMac)      return 'macOS';
      if (isLinux)    return 'Linux';
      return 'Desktop';
    },

    /** Returns a platform key for CSS classes / logic */
    getKey() {
      if (isIPhone || isIPad || isIOS) return 'ios';
      if (isAndroid) return 'android';
      if (isWindows) return 'windows';
      if (isMac)     return 'macos';
      if (isLinux)   return 'linux';
      return 'desktop';
    },

    /** Whether this platform can directly download an APK */
    canInstallAPK() {
      return isAndroid;
    },

    /** Whether this platform can directly install an IPA (it cannot, but we offer the file) */
    canInstallIPA() {
      return isIOS;
    },

    /** Whether to show QR code (desktop) */
    shouldShowQR() {
      return !isAndroid && !isIOS;
    }
  };
})();
