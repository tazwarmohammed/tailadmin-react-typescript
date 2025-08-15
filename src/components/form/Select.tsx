import { useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
  value?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  value,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(value ?? defaultValue);

  useEffect(() => {
    if (value !== undefined) setSelectedValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    setSelectedValue(v);
    onChange(v);
  };

  return (
    <div className="relative focus-within:[&>svg]:-rotate-180">
      <select
        className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-8 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 ${
          selectedValue ? "text-gray-800" : "text-gray-400"
        } ${className}`}
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="" disabled className="text-gray-700">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-gray-700">
            {option.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
      </svg>
    </div>
  );
};

export default Select;
