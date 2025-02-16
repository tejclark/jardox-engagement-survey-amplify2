import { useTranslation } from "react-i18next";
import { defaultNS } from "./i18n/settings";

import { Suspense } from "react";
import { Link, Element } from "react-scroll";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { BarsArrowDownIcon } from '@heroicons/react/24/outline'

import Admin from "./components/Admin";
import Header from "./components/Header";
import Loading from "./components/Loading"
import Survey from "./components/Survey";
import Submitted from "./components/Submitted";

function App() {
  return (
    <Router>
      <div className="App min-h-screen">
        <Header />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/submitted" element={<Submitted />} />
          <Route path="/" element={<Root />} />
        </Routes>
      </div>
    </Router>
  );
}

const Root = () => {
  const { t } = useTranslation(defaultNS);

  return (
    // <Closed />
    <main>
      <div>
        <div className="mx-auto">
          <div className="relative isolate overflow-hidden bg-gray-800 px-6 py-12 text-center shadow-2xl sm:px-16">
            <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('survey.introduction.title')}</h1>
            <p className="mx-auto mt-6 max-w-3xl text-md leading-6 text-gray-100">
              {t('survey.introduction.text_1')}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-md leading-6 text-gray-100">
              {t('survey.introduction.text_2')}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-md leading-6 text-gray-100">
              {t('survey.introduction.text_3')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="survey" spy={true} smooth={true} duration={250}
                className="cursor-pointer rounded-md bg-white px-6 py-2 text-md font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white flex items-center justify-between space-x-2"
              >
                <span className="whitespace-nowrap">{t('survey.introduction.start_button')}</span>
                <BarsArrowDownIcon className="w-6 h-6" />
              </Link>
            </div>
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
      <Element name="survey" className="pb-20">
        <Suspense fallback={<Loading />}>
          <Survey />
        </Suspense>
      </Element>
    </main>
  )
}

export default App;
