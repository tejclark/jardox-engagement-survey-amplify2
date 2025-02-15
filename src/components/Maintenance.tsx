import { useTranslation } from "react-i18next";
import { defaultNS } from "../i18n/settings";

export default function Maintenance() {
  const { t } = useTranslation(defaultNS);

  return (
    <main>
      <div>
        <div className="mx-auto">
          <div className="relative isolate overflow-hidden bg-gray-800 px-6 py-12 text-center shadow-2xl sm:px-16 min-h-screen flex flex-col justify-center items-center -mt-[56px]">
            <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('survey.introduction.title')}</h1>
            <p className="mx-auto mt-6 max-w-3xl text-md leading-6 text-gray-100">
              {t('survey.introduction.coming_soon')}
            </p>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="1" />
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="red" />
                  <stop offset={1} stopColor="red" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </main>
  )
}