import i18next, { i18n as i18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { languages, defaultNS } from "./settings";
import HttpApi from "i18next-http-backend";

const createI18n = (language: string): i18nInstance => {
  const i18n = i18next.createInstance().use(initReactI18next);

  i18n
    .use(HttpApi) // Use backend plugin for translation file download.
    .init({
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      debug: false,
      lng: language,
      fallbackLng: language,
      ns: defaultNS,
      returnNull: false
    });

  return i18n;
};

export const i18n = createI18n(languages[0]);