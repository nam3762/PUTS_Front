import Form from "../../components/form/Form";
import Button from "../../components/Button";
import Toggle from "../../components/Toggle";
import TimeSelector from "../../components/TimeSelector";
import InputText from "../../components/form/InputText";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";

const weekdays = ["월요일", "화요일", "수요일", "목요일", "금요일"];
const periodLabels = Array.from({ length: 9 }, (_, i) => `${i + 1}교시`);

// STEP 2: 전임교원 정보 입력
export default function Professors() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "professors",
  });

  const handleAddProfessor = () => {
    append({
      professorName: "",
      professorCode: "",
      isProfessor: true,
      offTimes: [],
      hopeTimes: [],
    });
  };

  return (
    <Form
      title="STEP 2: 전임교원 정보"
      prev="/timetable"
      next="/timetable/classrooms"
    >
      {fields.map((professor, index) => (
        <div
          key={professor.id}
          className="mb-4 p-4 rounded border-2 border-base-300"
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-row justify-between items-center col-span-1 max-w-max">
              <kbd className="kbd kbd-sm min-w-28 font-sans font-semibold bg-base-content text-base-200">
                {index + 1}번 전임교원
              </kbd>
              <Controller
                control={control}
                name={`professors.${index}.isProfessor`}
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
                  onClick={() => remove(index)}
                  style="btn-error btn-sm -mb-2"
                >
                  전임교원 삭제
                </Button>
              )}
            </div>
            <InputText {...register(`professors.${index}.professorName`)}>
              전임교원 이름 (ex: 남재홍)
            </InputText>
            <InputText {...register(`professors.${index}.professorCode`)}>
              전임교원 번호 (ex: P-001)
            </InputText>
          </div>

          <div className="flex">
            <Controller
              control={control}
              name={`professors.${index}.offTimes`}
              render={({ field }) => (
                <TimeSelector
                  {...field}
                  title="강의 불가능한 시간 설정"
                  timeType="offTimes"
                  name={`professors.${index}.offTimes`}
                  weekdays={weekdays}
                  periodLabels={periodLabels}
                  value={field.value || {}}
                  onChange={(newValue) => field.onChange(newValue)}
                />
              )}
            />
            <Controller
              control={control}
              name={`professors.${index}.hopeTimes`}
              render={({ field }) => (
                <TimeSelector
                  {...field}
                  title="선호 시간 설정"
                  timeType="hopeTimes"
                  name={`professors.${index}.hopeTimes`}
                  weekdays={weekdays}
                  periodLabels={periodLabels}
                  value={field.value || {}}
                  onChange={(newValue) => field.onChange(newValue)}
                />
              )}
            />
          </div>
        </div>
      ))}
      <Button onClick={handleAddProfessor} style="max-w-32">
        전임교원 추가
      </Button>
    </Form>
  );
}
