import { forwardRef } from "react";

const Select = forwardRef(function ({ style, children, options }, ref) {
  return (
    <select
      className={`select ${style} w-full max-w-xs text-base-content mt-2`}
      ref={ref}
    >
      <option disabled value="">
        {children}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

export default Select;
