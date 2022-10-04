import React from "react";

interface IInputText {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputText({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
}: IInputText) {
  return (
    <div className="mb-3">
      <label
        htmlFor={`form-cus-${name}`}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        id={`form-cus-${name}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="block w-full rounded-lg border p-2 text-sm text-gray-900 focus:border-amber-400 border-gray-300 bg-gray-50"
      />
    </div>
  );
}

InputText.defaultProps = {
  type: "text",
  placeholder: "",
  value: "",
  onChange: () => {},
};

export default InputText;
