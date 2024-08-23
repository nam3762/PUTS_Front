import { useState } from "react";
import Button from "../../components/Button";
import Form from "../../components/form/Form";
import InputText from "../../components/form/InputText";
import Toggle from "../../components/Toggle";
import Select from "../../components/Select";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import DivisionGroup from "./Lectures/DivisionGroup";

export default function Lectures() {
  const { control, register, watch, getValues } = useFormContext();
  const {
    fields: lectureFields,
    append: appendLecture,
    remove: removeLecture,
  } = useFieldArray({
    control,
    name: "lectures",
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const lectures = watch("lectures");
  const classroomGroups = getValues("classroomGroups");

  const classroomGroupOptions = classroomGroups.map((classroomGroup) => ({
    value: classroomGroup.groupName,
    label: classroomGroup.groupName,
  }));

  function handleAddLecture() {
    appendLecture({
      lectureName: "",
      lectureCode: "",
      year: "",
      group: "",
      majorRequired: false,
      isGrad: false,
      gradClassrooms: [],
      divisionGroup: [
        {
          divisionName: "",
          sectionGroup: [],
          capacity: null,
          professor: "",
        },
      ],
    });
    setCurrentIndex(lectureFields.length); // 새 강의를 추가한 후 해당 강의로 이동
  }

  function handleRemoveLecture(event, index) {
    event.stopPropagation();
    removeLecture(index);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0)); // 현재 인덱스 재조정
  }

  const handleFirst = (event) => {
    event.preventDefault();
    setCurrentIndex(0);
  };

  const handleLast = (event) => {
    event.preventDefault();
    setCurrentIndex(lectures.length - 1);
  };

  const handlePageChange = (index) => {
    setCurrentIndex(index);
  };

  const getVisiblePages = () => {
    const totalLectures = lectures.length;
    const visiblePages = [];

    if (totalLectures <= 5) {
      for (let i = 0; i < totalLectures; i++) {
        visiblePages.push(i);
      }
    } else {
      let start = Math.max(currentIndex - 2, 0);
      let end = Math.min(start + 4, totalLectures - 1);

      if (end - start < 4) {
        start = Math.max(end - 4, 0);
      }

      for (let i = start; i <= end; i++) {
        visiblePages.push(i);
      }
    }

    return visiblePages;
  };

  return (
    <Form
      title="STEP 5: 강의 정보"
      prev="/timetable/classroomgroups"
      next="/timetable/postgraduatelectures"
    >
      <span className="mb-2 -mt-6 label-text text-right text-xs text-base-content font-bold">
        대학원(야간) 강의 입력은 다음 STEP에서 진행합니다.
      </span>
      {lectureFields.length > 0 && (
        <div
          key={lectureFields[currentIndex]?.id}
          className="mb-4 p-4 rounded border-2 border-base-content"
        >
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="flex flex-row justify-between items-center col-span-3 max-w-max">
              <kbd className="kbd kbd-sm max-w-24 font-sans font-semibold bg-base-content text-base-200 max-h-1 px-4">
                {currentIndex + 1}번 강의
              </kbd>
              <Controller
                control={control}
                name={`lectures.${currentIndex}.majorRequired`}
                render={({ field }) => (
                  <Toggle checked={field.value} onChange={field.onChange}>
                    전공 필수 체크
                  </Toggle>
                )}
              />
            </div>
            <div className="flex justify-end">
              {lectures.length > 1 && (
                <Button
                  onClick={(event) => handleRemoveLecture(event, currentIndex)}
                  style="btn-error btn-sm -mb-2"
                >
                  강의 삭제
                </Button>
              )}
            </div>
            <InputText {...register(`lectures.${currentIndex}.lectureName`)}>
              교과목명 (ex: 자료구조)
            </InputText>
            <InputText {...register(`lectures.${currentIndex}.lectureCode`)}>
              교과목 코드 (ex: SW-001)
            </InputText>
            <InputText {...register(`lectures.${currentIndex}.year`)}>
              학년 (ex: 2)
            </InputText>
            <Select
              style="select-bordered"
              {...register(`lectures.${currentIndex}.group`)}
              options={classroomGroupOptions}
            >
              강의실 그룹 선택
            </Select>
          </div>
          {/* 분반 컴포넌트 */}
          <DivisionGroup control={control} currentIndex={currentIndex} />

          <div>
            <Button onClick={handleAddLecture}>강의 추가</Button>
            <div className="flex justify-center items-center space-x-2 -mt-8">
              <Button
                onClick={handleFirst}
                style="btn-neutral btn-circle btn-xs text-xs"
              >
                {`<<`}
              </Button>
              <div className="join">
                {getVisiblePages().map((index) => (
                  <input
                    key={index}
                    className="join-item btn btn-square -mt-4"
                    type="radio"
                    name="options"
                    aria-label={index + 1}
                    checked={currentIndex === index}
                    onChange={() => handlePageChange(index)}
                  />
                ))}
              </div>
              <Button
                onClick={(event) => handleLast(event)}
                style="btn-neutral btn-circle btn-xs text-xs"
              >
                {`>>`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Form>
  );
}
