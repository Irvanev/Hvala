// Google Maps API ключи для разных платформ
export const GOOGLE_MAPS_CONFIG = {
  // Веб-версия (ограничена по доменам)
  WEB_API_KEY: "AIzaSyD7K42WP5zjV99GP3xll40eFr_5DaAk3ZU",
  
  // Мобильная версия (без ограничений или ограничена по package name)
  MOBILE_API_KEY: "AIzaSyD7K42WP5zjV99GP3xll40eFr_5DaAk3ZU", // Временно тот же ключ
  
  // Проверка платформы
  getPlatformApiKey: () => {
    // Если запускается в Capacitor (мобильное приложение)
    if (window.Capacitor) {
      return GOOGLE_MAPS_CONFIG.MOBILE_API_KEY;
    }
    // Иначе веб-версия
    return GOOGLE_MAPS_CONFIG.WEB_API_KEY;
  }
};
