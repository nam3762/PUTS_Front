import Form from "../../components/form/Form";
import Button from "../../components/Button";
import Toggle from "../../components/Toggle";
import TimeSelector from "../../components/TimeSelector";
import InputText from "../../components/form/InputText";
import Select from "../../components/Select";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { useState } from "react";

const weekdays = ["월요일", "화요일", "수요일", "목요일", "금요일"];
const periodLabels = Array.from({ length: 9 }, (_, i) => `${i + 1}교시`);

export default function Professors() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "professors",
  });

  const [currentIndex, setCurrentIndex] = useState(0); // 현재 선택된 전임교원의 인덱스 관리

  // 드롭다운에 표시할 전임교원 옵션 리스트
  const professorOptions = fields.map((professor, index) => ({
    value: index,
    label: `전임교원 ${index + 1}: ${professor.professorName || "이름 없음"}`,
  }));

  const handleAddProfessor = () => {
    append({
      professorName: "",
      professorCode: "",
      isProfessor: true,
      offTimes: [],
      hopeTimes: [],
    });
    setCurrentIndex(fields.length); // 새 전임교원을 추가한 후 그 전임교원으로 이동
  };

  const handleProfessorPage = (e) => {
    const selectedIndex = parseInt(e.target.value, 10);
    setCurrentIndex(selectedIndex); // 드롭다운에서 선택한 전임교원으로 이동
  };

  // 전임교원 삭제 처리 로직
  const handleRemoveProfessor = () => {
    const newFieldsLength = fields.length - 1;
    remove(currentIndex); // 현재 선택된 전임교원 삭제

    // 인덱스를 조정하여 마지막 교원 삭제 시 이전 교원으로 이동
    if (currentIndex === newFieldsLength) {
      setCurrentIndex(Math.max(currentIndex - 1, 0));
    } else {
      setCurrentIndex(currentIndex); // 중간 교원 삭제 시 현재 인덱스 유지
    }
  };

  return (
    <Form
      title="STEP 2: 전임교원 정보"
      prev="/timetable"
      next="/timetable/classrooms"
    >
      {/* 드롭다운 메뉴로 전임교원 선택 */}
      <Select
        style="select-bordered mt-0 mb-4"
        options={professorOptions}
        onChange={handleProfessorPage}
        value={currentIndex}
      >
        전임교원 선택
      </Select>

      {fields.length > 0 && (
        <div
          key={fields[currentIndex]?.id}
          className="mb-4 p-4 rounded border-2 border-base-300"
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-row justify-between items-center col-span-1 max-w-max my-2">
              <kbd className="kbd kbd-sm min-w-28 font-sans font-semibold bg-base-content text-base-200">
                {currentIndex + 1}번 전임교원
              </kbd>
              <Controller
                control={control}
                name={`professors.${currentIndex}.isProfessor`}
                render={({ field }) => (
                  <Toggle checked={field.value} onChange={field.onChange}>
                    교수 여부 체크
                  </Toggle>
                )}
              />
            </div>
            <div className="flex justify-end">
              {fields.length > 1 && (
                <Button
                  onClick={handleRemoveProfessor} // 전임교원 삭제 버튼
                  style="btn-error btn-sm -mb-2"
                >
                  전임교원 삭제
                </Button>
              )}
            </div>

            {/* 전임교원 이름 입력 필드에 유효성 검사 추가 */}
            <div className="relative">
              <span className="label-text text-base-content font-bold">
                교수 이름
              </span>
              <InputText
                {...register(`professors.${currentIndex}.professorName`, {
                  required: "전임교원 이름을 입력해주세요.", // 필수 항목
                })}
              >
                최경주
              </InputText>
              {errors?.professors?.[currentIndex]?.professorName && (
                <p className="text-red-500 text-xs absolute -bottom-5 left-1">
                  {errors.professors[currentIndex].professorName.message}
                </p>
              )}
            </div>

            {/* 전임교원 번호 입력 필드에 유효성 검사 추가 */}
            <div className="relative">
              <span className="label-text text-base-content font-bold">
                전임교원 번호
              </span>
              <InputText
                {...register(`professors.${currentIndex}.professorCode`, {
                  required: "전임교원 번호를 입력해주세요.", // 필수 항목
                })}
              >
                P-001
              </InputText>
              {errors?.professors?.[currentIndex]?.professorCode && (
                <p className="text-red-500 text-xs absolute -bottom-5 left-1">
                  {errors.professors[currentIndex].professorCode.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex">
            <Controller
              control={control}
              name={`professors.${currentIndex}.offTimes`}
              render={({ field }) => (
                <TimeSelector
                  {...field}
                  title="강의 불가능한 시간 설정"
                  timeType="offTimes"
                  name={`professors.${currentIndex}.offTimes`}
                  weekdays={weekdays}
                  periodLabels={periodLabels}
                  value={field.value || {}}
                  onChange={(newValue) => field.onChange(newValue)}
                />
              )}
            />

            <Controller
              control={control}
              name={`professors.${currentIndex}.hopeTimes`}
              render={({ field }) => (
                <TimeSelector
                  {...field}
                  title="선호 시간 설정"
                  timeType="hopeTimes"
                  name={`professors.${currentIndex}.hopeTimes`}
                  weekdays={weekdays}
                  periodLabels={periodLabels}
                  value={field.value || {}}
                  onChange={(newValue) => field.onChange(newValue)}
                />
              )}
            />
          </div>
        </div>
      )}

      {/* 전임교원 추가 버튼 */}
      <Button onClick={handleAddProfessor} style="max-w-32 mt-4">
        전임교원 추가
      </Button>
    </Form>
  );
}
