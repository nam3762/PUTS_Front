export default function Tooltip({ children }) {
  return (
    <div className="tooltip ml-2" data-tip={children}>
      <span className="btn btn-xs btn-circle text-sm h-5 w-5">?</span>
    </div>
  );
}
