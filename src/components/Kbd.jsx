export default function Kbd({ children }, ...props) {
  return (
    <kbd className="kbd kbd-sm min-w-24 font-sans font-semibold bg-base-content text-base-200 max-h-1">
      {children}
    </kbd>
  );
}
