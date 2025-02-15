import { ChangeEventHandler } from "react"

type Option = {
  name: string,
  value: string
}

export default function Select({ label, groupName, options, stateChange }: { label: string, groupName: string, options: Option[], stateChange?: ChangeEventHandler  }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold leading-6 text-gray-900">{label}</legend>
      <div className="mt-6 gap-3 grid md:grid-cols-2">
        {options && options.map((option, index) => {
          return (
            <div className="flex items-center gap-x-3" key={index}>
              <input
                id={`${groupName}-${index}`}
                name={groupName}
                type="radio"
                onChange={stateChange}
                className="size-5 border-gray-300 text-indigo-600 active:ring-indigo-600"
                value={option.value}
                required
              />
              <label htmlFor={`${groupName}-${index}`} className="block w-full cursor-pointer text-sm font-light leading-6 text-gray-900">
                {option.name}
              </label>
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}