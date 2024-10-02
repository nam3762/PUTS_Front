import Form from "../../components/form/Form";
import { useFormContext, useFieldArray } from "react-hook-form";

export default function ClassroomGroups() {
  const { control, register, getValues, watch, setValue } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: "classroomGroups",
  });

  const classroomGroups = watch("classroomGroups");
  const classrooms = getValues("classrooms");

  function handleClassroomChange(groupIndex, classroomId, isChecked) {
    setValue(
      "classroomGroups",
      classroomGroups.map((group, index) => {
        if (index === groupIndex) {
          // 현재 그룹에서 강의실 선택/해제
          return {
            ...group,
            classrooms: isChecked
              ? [...(group.classrooms || []), classroomId]
              : (group.classrooms || []).filter((id) => id !== classroomId),
          };
        }
        // 선택된 강의실이 다른 그룹에 포함된 경우 제거
        return {
          ...group,
          classrooms: (group.classrooms || []).filter(
            (id) => id !== classroomId
          ),
        };
      })
    );
  }

  const getClassroomState = (groupIndex, classroomId) => {
    const isCheckedInGroup =
      classroomGroups[groupIndex]?.classrooms?.includes(classroomId);
    const isSelectedInOtherGroups = classroomGroups.some(
      (group, index) =>
        index !== groupIndex && group.classrooms?.includes(classroomId)
    );

    return { isCheckedInGroup, isSelectedInOtherGroups };
  };

  return (
    <Form
      title="STEP 4: 강의실 그룹 정보"
      prev="/timetable/classrooms"
      next="/timetable/lectures"
    >
      {fields.map((group, index) => (
        <div
          key={group.id}
          tabIndex={0}
          className="collapse collapse-arrow collapse-open mt-2 mb-6 p-4 rounded border-2 border-base-300"
        >
          <input type="checkbox" className="appearance-none absolute" />
          <label
            htmlFor="group.groupName"
            className="collapse-title col-span-2 btn bg-base-content text-base-200 rounded font-sans font-bold cursor-pointer"
          >
            {group.groupName} 강의실
          </label>
          <div className="collapse-content px-0 peer-checked:block">
            <div className="form-control grid grid-cols-6 gap-x-20 mt-4">
              {classrooms.map((classroom) => {
                const classroomId =
                  classroom.buildingName + "-" + classroom.classroomNumber;
                const { isCheckedInGroup, isSelectedInOtherGroups } =
                  getClassroomState(index, classroomId);
                return (
                  <label key={classroomId} className="cursor-pointer label">
                    <input
                      {...register(`classroomGroups.${index}.classrooms`)}
                      type="checkbox"
                      value={classroomId}
                      className={`checkbox checkbox-xs m-2 ${
                        isCheckedInGroup
                          ? "checkbox-success"
                          : isSelectedInOtherGroups
                          ? "checkbox-error"
                          : "checkbox-neutral"
                      }`}
                      checked={isCheckedInGroup}
                      onChange={(e) =>
                        handleClassroomChange(
                          index,
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
