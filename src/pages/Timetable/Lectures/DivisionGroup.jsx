import { forwardRef, useState } from "react";
import Button from "../../../components/Button";
import InputText from "../../../components/form/InputText";
import Select from "../../../components/Select";
import Tooltip from "../../../components/Tooltip";
import { useFieldArray, useFormContext } from "react-hook-form";

// DivisionGroup 컴포넌트
const DivisionGroup = forwardRef(function (
  { control, currentIndex, isGradForm },
  ref
) {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();
  const {
    fields: divisionFields,
    append: appendDivision,
    remove: removeDivision,
  } = useFieldArray({
    control,
    name: `lectures.${currentIndex}.divisionGroup`,
  });

  const [activeDivisionIndex, setActiveDivisionIndex] = useState(0); // 현재 선택된 분반 인덱스 상태

  const professors = getValues("professors");

  // 교수 목록을 select 옵션으로 변환
  const professorOptions = professors.map((professor) => ({
    value: professor.professorCode,
    label: `${professor.professorName}-${professor.professorCode}`,
  }));

  // 분반 삭제 시 로직: 삭제 후 다른 분반을 표시
  function handleRemoveDivision(divisionIndex) {
    removeDivision(divisionIndex);

    // 분반 삭제 후 인덱스를 조정하는 로직
    if (divisionFields.length === 1) {
      // 분반이 하나밖에 없을 경우 삭제 후 인덱스를 0으로 유지
      setActiveDivisionIndex(0);
    } else if (divisionIndex === divisionFields.length - 1) {
      // 마지막 분반을 삭제할 경우, 이전 분반으로 이동
      setActiveDivisionIndex(divisionIndex - 1);
    } else {
      // 중간 분반을 삭제할 경우, 현재 인덱스를 유지
      setActiveDivisionIndex(divisionIndex);
    }
  }

  // 분반 추가 시 로직: 추가된 분반으로 자동 이동
  function handleAddDivision() {
    appendDivision({
      divisionName: "",
      sectionGroup: [],
      capacity: null,
      professor: "",
    });
    setActiveDivisionIndex(divisionFields.length); // 새 분반으로 자동 이동
  }

  // kdb 컬러용
  let kbdColor;

  if (isGradForm == true) {
    kbdColor = "badge-warning text-base-warning";
  } else {
    kbdColor = "bg-base-content text-base-200";
  }

  // 선택된 인덱스의 분반만 표시
  return (
    <div>
      {/* 현재 선택된 분반만 표시 */}
      {divisionFields.length > 0 && (
        <div
          key={divisionFields[activeDivisionIndex]?.id}
          className="grid grid-cols-5 gap-4 my-6 p-4 rounded border-2 border-base-300"
        >
          <kbd
            className={`kbd kbd-sm max-w-40 min-w-40 font-sans font-semibold ${kbdColor} max-h-1 px-4 mt-2`}
          >
            {currentIndex + 1}번 강의: {activeDivisionIndex + 1}번 분반
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
                style="btn-error btn-sm -mb-6"
                onClick={() => handleRemoveDivision(activeDivisionIndex)}
              >
                분반 삭제
              </Button>
            )}
          </div>

          {/* 분반 구분 */}
          <div className="w-full mb-4">
            <span className="label-text text-base-content font-bold">
              분반 이름
            </span>
            <InputText
              {...register(
                `lectures.${currentIndex}.divisionGroup.${activeDivisionIndex}.divisionName`,
                {
                  required: "분반 구분을 입력해주세요.",
                }
              )}
            >
              1 or A
            </InputText>
            {errors?.lectures?.[currentIndex]?.divisionGroup?.[
              activeDivisionIndex
            ]?.divisionName && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {
                  errors.lectures[currentIndex].divisionGroup[
                    activeDivisionIndex
                  ].divisionName.message
                }
              </p>
            )}
          </div>

          {/* 강의 시간 분리 */}
          <div className="grid grid-cols-2 col-span-2 gap-4 rounded">
            <div className="w-full mb-4">
              <span className="label-text text-base-content font-bold">
                강의 시간 분리 1
              </span>
              <InputText
                {...register(
                  `lectures.${currentIndex}.divisionGroup.${activeDivisionIndex}.sectionGroup.0.sectionTime`,
                  {
                    required: "강의 시간을 입력해주세요.",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "숫자만 입력해주세요.",
                    },
                    min: {
                      value: 1,
                      message: "1 이상의 숫자를 입력해주세요.",
                    },
                    max: {
                      value: 13,
                      message: "13 이하의 숫자를 입력해주세요.",
                    },
                  }
                )}
              >
                1
              </InputText>
              {errors?.lectures?.[currentIndex]?.divisionGroup?.[
                activeDivisionIndex
              ]?.sectionGroup?.[0]?.sectionTime && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {
                    errors.lectures[currentIndex].divisionGroup[
                      activeDivisionIndex
                    ].sectionGroup[0].sectionTime.message
                  }
                </p>
              )}
            </div>

            <div className="w-full mb-4">
              <span className="label-text text-base-content font-bold">
                강의 시간 분리 2
              </span>
              <InputText
                {...register(
                  `lectures.${currentIndex}.divisionGroup.${activeDivisionIndex}.sectionGroup.1.sectionTime`,
                  {
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "숫자만 입력해주세요.",
                    },
                    min: {
                      value: 0,
                      message: "0 이상의 숫자를 입력해주세요.",
                    },
                    max: {
                      value: 13,
                      message: "13 이하의 숫자를 입력해주세요.",
                    },
                  }
                )}
              ></InputText>
            </div>
          </div>

          {/* 수강 인원 */}
          <div className="w-full mb-4">
            <span className="label-text text-base-content font-bold">
              수강 인원
            </span>
            <InputText
              {...register(
                `lectures.${currentIndex}.divisionGroup.${activeDivisionIndex}.capacity`,
                {
                  required: "수강 인원을 입력해주세요.",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "숫자만 입력해주세요.",
                  },
                  validate: (value) =>
                    parseInt(value, 10) > 0 ||
                    "수강 인원은 1 이상이어야 합니다.",
                }
              )}
            >
              40
            </InputText>
            {errors?.lectures?.[currentIndex]?.divisionGroup?.[
              activeDivisionIndex
            ]?.capacity && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {
                  errors.lectures[currentIndex].divisionGroup[
                    activeDivisionIndex
                  ].capacity.message
                }
              </p>
            )}
          </div>

          {/* 전임교원 선택 */}
          <div className="w-full mb-4">
            <span className="label-text text-base-content font-bold">
              전임교원 선택
            </span>
            <Select
              style="select-bordered"
              {...register(
                `lectures.${currentIndex}.divisionGroup.${activeDivisionIndex}.professor`,
                {
                  required: "전임교원을 선택해주세요.",
                  validate: (value) =>
                    value !== "" || "전임교원을 선택해주세요.", // 값이 비어있으면 유효성 검사 실패
                }
              )}
              options={professorOptions}
            >
              -
            </Select>
            {errors?.lectures?.[currentIndex]?.divisionGroup?.[
              activeDivisionIndex
            ]?.professor && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {
                  errors.lectures[currentIndex].divisionGroup[
                    activeDivisionIndex
                  ].professor.message
                }
              </p>
            )}
          </div>

          {/* 분반 추가 버튼 */}
          <Button style="mb-0" onClick={handleAddDivision}>
            분반 추가
          </Button>

          {/* 분반 선택 버튼 및 분반 추가 버튼 */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              {divisionFields.map((_, divisionIndex) => (
                <Button
                  key={divisionIndex}
                  style={`btn-sm ${
                    activeDivisionIndex === divisionIndex ? "btn-active" : ""
                  }`}
                  onClick={() => setActiveDivisionIndex(divisionIndex)}
                >
                  분반 {divisionIndex + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default DivisionGroup;
