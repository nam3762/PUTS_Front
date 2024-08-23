import Button from "../../components/Button";
import Form from "../../components/form/Form";
import InputText from "../../components/form/InputText";
import Toggle from "../../components/Toggle";
import Select from "../../components/Select";
import { useFormContext, Controller } from "react-hook-form";
import DivisionGroup from "./Lectures/DivisionGroup";
import { useLecture } from "../../hooks/useLecture";

export default function PostgraduateLectures() {
  const { control, register, watch } = useFormContext();
  const [
    lectureFields,
    currentIndex,
    classroomGroupOptions,
    handleAddLecture,
    handleRemoveLecture,
    handleFirst,
    handleLast,
    handlePageChange,
    getVisiblePages,
  ] = useLecture();

  const lectures = watch("lectures");

  return (
    <Form
      title="STEP 6: 대학원 강의 정보"
      prev="/timetable/lectures"
      next="/timetable/lectures"
    >
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
                    야간 강의 여부 체크 (로직 구현 X)
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
            <Button
              onClick={() => {
                handleAddLecture(true);
              }}
            >
              강의 추가
            </Button>
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
