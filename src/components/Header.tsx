import { useTranslation } from "react-i18next";
import { languages } from "../i18n/settings";

import elFlag from "../country-flags/el.svg";
import enFlag from "../country-flags/en.svg";
import plFlag from "../country-flags/pl.svg";
import roFlag from "../country-flags/ro.svg";

const flags: Record<string, string> = {
  el: elFlag,
  en: enFlag,
  pl: plFlag,
  ro: roFlag,
};

export default function Header() {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
  };

  return (
    <header className="bg-gray-800 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <img
              className="block h-10 w-auto"
              src="/JARDOX_LOGO_200-1.png"
              alt="Jardox"
            />
          </div>
          <div className="sm:ml-6">
            <ul className="flex space-x-2">
              {languages.map((l) => {
                return (
                  <li key={l}>
                    <button onClick={changeLanguage(l)} className={i18n.language === l ? "ring-white ring-2 block p-0.5 rounded-full" : "block p-0.5 rounded-full"}>
                      <img src={flags[l]} alt={l} className="w-6 h-6" />
                      <div className="sr-only">{l}</div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}