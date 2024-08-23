import Form from "../../components/form/Form";
import Button from "../../components/Button";
import InputText from "../../components/form/InputText";
import { useFormContext, useFieldArray } from "react-hook-form";

export default function Classrooms() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "classrooms",
  });

  const handleAddClassroom = () => {
    append({ buildingName: "", classroomNumber: "", capacity: null });
  };

  return (
    <Form
      title="STEP 3: 강의실 정보"
      prev="/timetable/professors"
      next="/timetable/classroomgroups"
    >
      {fields.map((classroom, index) => (
        <div
          key={classroom.id}
          className="mb-4 p-4 rounded border-2 border-base-300"
        >
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex flex-row justify-between items-center col-span-2 max-w-max my-2">
              <kbd className="kbd kbd-sm max-w-28 font-sans font-semibold bg-base-content text-base-200 px-4">
                {index + 1}번 강의실
              </kbd>
            </div>
            <div className="flex justify-end">
              {fields.length > 1 && (
                <Button
                  onClick={() => remove(index)}
                  style="btn-error btn-sm -mb-2"
                >
                  강의실 삭제
                </Button>
              )}
            </div>
            <InputText {...register(`classrooms.${index}.buildingName`)}>
              건물 이름 (ex: S4-1)
            </InputText>
            <InputText {...register(`classrooms.${index}.classroomNumber`)}>
              강의실 번호 (ex: 101)
            </InputText>
            <InputText {...register(`classrooms.${index}.capacity`)}>
              수용 인원 (ex: 60)
            </InputText>
          </div>
        </div>
      ))}
      <Button onClick={handleAddClassroom}>강의실 추가</Button>
    </Form>
  );
}
