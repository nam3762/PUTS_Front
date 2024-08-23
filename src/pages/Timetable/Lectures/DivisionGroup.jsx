import { forwardRef } from "react";
import Button from "../../../components/Button";
import InputText from "../../../components/form/InputText";
import Select from "../../../components/Select";
import Tooltip from "../../../components/Tooltip";
import { useFieldArray, useFormContext } from "react-hook-form";

// DivisionGroup 컴포넌트
const DivisionGroup = forwardRef(function ({ control, currentIndex }, ref) {
  const { register, getValues } = useFormContext();
  const {
    fields: divisionFields,
    append: appendDivision,
    remove: removeDivision,
  } = useFieldArray({
    control,
    name: `lectures.${currentIndex}.divisionGroup`,
  });

  const professors = getValues("professors");

  // Convert professors array to options for Select component
  const professorOptions = professors.map((professor) => ({
    value: professor.professorCode,
    label: `${professor.professorName}-${professor.professorCode}`,
  }));

  return (
    <>
      {divisionFields.map((division, divisionIndex) => (
        <div
          key={division.id}
          className="grid grid-cols-5 gap-4 my-6 p-4 rounded border-2 border-base-300"
        >
          <kbd className="kbd kbd-sm max-w-40 min-w-40 font-sans font-semibold bg-base-content text-base-200 max-h-1 px-4 mt-2">
            {currentIndex + 1}번 강의: {divisionIndex + 1}번 분반
          </kbd>
          <div className="flex items-end col-span-2">
            <Tooltip>
              {`한번 강의할 때 몇 시간 강의할지 결정합니다.
                총 4시간 강의일 때 → (0, 4) or (1, 3) or (2, 2)
                ※ 미 입력 칸은 0으로 처리합니다.`}
            </Tooltip>
          </div>
          <div className="flex items-end">
            <Tooltip>
              {`수강 인원과 강의실 수용 인원에 맞춰
                강의를 배정합니다.`}
            </Tooltip>
          </div>
          <div className="flex justify-end">
            {divisionFields.length > 1 && (
              <Button
                style="btn-error btn-sm -mb-2"
                onClick={() => removeDivision(divisionIndex)}
              >
                분반 삭제
              </Button>
            )}
          </div>
          <InputText
            {...register(
              `lectures.${currentIndex}.divisionGroup.${divisionIndex}.divisionName`
            )}
          >
            분반 구분 (ex: 1 or A)
          </InputText>
          <div className="grid grid-cols-2 col-span-2 gap-4 rounded">
            <InputText
              {...register(
                `lectures.${currentIndex}.divisionGroup.${divisionIndex}.sectionGroup.0.sectionTime`
              )}
              style="text-sm input-primary"
            >
              강의 시간 분리 (ex: 1)
            </InputText>
            <InputText
              {...register(
                `lectures.${currentIndex}.divisionGroup.${divisionIndex}.sectionGroup.1.sectionTime`
              )}
              style="text-sm input-primary"
            >
              강의 시간 분리 (ex: 1)
            </InputText>
          </div>
          <InputText
            {...register(
              `lectures.${currentIndex}.divisionGroup.${divisionIndex}.capacity`
            )}
          >
            수강 인원 (ex: 40)
          </InputText>
          <Select
            style="select-bordered"
            {...register(
              `lectures.${currentIndex}.divisionGroup.${divisionIndex}.professor`
            )}
            options={professorOptions} // Pass the professor options here
          >
            전임교원 선택
          </Select>
          <Button
            style="mb-0"
            onClick={() =>
              appendDivision({
                divisionName: "",
                sectionGroup: [],
                capacity: null,
                professor: "",
              })
            }
          >
            분반 추가
          </Button>
        </div>
      ))}
    </>
  );
});

export default DivisionGroup;
