import Button from "../../components/Button";
import Form from "../../components/form/Form";
import InputText from "../../components/form/InputText";
import Toggle from "../../components/Toggle";
import Select from "../../components/Select";
import { useFormContext, Controller } from "react-hook-form";
import DivisionGroup from "./Lectures/DivisionGroup";
import { useLecture } from "../../hooks/useLecture";

export default function Lectures() {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const [
    lectureFields,
    currentIndex,
    classroomGroupOptions,
    handleAddLecture,
    handleRemoveLecture,
    handlePageChange, // 드롭다운에서 선택된 강의를 변경하는 함수
  ] = useLecture();

  const lectures = watch("lectures");

  // 강의 드롭다운 선택 옵션 생성
  const lectureOptions = lectureFields.map((lecture, index) => ({
    value: index,
    label: `강의 ${index + 1}: ${lecture.lectureName || "이름 없음"}`,
  }));

  return (
    <Form
      title="STEP 5: 강의 정보"
      prev="/timetable/classroomgroups"
      next="/timetable/postgraduatelectures"
    >
      <span className="mb-2 -mt-6 label-text text-right text-xs text-base-content font-bold">
        대학원(야간) 강의 입력은 다음 STEP에서 진행합니다.
      </span>

      {/* 드롭다운을 이용한 강의 선택 */}
      <Select
        style="select-bordered mt-0 mb-4"
        options={lectureOptions}
        onChange={(e) => handlePageChange(parseInt(e.target.value, 10))}
        value={currentIndex}
      >
        강의 선택
      </Select>

      {lectureFields.length > 0 && (
        <div
          key={lectureFields[currentIndex]?.id}
          className="mb-4 p-4 rounded border-2 border-base-content"
        >
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="flex flex-row justify-between items-center col-span-3 max-w-max my-2">
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

            {/* 교과목명 */}
            <div className="w-full mb-4">
              <InputText
                {...register(`lectures.${currentIndex}.lectureName`, {
                  required: "교과목명을 입력해주세요.",
                })}
              >
                교과목명 (ex: 자료구조)
              </InputText>
              {errors?.lectures?.[currentIndex]?.lectureName && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.lectures[currentIndex].lectureName.message}
                </p>
              )}
            </div>

            {/* 교과목 코드 */}
            <div className="w-full mb-4">
              <InputText
                {...register(`lectures.${currentIndex}.lectureCode`, {
                  required: "교과목 코드를 입력해주세요.",
                })}
              >
                교과목 코드 (ex: SW-001)
              </InputText>
              {errors?.lectures?.[currentIndex]?.lectureCode && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.lectures[currentIndex].lectureCode.message}
                </p>
              )}
            </div>

            {/* 학년 */}
            <div className="w-full mb-4">
              <InputText
                {...register(`lectures.${currentIndex}.year`, {
                  required: "학년을 입력해주세요.",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "숫자만 입력해주세요.",
                  },
                })}
              >
                학년 (ex: 2)
              </InputText>
              {errors?.lectures?.[currentIndex]?.year && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.lectures[currentIndex].year.message}
                </p>
              )}
            </div>

            {/* 강의실 그룹 선택 */}
            <div className="w-full mb-4">
              <Select
                style="select-bordered"
                {...register(`lectures.${currentIndex}.group`, {
                  required: "강의실 그룹을 선택해주세요.",
                  validate: (value) =>
                    value !== "" || "강의실 그룹을 선택해주세요.",
                })}
                options={classroomGroupOptions}
              >
                강의실 그룹 선택
              </Select>
              {errors?.lectures?.[currentIndex]?.group && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.lectures[currentIndex].group.message}
                </p>
              )}
            </div>
          </div>

          {/* 분반 컴포넌트 */}
          <DivisionGroup control={control} currentIndex={currentIndex} />

          <div>
            <Button onClick={() => handleAddLecture(false)}>강의 추가</Button>
          </div>
        </div>
      )}
    </Form>
  );
}
