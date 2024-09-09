import Form from "../../components/form/Form";
import Button from "../../components/Button";
import InputText from "../../components/form/InputText";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useState } from "react";
import Select from "../../components/Select";

export default function Classrooms() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const {
    fields: classroomFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "classrooms",
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const classroomsOptions = classroomFields.map((classroom, index) => ({
    value: index,
    label: `${classroom.buildingName}-${classroom.classroomNumber}`,
  }));

  console.log(classroomsOptions);

  const handleAddClassroom = () => {
    append({ buildingName: "", classroomNumber: "", capacity: null });
    setCurrentIndex(classroomFields.length);
  };

  const handleClassroomPage = (e) => {
    const selectedIndex = parseInt(e.target.value, 10);
    setCurrentIndex(selectedIndex);
  };

  return (
    <Form
      title="STEP 3: 강의실 정보"
      prev="/timetable/professors"
      next="/timetable/classroomgroups"
    >
      {classroomFields.length > 0 && (
        <div
          key={classroomFields[currentIndex]?.id}
          className="mb-4 p-4 rounded border-2 border-base-300"
        >
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex flex-row justify-between items-center max-w-max my-2">
              <kbd className="kbd kbd-sm max-w-28 font-sans font-semibold bg-base-content text-base-200 px-4">
                {currentIndex + 1}번 강의실
              </kbd>
            </div>
            <div className="flex flex-row justify-center items-center">
              <label className="label cursor-pointer flex flex-col">
                <span className="label-text mb-2">일반 강의용</span>
                <input
                  type="radio"
                  name={`classrooms.${currentIndex}.usage`}
                  value="1"
                  className="radio checked:radio-primary"
                  {...register(`classrooms.${currentIndex}.usage`)}
                  defaultChecked={classroomFields[currentIndex].usage === 1} // 기본값 설정
                />
              </label>
              <label className="label cursor-pointer flex flex-col">
                <span className="label-text mb-2">대학원용</span>
                <input
                  type="radio"
                  name={`classrooms.${currentIndex}.usage`}
                  value="2"
                  className="radio checked:radio-primary"
                  {...register(`classrooms.${currentIndex}.usage`)}
                  defaultChecked={classroomFields[currentIndex].usage === 2} // 기본값 설정
                />
              </label>
              <label className="label cursor-pointer flex flex-col">
                <span className="label-text mb-2">일반 + 대학원</span>
                <input
                  type="radio"
                  name={`classrooms.${currentIndex}.usage`}
                  value="3"
                  className="radio checked:radio-primary"
                  {...register(`classrooms.${currentIndex}.usage`)}
                  defaultChecked={classroomFields[currentIndex].usage === 3} // 기본값 설정
                />
              </label>
            </div>
            <div className="flex justify-end">
              {classroomFields.length > 1 && (
                <Button
                  onClick={() => remove(currentIndex)}
                  style="btn-error btn-sm -mb-2"
                >
                  강의실 삭제
                </Button>
              )}
            </div>

            {/* 건물 이름 필드 */}
            <div className="w-full mb-4">
              <InputText
                {...register(`classrooms.${currentIndex}.buildingName`, {
                  required: "건물 이름을 입력해주세요.",
                })}
              >
                건물 이름 (ex: S4-1)
              </InputText>
              {errors?.classrooms?.[currentIndex]?.buildingName && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.classrooms[currentIndex].buildingName.message}
                </p>
              )}
            </div>

            {/* 강의실 번호 필드 */}
            <div className="w-full mb-4">
              <InputText
                {...register(`classrooms.${currentIndex}.classroomNumber`, {
                  required: "강의실 번호를 입력해주세요.",
                })}
              >
                강의실 번호 (ex: 101)
              </InputText>
              {errors?.classrooms?.[currentIndex]?.classroomNumber && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.classrooms[currentIndex].classroomNumber.message}
                </p>
              )}
            </div>

            {/* 수용 인원 필드 */}
            <div className="w-full mb-4">
              <InputText
                {...register(`classrooms.${currentIndex}.capacity`, {
                  required: "수용 인원을 입력해주세요.",
                  pattern: {
                    value: /^[0-9]+$/, // 숫자만 허용하는 정규식
                    message: "숫자만 입력해주세요.",
                  },
                  validate: (value) =>
                    parseInt(value, 10) > 0 ||
                    "수용 인원은 1 이상이어야 합니다.", // 최소 1 이상
                })}
              >
                수용 인원 (ex: 60)
              </InputText>
              {errors?.classrooms?.[currentIndex]?.capacity && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.classrooms[currentIndex].capacity.message}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 강의실 선택 및 추가 */}
      <Select
        style="select-bordered mt-0"
        options={classroomsOptions}
        onChange={handleClassroomPage}
      ></Select>
      <Button onClick={handleAddClassroom} style="mt-4">
        강의실 추가
      </Button>
    </Form>
  );
}
