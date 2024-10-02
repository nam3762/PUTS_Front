import Button from "../../components/Button";
import Form from "../../components/form/Form";
import InputText from "../../components/form/InputText";
import Toggle from "../../components/Toggle";
import Select from "../../components/Select";
import { useFormContext, Controller } from "react-hook-form";
import DivisionGroup from "./Lectures/DivisionGroup";
import { useLecture } from "../../hooks/useLecture";

export default function PostgraduateLectures() {
  const {
    control,
    register,
    formState: { errors },
    watch,
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

  const isGradForm = true;

  return (
    <Form
      title="STEP 6: 대학원 강의 정보"
      prev="/timetable/lectures"
      next="/timetable/timetablecustomizing"
    >
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
            <div className="flex flex-row justify-between items-center col-span-3 max-w-max">
              <kbd className="kbd kbd-sm badge-warning max-w-24 font-sans font-semibold text-warning-content max-h-1 px-4">
                {currentIndex + 1}번 강의
              </kbd>
              <Controller
                control={control}
                name={`lectures.${currentIndex}.atNight`}
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

            {/* 교과목명 유효성 검사 추가 */}
            <div className="w-full mb-4">
              <span className="label-text text-base-content font-bold">
                교과목명
              </span>
              <InputText
                {...register(`lectures.${currentIndex}.lectureName`, {
                  required: "교과목명을 입력해주세요.",
                })}
              >
                연구윤리 및 연구과제 I
              </InputText>
              {errors?.lectures?.[currentIndex]?.lectureName && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.lectures[currentIndex].lectureName.message}
                </p>
              )}
            </div>

            {/* 교과목 코드 유효성 검사 추가 */}
            <div className="w-full mb-4">
              <span className="label-text text-base-content font-bold">
                교과목 코드
              </span>
              <InputText
                {...register(`lectures.${currentIndex}.lectureCode`, {
                  required: "교과목 코드를 입력해주세요.",
                })}
              >
                SW-002
              </InputText>
              {errors?.lectures?.[currentIndex]?.lectureCode && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.lectures[currentIndex].lectureCode.message}
                </p>
              )}
            </div>

            {/* 학년 유효성 검사 추가 */}
            <div className="w-full mb-4">
              <span className="label-text text-base-content font-bold">
                학년
              </span>
              <InputText
                {...register(`lectures.${currentIndex}.year`, {
                  required: "학년을 입력해주세요.",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "숫자만 입력해주세요.",
                  },
                })}
              >
                2
              </InputText>
              {errors?.lectures?.[currentIndex]?.year && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.lectures[currentIndex].year.message}
                </p>
              )}
            </div>

            {/* 강의실 그룹 선택 유효성 검사 추가 */}
            <div className="w-full mb-4">
              <span className="label-text text-base-content font-bold">
                강의실 그룹
              </span>
              <Select
                style="select-bordered"
                {...register(`lectures.${currentIndex}.group`, {
                  required: "강의실 그룹을 선택해주세요.",
                  validate: (value) =>
                    value !== "" || "강의실 그룹을 선택해주세요.",
                })}
                options={classroomGroupOptions}
              >
                -
              </Select>
              {errors?.lectures?.[currentIndex]?.group && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.lectures[currentIndex].group.message}
                </p>
              )}
            </div>
          </div>

          {/* 분반 컴포넌트 */}
          <DivisionGroup
            control={control}
            currentIndex={currentIndex}
            isGradForm={isGradForm}
          />

          <div>
            <Button onClick={() => handleAddLecture(false)}>강의 추가</Button>
          </div>
        </div>
      )}
    </Form>
  );
}
