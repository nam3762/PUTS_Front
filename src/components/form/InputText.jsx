// 기본적으로 input text를 위해 만든 컴포넌트

export default function InputText({ index, name, onChange, children }) {
  return (
    <label
      className="input input-bordered text-base-content flex items-center gap-2 mt-2"
      htmlFor={name}
    >
      <input
        type="text"
        id={`${name}-${index}`}
        name={name}
        onChange={onChange}
        placeholder={children}
        className="grow"
      />
    </label>
  );
}
