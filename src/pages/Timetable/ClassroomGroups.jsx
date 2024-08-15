import { useState } from "react";
import PrevNextButton from "../../components/PrevNextButton";

export default function ClassroomGroups() {
  const classroomGroups = [
    { id: 1, groupName: "이론", classrooms: ["S4-1-101"] },
    { id: 2, groupName: "실습", classrooms: ["S4-1-201"] },
    { id: 3, groupName: "대형", classrooms: ["E8-7-101"] },
    { id: 4, groupName: "기타", classrooms: ["S4-1-301"] },
  ];

  const classrooms = [
    {
      buildingName: "S4-1",
      classroomNumber: "101",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "102",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "103",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "104",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "106",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "201",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "202",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "203",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "205",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "206",
      capacity: 60,
    },
    {
      buildingName: "E8-7",
      classroomNumber: "101",
      capacity: 100,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "301",
      capacity: 40,
    },
  ];

  const [selectedClassrooms, setSelectedClassrooms] = useState([]);

  function handleClassroomChange(groupIndex, classroomId, isChecked) {
    setSelectedClassrooms((prev) => {
      const updatedSelected = [...prev];
      if (isChecked) {
        updatedSelected.push(classroomId);
      } else {
        const index = updatedSelected.indexOf(classroomId);
        if (index > -1) {
          updatedSelected.splice(index, 1);
        }
      }
      return updatedSelected;
    });
  }

  // 선택된 상태를 관리하는 배열(selectedClassrooms)안에 클릭한 classroomId가 존재하는지 확인하는 함수
  const isClassroomDisabled = (classroomId) => {
    return selectedClassrooms.includes(classroomId);
  };

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-base-200">
      <form className="form-control p-6 bg-gray-600 shadow-lg rounded-lg my-5 mr-5">
        <h2 className="text-2xl font-bold mb-4 text-left">
          STEP 4: 강의실 그룹 정보
        </h2>
        {classroomGroups.map((group, groupIndex) => (
          <div
            key={group.id}
            tabIndex={0}
            className="collapse collapse-arrow mb-6 p-4 rounded-lg border-2 border-gray-300"
          >
            <input
              type="checkbox"
              id={`accordion-${group.id}`}
              className="peer appearance-none absolute"
            />
            <label
              htmlFor={`accordion-${group.id}`}
              className="collapse-title kbd kbd-sm col-span-2 font-sans font-semibold bg-yellow-300 text-base-300 cursor-pointer"
            >
              {group.groupName} 강의실
            </label>
            <div className="collapse-content px-0 peer-checked:block">
              <div className="grid grid-cols-2 gap-4 mb-4"></div>
              <div className="form-control grid grid-cols-4 gap-x-12">
                {classrooms.map((classroom) => {
                  // Classroom Id 선언 (ex: S4-1-101) 건물명+강의실번호
                  const classroomId = `${classroom.buildingName}-${classroom.classroomNumber}`;

                  // 강의실 Id가 그룹 내에 포함되어있는지 확인
                  const isChecked = group.classrooms.includes(classroomId);

                  // 강의실이 선택됐거나 그룹 내 포함이 안 되어있으면
                  // 선택되면 true, 그룹 내 포함 안되면 true
                  const isDisabled =
                    isClassroomDisabled(classroomId) && !isChecked;

                  return (
                    <label key={classroomId} className="cursor-pointer label">
                      <input
                        type="checkbox"
                        className={`checkbox checkbox-success checkbox-xs m-2 ${
                          isDisabled ? "checkbox-error" : ""
                        }`}
                        checked={isChecked}
                        onChange={(e) =>
                          handleClassroomChange(
                            groupIndex,
                            classroomId,
                            e.target.checked
                          )
                        }
                      />
                      <span className="label-text text-sm">
                        {classroom.buildingName}-{classroom.classroomNumber}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
        <PrevNextButton
          prev="/timetable/classrooms"
          next="/timetable/lectures"
        />
      </form>
    </div>
  );
}
