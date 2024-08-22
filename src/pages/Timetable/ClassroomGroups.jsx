import { useState } from "react";
import Form from "../../components/form/Form";

export default function ClassroomGroups() {
  const classroomGroups = [
    { groupId: 1, groupName: "이론", classrooms: [] },
    { groupId: 2, groupName: "실습", classrooms: [] },
    { groupId: 3, groupName: "대형", classrooms: [] },
    { groupId: 4, groupName: "기타", classrooms: [] },
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
      let updatedSelected = [...prev];
      if (isChecked) {
        // 해당 그룹에서 선택된 경우, 다른 그룹의 선택을 모두 제거
        updatedSelected = updatedSelected.filter(
          (item) => item.classroomId !== classroomId
        );
        // 해당 그룹에 추가
        updatedSelected.push({ groupIndex, classroomId });
      } else {
        // 선택한 그룹에서 제거
        updatedSelected = updatedSelected.filter(
          (item) => item.classroomId !== classroomId
        );
      }
      return updatedSelected;
    });
  }

  const getClassroomState = (groupIndex, classroomId) => {
    const isCheckedInGroup = selectedClassrooms.some(
      (item) =>
        item.classroomId === classroomId && item.groupIndex === groupIndex
    );
    const isSelectedInOtherGroups = selectedClassrooms.some(
      (item) =>
        item.classroomId === classroomId && item.groupIndex !== groupIndex
    );

    return { isCheckedInGroup, isSelectedInOtherGroups };
  };

  return (
    <Form
      title="STEP 4: 강의실 그룹 정보"
      prev="/timetable/classrooms"
      next="/timetable/lectures"
    >
      {classroomGroups.map((group, groupIndex) => (
        <div
          key={group.groupId}
          tabIndex={0}
          className="collapse collapse-arrow mb-6 p-4 rounded border-2 border-base-300"
        >
          <input
            type="checkbox"
            id={`accordion-${group.groupId}`}
            className="peer appearance-none absolute"
          />
          <label
            htmlFor={`accordion-${group.groupId}`}
            className="collapse-title col-span-2 btn bg-base-content text-base-200 rounded font-sans font-bold cursor-pointer"
          >
            {group.groupName} 강의실
          </label>
          <div className="collapse-content px-0 peer-checked:block">
            <div className="form-control grid grid-cols-6 gap-x-20 mt-4">
              {classrooms.map((classroom) => {
                // Classroom Id 선언 (ex: S4-1-101) 건물명+강의실번호
                const classroomId = `${classroom.buildingName}-${classroom.classroomNumber}`;
                const { isCheckedInGroup, isSelectedInOtherGroups } =
                  getClassroomState(groupIndex, classroomId);

                return (
                  <label key={classroomId} className="cursor-pointer label">
                    <input
                      type="checkbox"
                      className={`checkbox checkbox-xs m-2 ${
                        isCheckedInGroup
                          ? "checkbox-success" // 해당 그룹에서 선택된 경우 초록색
                          : isSelectedInOtherGroups
                          ? "checkbox-error" // 다른 그룹에서 선택된 경우 빨간색
                          : "checkbox-neutral" // 선택되지 않은 경우 기본 색상
                      }`}
                      checked={isCheckedInGroup}
                      onChange={(e) =>
                        handleClassroomChange(
                          groupIndex,
                          classroomId,
                          e.target.checked
                        )
                      }
                    />
                    <span
                      className={`label-text text-sm ${
                        isCheckedInGroup
                          ? "text-success"
                          : isSelectedInOtherGroups
                          ? "text-error"
                          : ""
                      }`}
                    >
                      {classroom.buildingName}-{classroom.classroomNumber}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </Form>
  );
}
