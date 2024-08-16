export default function Toggle({ children }) {
  return (
    <div className="form-control rounded min-w-40">
      <label className="label cursor-pointer">
        <span className="label-text text-base-content font-bold px-4">
          {children}
        </span>
        <input type="checkbox" className="toggle" />
      </label>
    </div>
  );
}
