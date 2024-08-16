import { useState } from "react";
import Form from "../../components/form/Form";
import Button from "../../components/Button";
import InputText from "../../components/form/InputText";

export default function Classrooms() {
  const [classrooms, setClassrooms] = useState([
    {
      buildingName: "",
      classroomNumber: "",
      capacity: null,
    },
  ]);

  const handleClassroomChange = (index, event) => {
    const { name, value, checked, type } = event.target;
    setClassrooms((prevClassrooms) => {
      const newClassrooms = [...prevClassrooms];
      if (type === "checkbox") {
        newClassrooms[index][name] = checked;
      } else {
        newClassrooms[index][name] = value;
      }
      return newClassrooms;
    });
  };

  const addClassroom = (event) => {
    event.preventDefault();
    setClassrooms((prevClassrooms) => [
      ...prevClassrooms,
      {
        buildingName: "",
        classroomNumber: "",
        capacity: null,
      },
    ]);
  };

  const removeClassroom = (event, index) => {
    event.preventDefault();
    setClassrooms((prevClassrooms) => {
      // Filter out the professor at the given index
      return prevClassrooms.filter((_, i) => i !== index);
    });
  };

  return (
    <Form
      title="STEP 3: 강의실 정보"
      prev="/timetable/professors"
      next="/timetable/classroomgroups"
    >
      {classrooms.map((classroom, index) => (
        <div key={index} className="mb-4 p-4 rounded border-2 border-base-300">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <kbd className="kbd kbd-sm col-span-3 max-w-24 font-sans font-semibold bg-base-content text-base-200 max-h-1 px-4">
              {index + 1}번 강의
            </kbd>
            <InputText
              index={index}
              name="buildingName"
              onChange={(e) => handleClassroomChange(index, e)}
            >
              건물 이름 (ex: S4-1)
            </InputText>
            <InputText
              index={index}
              name="classroomNumber"
              onChange={(e) => handleClassroomChange(index, e)}
            >
              강의실 번호 (ex: 101)
            </InputText>
            <InputText
              index={index}
              name="capacity"
              onChange={(e) => handleClassroomChange(index, e)}
            >
              수용 인원 (ex: 60)
            </InputText>
          </div>
          {classrooms.length > 1 && (
            <Button
              onClick={(event) => removeClassroom(event, index)}
              style="error"
            >
              강의실 삭제
            </Button>
          )}
        </div>
      ))}
      <Button onClick={addClassroom} style="">
        강의실 추가
      </Button>
    </Form>
  );
}
