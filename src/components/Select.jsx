export default function Select({ style, children }) {
  return (
    <select
      className={`select ${style} w-full max-w-xs text-base-content mt-2`}
    >
      <option disabled selected>
        {children}
      </option>
      <option>Svelte</option>
      <option>Vue</option>
      <option>React</option>
    </select>
  );
}
