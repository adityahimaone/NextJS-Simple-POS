import React from "react";

import { IOption } from "@/utils/Types";

interface IInputSelect {
  name: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: IOption[];
}
function InputSelect({ name, label, value, onChange, options }: IInputSelect) {
  return (
    <div className="mb-3">
      <label
        htmlFor={`form-cus-${name}`}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        id={`form-cus-${name}`}
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full rounded-lg border p-2 text-sm text-gray-900 focus:border-amber-400 border-gray-300 bg-gray-50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

InputSelect.defaultProps = {
  value: "",
  onChange: () => {},
};

export default InputSelect;
