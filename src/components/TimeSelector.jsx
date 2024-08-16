// 교수 off-time, hope-time용 컴포넌트
export default function TimeSelector({
  title,
  timeType,
  professor,
  index,
  weekdays,
  periodLabels,
  onToggleCell,
  onToggleAllDay,
}) {
  return (
    <div className="w-1/2 flex justify-center">
      <details className="dropdown mb-4 text-center">
        <summary className="btn btn-primary mb-4 min-w-40">{title}</summary>
        <div className="grid grid-cols-5 gap-4">
          {weekdays.map((day, dayIndex) => (
            <div key={dayIndex} className="flex flex-col">
              <div className="flex items-center justify-center mb-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    onToggleAllDay(index, timeType, day, e.target.checked)
                  }
                  className="checkbox mr-2"
                />
                <span className="font-semibold text-base-content">{day}</span>
              </div>
              {periodLabels.map((period, periodIndex) => (
                <div
                  key={periodIndex}
                  onClick={() => onToggleCell(index, timeType, day, period)}
                  className={`btn bg-base-100 w-full h-12 flex items-center justify-center cursor-pointer hover:bg-${
                    timeType === "offTimes" ? "error" : "success"
                  } my-1 ${
                    professor[timeType].some(
                      (t) => t.day === day && t.period === period
                    )
                      ? `bg-${timeType === "offTimes" ? "error" : "success"}`
                      : "bg-base-100"
                  }`}
                >
                  {period}
                </div>
              ))}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
