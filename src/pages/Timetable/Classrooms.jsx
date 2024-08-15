import { useState } from "react";
import PrevNextButton from "../../components/PrevNextButton";

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
    <div className="flex flex-1 items-center justify-center min-h-screen bg-base-200">
      <form className="form-control p-6 bg-gray-600 shadow-lg rounded-lg my-5 mr-5">
        <h2 className="text-2xl font-bold mb-4 text-left">
          STEP 3: 강의실 정보
        </h2>
        {classrooms.map((classroom, index) => (
          <div
            key={index}
            className="mb-6 p-4 rounded-lg border-2 border-gray-300"
          >
            <div className="grid grid-cols-3 gap-4 mb-4">
              <kbd className="kbd kbd-sm col-span-3 max-w-24 font-sans font-semibold bg-yellow-300 text-base-300 max-h-1 px-4">
                {index + 1}번 강의
              </kbd>
              <input
                type="text"
                id={`buildingName-${index}`}
                name="buildingName"
                value={classroom.buildingName}
                onChange={(e) => handleClassroomChange(index, e)}
                placeholder="건물 이름 (ex: S4-1)"
                className="input input-bordered flex items-center w-full"
              />
              <input
                type="text"
                id={`classroomNumber-${index}`}
                name="classroomNumber"
                value={classroom.classroomNumber}
                onChange={(e) => handleClassroomChange(index, e)}
                placeholder="강의실 번호 (ex: 101)"
                className="input input-bordered flex items-center w-full"
              />
              <input
                type="text"
                id={`capacity-${index}`}
                name="capacity"
                value={classroom.capacity}
                onChange={(e) => handleClassroomChange(index, e)}
                placeholder="수용 인원 (ex: 60)"
                className="input input-bordered flex items-center w-full"
              />
            </div>
            {classrooms.length > 1 && (
              <button
                onClick={(event) => removeClassroom(event, index)}
                className="btn btn-error py-2 px-4 mb-4 max-w-28"
              >
                강의실 삭제
              </button>
            )}
          </div>
        ))}
        <button onClick={addClassroom} className="btn btn-accent mb-4 max-w-28">
          강의실 추가
        </button>
        <PrevNextButton
          prev="/timetable/professors"
          next="/timetable/classroomgroups"
        />
      </form>
    </div>
  );
}
