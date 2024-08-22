import { forwardRef } from "react";

const Toggle = forwardRef(function ({ children, checked, onChange }, ref) {
  return (
    <div className="form-control rounded min-w-40">
      <label className="label cursor-pointer">
        <span className="label-text text-base-content font-bold px-4">
          {children}
        </span>
        <input
          type="checkbox"
          className="toggle"
          checked={checked}
          onChange={onChange}
        />
      </label>
    </div>
  );
});

export default Toggle;
