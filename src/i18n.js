// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

// استخراج اللغة من localStorage قبل التهيئة
let savedLang = "en";
try {
  const persistUi = JSON.parse(localStorage.getItem("persist:ui"));
  if (persistUi) {
    const parsed = JSON.parse(persistUi.language);
    savedLang = parsed || "en";
  }
} catch (e) {
  console.warn("Error reading language from localStorage:", e);
}

i18n.use(Backend).use(initReactI18next).init({
  fallbackLng: "en",
  lng: savedLang, // اللغة المحفوظة من البداية
  defaultNS: "translation",
  interpolation: {
    escapeValue: false
  },
  backend: {
    loadPath: "/locales/{{lng}}/translation.json"
  }
});

export default i18n;
