import PrevNextButton from "../../components/PrevNextButton";

export default function Lectures() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-base-200">
      <form className="form-control p-6 bg-gray-600 shadow-lg rounded-lg mr-5">
        <h2 className="text-2xl font-bold mb-4 text-left">STEP 5: 강의 정보</h2>
        <PrevNextButton
          prev="/timetable/classroomgroups"
          next="/timetable/postgraduatelectures"
        />
      </form>
    </div>
  );
}
