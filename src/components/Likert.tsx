import { useState } from 'react'
import { useTranslation } from "react-i18next";
import { defaultNS } from "../i18n/settings";
import Statement from './Statement';


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Likert({ label, groupName }: { label: string, groupName: string}) {
  const { t } = useTranslation(defaultNS)
  const [radioValue, setRadioValue] = useState("likert");

  const changeSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  }

  const options = [
    {
      name: t('survey.strongly_agree'),
      value: t('survey.strongly_agree', { lng: 'en' })
    },
    {
      name: t('survey.agree'),
      value: t('survey.agree', { lng: 'en' })
    },
    {
      name: t('survey.neutral'),
      value: t('survey.neutral', { lng: 'en' })
    },
    {
      name: t('survey.disagree'),
      value: t('survey.disagree', { lng: 'en' })
    },
    {
      name: t('survey.strongly_disagree'),
      value: t('survey.strongly_disagree', { lng: 'en' })
    },
  ]

  return (
    <fieldset>
      <Statement text={label} />
      <div className="mt-4 flex flex-col md:flex-row justify-items-stretch content-stretch items-strecth gap-4 -ml-6">
        {options.map((option, index) => (
          <div key={index} className="md:basis-1/5 grow">
            <input
              value={option.value}
              name={groupName}
              type="radio"
              id={`${groupName}-${index}`}
              checked={radioValue === option.value}
              onChange={changeSelection}
              className='sr-only'
              aria-hidden="true"
              required
            />
            <label htmlFor={`${groupName}-${index}`} className={
                classNames(
                  "text-xs text-center flex h-full items-center justify-center rounded w-full cursor-pointer px-4 py-2 border border-gray-300 ring-offset-1 hover:bg-gray-100 active:ring-2 active:ring-indigo-600 select-none	",
                  (radioValue === option.value) ? 'bg-indigo-600 hover:bg-indigo-600 border-indigo-600 ring-indigo-600 ring-2 text-white' : ''
                )}
              >
              {option.name}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  )
}
