import { useState } from "react";
import Form from "../../components/form/Form";
import Button from "../../components/Button";
import Toggle from "../../components/Toggle";
import Kbd from "../../components/Kbd";
import TimeSelector from "../../components/TimeSelector";
import InputText from "../../components/form/InputText";

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

  const onToggleCell = (index, timeType, day, period) => {
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

  const onToggleAllDay = (index, timeType, day, checked) => {
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
    <Form
      title="STEP 2: 전임교원 정보"
      prev="/timetable"
      next="/timetable/classrooms"
    >
      {professors.map((professor, index) => (
        <div key={index} className="mb-4 p-4 rounded border-2 border-base-300">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-row justify-between items-center col-span-2 max-w-max">
              <Kbd>{index + 1}번 교수</Kbd>
              <Toggle>강사 여부 체크</Toggle>
            </div>
            <InputText
              index={index}
              name="professorName"
              onChange={(e) => handleProfessorChange(index, e)}
            >
              교수 이름 (ex: 남재홍)
            </InputText>
            <InputText
              index={index}
              name="professorCode"
              onChange={(e) => handleProfessorChange(index, e)}
            >
              교수 코드 (ex: P-001)
            </InputText>
          </div>

          <div className="flex">
            <TimeSelector
              title="강의 불가능한 시간 설정"
              timeType="offTimes"
              professor={professor}
              index={index}
              weekdays={weekdays}
              periodLabels={periodLabels}
              onToggleCell={onToggleCell}
              onToggleAllDay={onToggleAllDay}
            />
            <TimeSelector
              title="선호 시간 설정"
              timeType="hopeTimes"
              professor={professor}
              index={index}
              weekdays={weekdays}
              periodLabels={periodLabels}
              onToggleCell={onToggleCell}
              onToggleAllDay={onToggleAllDay}
            />
          </div>
          {professors.length > 1 && (
            <Button
              onClick={(event) => removeProfessor(event, index)}
              style="error"
            >
              교수 삭제
            </Button>
          )}
        </div>
      ))}
      <Button onClick={addProfessor} style="">
        교수 추가
      </Button>
    </Form>
  );
}
