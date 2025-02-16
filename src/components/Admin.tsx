import { useEffect, useState } from 'react'
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { getCurrentUser } from 'aws-amplify/auth'
import { Hub } from 'aws-amplify/utils';

import { useTranslation } from "react-i18next";
import { defaultNS } from "../i18n/settings";

import { Suspense } from "react";
import Loading from "./Loading"
import Spinner from "./Spinner";

import { ArrowDownTrayIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

import xlsx, { IContent } from "json-as-xlsx"

const client = generateClient<Schema>()

type SurveyEntry = { [key: string]: string | number | boolean | React.ReactNode };

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [surveyData, setSurveyData] = useState<SurveyEntry[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const { t } = useTranslation(defaultNS, { keyPrefix: 'survey' })

  const exportExcel = () => {
    if (!isAuthenticated) return false;

    setIsDownloading(true);

    const content: IContent[] = surveyData as IContent[];

    const data = [
      {
        sheet: "Survey Entries",
        columns: headers.map((header) => ({ label: t(header as unknown as TemplateStringsArray), value: header })),
        content: content,
      },
    ];

    const settings = {
      fileName: "jardox_engagement_survey_2025"
    }

    xlsx(data, settings, () => {
      setTimeout(() => {
        setIsDownloading(false)
      }, 1000);      
    })
  }

  const fetchSurveyData = async () => {
    setIsLoading(true);
    try {
      const { data: surveyEntries }  = await client.models.SurveyEntry.list({
        authMode: "userPool"
      });
      if (surveyEntries.length) {
        setSurveyData(surveyEntries);
        const keys = Object.keys(surveyEntries[0]);
        setHeaders(keys);
      } else {
        setHeaders([]);
        setSurveyData([]);
      }
    } catch (err) {
      console.error('Error fetching survey data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
        await fetchSurveyData();
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const listener = (data: { payload: { event: string } }) => {
      const { event } = data.payload;
      if (event === 'signIn') {
        setIsAuthenticated(true);
        fetchSurveyData();
      } else if (event === 'signOut') {
        setIsAuthenticated(false);
        setSurveyData([]);
      }
    };

    Hub.listen('auth', listener);
  }, []);
  
  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl w-full space-y-12 mx-auto">
        <Authenticator hideSignUp={true}>
          {({ signOut }) => (
            <Suspense fallback={<Loading />}>
              {isLoading ? (
                <Loading />
              ) : surveyData.length > 0 && isAuthenticated ? (
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-end mb-10">
                    <button type="button" className="cursor-pointer flex justify-center items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-100" onClick={signOut}>
                      <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                      <span>Sign out</span>
                    </button>
                  </div>
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-2xl font-semibold text-gray-900">Survey Entries ({surveyData.length})</h1>
                      <p className="mt-2 text-sm text-gray-700">
                        A list of survey entries. Press export to download as an Excel file.
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 flex space-x-3">
                      <button
                        type="button"
                        onClick={exportExcel}
                        disabled={isDownloading}
                        className="cursor-pointer min-w-32 flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-600"
                      >
                        { isDownloading ? <Spinner /> :
                          <>
                            <ArrowDownTrayIcon className="h-3.5 w-3.5 mr-2" aria-hidden="true" />
                            <span>Download</span>
                          </>
                        }
                      </button>
                    </div>
                  </div>
                  <div className="mt-8 flow-root sm:px-6 lg:px-8">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              {headers.map((header) => (
                                <th
                                  key={header}
                                  scope="col"
                                  className="px-2 text-left text-sm font-semibold max-w-48 text-gray-900"
                                >
                                  <span className="block truncate">
                                  {t(header as unknown as TemplateStringsArray)}
                                  </span>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {surveyData.map((entry: SurveyEntry, index) => {
                              return (
                                <tr key={index} className="hover:bg-gray-100 even:bg-gray-50">
                                  {headers.map((header: string) =>  (
                                    <td key={header} className="px-2 py-2 text-sm whitespace-nowrap max-w-48 text-gray-900">
                                      <span className="block truncate">
                                        {entry[header]}
                                      </span>
                                    </td>
                                  ))}
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No survey entries found.</p>
              )}
            </Suspense>
          )}
        </Authenticator>
      </div>
    </div>
  )
}