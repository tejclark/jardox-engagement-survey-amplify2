import { useState } from 'react'
import { useTranslation } from "react-i18next";
import { defaultNS } from "../i18n/settings";
import { useNavigate } from "react-router-dom";

import Select from "./Select";
import Likert from "./Likert";
import SectionTitle from "./SectionTitle";
import Comments from "./Comments";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Spinner from './Spinner';

import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>()

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

async function putData(formData: object) {
  return await client.models.SurveyEntry.create(formData);

}

export default function Survey() {
  const [radioValue, setRadioValue] = useState("handle_food");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);

    const jsonObject: Record<string, string> = {};

    formData.forEach((value: FormDataEntryValue, key) => {
      jsonObject[key] = value.toString()
    });

    try {
      putData(jsonObject);
      
      setTimeout(() => {
        setLoading(false);
        navigate("/submitted")
      }, 1000)
    }
    catch (error) {
      console.log('Error submiting form: ' + error);
    }
  }

  const { t } = useTranslation(defaultNS)
  return (
    <form onSubmit={onSubmit}>
      <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-3xl w-full space-y-12 mx-auto">
          {/* About your role section */}
          <div className="border-b border-gray-900/10 pb-12 w-full">
            <SectionTitle text={t('survey.about_your_role')} />
            <div className="mt-10 space-y-10">
              <Select label={t('survey.site')} groupName="site" options={
                [
                  {
                    name: t('survey.sevenoaks'),
                    value: t('survey.sevenoaks', { lng: 'en' })
                  },
                  {
                    name: t('survey.wincanton'),
                    value: t('survey.wincanton', { lng: 'en' })
                  }
                ]
              } />

              <Select label={t('survey.department')} groupName="department" options={
                [
                  {
                    name: t('survey.factory'),
                    value: t('survey.factory', { lng: 'en' })
                  },
                  {
                    name: t('survey.customer_service'),
                    value: t('survey.customer_service', { lng: 'en' })
                  },
                  {
                    name: t('survey.warehouse'),
                    value: t('survey.warehouse', { lng: 'en' })
                  },
                  {
                    name: t('survey.planning'),
                    value: t('survey.planning', { lng: 'en' })
                  },
                  {
                    name: t('survey.quality'),
                    value: t('survey.quality', { lng: 'en' })
                  },
                  {
                    name: t('survey.npd'),
                    value: t('survey.npd', { lng: 'en' })
                  }
                ]
              } />

              <Select label={t('survey.handle_food')} groupName="handle_food" options={
                [
                  {
                    name: t('survey.yes'),
                    value: t('survey.yes', { lng: 'en' })
                  },
                  {
                    name: t('survey.no'),
                    value: t('survey.no', { lng: 'en' })
                  }
                ]
              } stateChange={changeSelection}/>
            </div>
          </div>

          {/* Statements */}
          <div className="border-b border-gray-900/10 pb-12 w-full">
            <SectionTitle text={t('survey.statements')} />
            <ol className="mt-10 space-y-10 list-decimal pl-6">
              <li>
                <Likert label={t('survey.expected_of_me')} groupName="expected_of_me" />
              </li>
              <li>
                <Likert label={t('survey.materials_needed')} groupName="materials_needed" />
              </li>
              <li>
                <Likert label={t('survey.opportunity_best')} groupName="opportunity_best" />
              </li>
              <li>
                <Likert label={t('survey.receive_recognition')} groupName="receive_recognition" />
              </li>
              <li>
                <Likert label={t('survey.supervisor_cares')} groupName="supervisor_cares" />
              </li>
              <li>
                <Likert label={t('survey.encourages_development')} groupName="encourages_development" />
              </li>
              <li>
                <Likert label={t('survey.opinions_count')} groupName="opinions_count" />
              </li>
              <li>
                <Likert label={t('survey.job_important')} groupName="job_important" />
              </li>
              <li>
                <Likert label={t('survey.quality_work')} groupName="quality_work" />
              </li>
              <li>
                <Likert label={t('survey.good_friend')} groupName="good_friend" />
              </li>
              <li>
                <Likert label={t('survey.progress_check')} groupName="progress_check" />
              </li>
              <li>
                <Likert label={t('survey.learn_and_grow')} groupName="learn_and_grow" />
              </li>
              <li>
                <Likert label={t('survey.opportunities_to_grow')} groupName="opportunities_to_grow" />
              </li>
              <li>
                <Likert label={t('survey.paid_rewarded')} groupName="paid_rewarded" />
              </li>
              <li>
                <Likert label={t('survey.happy_facilities')} groupName="happy_facilities" />
              </li>
              <li>
                <Likert label={t('survey.recommend_jardox')} groupName="recommend_jardox" />
              </li>
            </ol>
          </div>

          {/* Handle food */}
          <div className={classNames(
              "border-b border-gray-900/10 pb-12 w-full",
              radioValue === "Yes" ? 'block' : 'hidden'
            )}>
            <SectionTitle text={t('survey.handle_food_statements')} />
            <ol className="mt-10 space-y-10 list-decimal pl-6">
              <li>
                {radioValue === "Yes" ? <Likert label={t('survey.good_food_safety')} groupName="good_food_safety" /> : '' }
              </li>
              <li>
                {radioValue === "Yes" ? <Likert label={t('survey.good_food_safety_job_done')} groupName="good_food_safety_job_done" /> : '' }
              </li>
              <li>
                {radioValue === "Yes" ? <Likert label={t('survey.jardox_safety_standards')} groupName="jardox_safety_standards" /> : '' }
              </li>
              <li>
                {radioValue === "Yes" ? <Likert label={t('survey.improvements_food_safety')} groupName="improvements_food_safety" /> : '' }
              </li>
              <li>
                {radioValue === "Yes" ? <Likert label={t('survey.food_safety_seriously')} groupName="food_safety_seriously" /> : '' }
              </li>
              <li>
                {radioValue === "Yes" ? <Likert label={t('survey.understand_food_safety')} groupName="understand_food_safety" /> : '' }
              </li>
              <li>
                {radioValue === "Yes" ? <Likert label={t('survey.food_audits')} groupName="food_audits" /> : '' }
              </li>
            </ol>
          </div>

          {/* Comments */}
          <div className="border-b border-gray-900/10 pb-12 w-full">
            <Comments text={t('survey.comments')} />
          </div>

          {/* Submit */}

          <div>
          <button
              type="submit"
              disabled={loading}
              className="hover:cursor-pointer disabled:cursor-none flex w-full justify-center items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:ring-2 ring-offset-1 active:ring-indigo-600 disabled:bg-gray-600"
            >
              { loading ? <Spinner /> :
              <>
                <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                {t('survey.submit')}
              </>
              }
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}