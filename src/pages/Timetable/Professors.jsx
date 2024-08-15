import { useState } from "react";
import PrevNextButton from "../../components/PrevNextButton";

const weekdays = ["월요일", "화요일", "수요일", "목요일", "금요일"];
const periodLabels = Array.from({ length: 9 }, (_, i) => `${i + 1}교시`);

// STEP 2: 교수 정보 입력
export default function Professors() {
  const [professors, setProfessors] = useState([
    {
      professorName: "",
      professorCode: "",
      isProfessor: true,
      offTimes: [],
      hopeTimes: [],
    },
  ]);

  const handleProfessorChange = (index, event) => {
    const { name, value, checked, type } = event.target;
    setProfessors((prevProfessors) => {
      const newProfessors = [...prevProfessors];
      if (type === "checkbox") {
        newProfessors[index][name] = checked;
      } else {
        newProfessors[index][name] = value;
      }
      return newProfessors;
    });
  };

  const toggleCell = (index, timeType, day, period) => {
    const newProfessors = [...professors];
    const currentTimes = newProfessors[index][timeType];
    const time = { day, period };

    if (currentTimes.some((t) => t.day === day && t.period === period)) {
      newProfessors[index][timeType] = currentTimes.filter(
        (t) => !(t.day === day && t.period === period)
      );
    } else {
      newProfessors[index][timeType] = [...currentTimes, time];
    }

    setProfessors(newProfessors);
  };

  const toggleAllDay = (index, timeType, day, checked) => {
    setProfessors((prevProfessors) => {
      const newProfessors = [...prevProfessors];
      if (checked) {
        periodLabels.forEach((period) => {
          const time = { day, period };
          if (
            !newProfessors[index][timeType].some(
              (t) => t.day === day && t.period === period
            )
          ) {
            newProfessors[index][timeType].push(time);
          }
        });
      } else {
        newProfessors[index][timeType] = newProfessors[index][timeType].filter(
          (t) => t.day !== day
        );
      }
      return newProfessors;
    });
  };

  const addProfessor = (event) => {
    event.preventDefault();
    setProfessors((prevProfessors) => [
      ...prevProfessors,
      {
        professorName: "",
        professorCode: "",
        isProfessor: true,
        offTimes: [],
        hopeTimes: [],
      },
    ]);
  };

  const removeProfessor = (event, index) => {
    event.preventDefault();
    setProfessors((prevProfessors) => {
      // Filter out the professor at the given index
      return prevProfessors.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-base-200">
      <form className="form-control p-6 bg-base-100 shadow-lg rounded w-full my-5 mr-5">
        <h2 className="text-2xl font-bold mb-4 text-left text-base-content">
          STEP 2: 교수 정보
        </h2>
        {professors.map((professor, index) => (
          <div
            key={index}
            className="mb-6 p-4 rounded border-2 border-base-300"
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-row justify-between items-center col-span-2 max-w-max">
                <kbd className="kbd kbd-sm min-w-24 font-sans font-semibold bg-base-content text-base-100 max-h-1">
                  {index + 1}번 교수
                </kbd>
                <div className="form-control rounded min-w-40">
                  <label className="label cursor-pointer">
                    <span className="label-text text-base-content font-bold px-4">
                      강사 여부 체크
                    </span>
                    <input type="checkbox" className="toggle" />
                  </label>
                </div>
              </div>
              <input
                type="text"
                id={`professorName-${index}`}
                name="professorName"
                value={professor.professorName}
                onChange={(e) => handleProfessorChange(index, e)}
                placeholder="교수 이름 (ex: 남재홍)"
                className="input input-bordered flex items-center w-full text-base-content"
              />
              <input
                type="text"
                id={`professorCode-${index}`}
                name="professorCode"
                value={professor.professorCode}
                onChange={(e) => handleProfessorChange(index, e)}
                placeholder="교수 코드 (ex: P-001)"
                className="input input-bordered flex items-center w-full text-base-content"
              />
            </div>

            <div className="flex">
              <div className="w-1/2 flex justify-center">
                <details className="dropdown mb-4 text-center">
                  <summary className="btn btn-primary text-base-100 mb-4 min-w-40">
                    강의 불가능한 시간 설정
                  </summary>
                  <div className="grid grid-cols-5 gap-4">
                    {weekdays.map((day, dayIndex) => (
                      <div key={dayIndex} className="flex flex-col">
                        <div className="flex items-center justify-center mb-2">
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              toggleAllDay(
                                index,
                                "offTimes",
                                day,
                                e.target.checked
                              )
                            }
                            className="checkbox mr-2"
                          />
                          <span className="font-semibold text-base-content">
                            {day}
                          </span>
                        </div>
                        {periodLabels.map((period, periodIndex) => (
                          <div
                            key={periodIndex}
                            onClick={() =>
                              toggleCell(index, "offTimes", day, period)
                            }
                            className={`btn bg-base-100 w-full h-12 flex items-center justify-center cursor-pointer
                                hover:bg-error my-1 ${
                                  professor.offTimes.some(
                                    (t) => t.day === day && t.period === period
                                  )
                                    ? "bg-error text-base-100"
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
              <div className="w-1/2 pl-2 flex justify-center">
                <details className="dropdown mb-4 text-center">
                  <summary className="btn btn-primary text-base-100 mb-4 min-w-40">
                    선호 시간 설정
                  </summary>
                  <div className="grid grid-cols-5 gap-4">
                    {weekdays.map((day, dayIndex) => (
                      <div key={dayIndex} className="flex flex-col">
                        <div className="flex items-center justify-center mb-2">
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              toggleAllDay(
                                index,
                                "hopeTimes",
                                day,
                                e.target.checked
                              )
                            }
                            className="checkbox mr-2"
                          />
                          <span className="font-semibold text-base-content">
                            {day}
                          </span>
                        </div>
                        {periodLabels.map((period, periodIndex) => (
                          <div
                            key={periodIndex}
                            onClick={() =>
                              toggleCell(index, "hopeTimes", day, period)
                            }
                            className={`btn bg-base-100 w-full h-12 flex items-center justify-center cursor-pointer
                                hover:bg-success my-1 ${
                                  professor.hopeTimes.some(
                                    (t) => t.day === day && t.period === period
                                  )
                                    ? "bg-success text-base-100"
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
            </div>
            {professors.length > 1 && (
              <button
                onClick={(event) => removeProfessor(event, index)}
                className="btn py-2 px-4 mb-4 max-w-28"
              >
                교수 삭제
              </button>
            )}
          </div>
        ))}

        <button onClick={addProfessor} className="btn mb-4 max-w-28">
          교수 추가
        </button>
        {/* Submit Button */}
        <PrevNextButton prev="/timetable" next="/timetable/classrooms" />
      </form>
    </div>
  );
}
