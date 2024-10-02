import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import Form from "../../components/form/Form";

// 요일 및 시간 데이터를 정의합니다.
const days = ["월", "화", "수", "목", "금"];
const times = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

export default function TimetableCustomizing() {
  const {
    setValue,
    register,
    watch,
    formState: { errors },
    handleSubmit, // react-hook-form의 handleSubmit을 가져옴
  } = useFormContext();
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  // 모달에서 사용할 상태 값들
  const [timetableResult, setTimetableResult] = useState(1);
  const [timetableLunchTimeConstraint, setTimetableLunchTimeConstraint] =
    useState(true);
  const [timetable4daysConstraint, setTimetable4daysConstraint] =
    useState(true);

  // 강의 데이터를 폼 상태에서 가져옵니다.
  const lectures = watch("lectures");
  const [timetable, setTimetable] = useState(
    Array(5)
      .fill()
      .map(() => Array(13).fill([]))
  );

  // 강의 선택 핸들러
  const handleLectureSelect = (lecture) => {
    setSelectedLecture(lecture);
    setSelectedDivision(null);
    setSelectedSection(null);
  };

  // 분반 선택 핸들러
  const handleDivisionSelect = (division) => {
    setSelectedDivision(division);
    setSelectedSection(null);
  };

  // 섹션 선택 핸들러
  const handleSectionSelect = (section) => {
    setSelectedSection(section);
  };

  // 시간표 셀 클릭 핸들러 (섹션 삽입)
  const handleTimetableClick = (dayIndex, timeIndex) => {
    if (selectedLecture && selectedDivision && selectedSection) {
      const newTimetable = [...timetable];
      const existingEntries = newTimetable[dayIndex][timeIndex];

      // 해당 시간이 비어있거나 이미 삽입되지 않은 섹션이면 삽입
      const isAlreadyInserted = existingEntries.some(
        (entry) =>
          entry.lectureName === selectedLecture.lectureName &&
          entry.divisionName === selectedDivision.divisionName &&
          entry.day === selectedSection.day &&
          entry.period === selectedSection.period
      );

      if (!isAlreadyInserted) {
        newTimetable[dayIndex][timeIndex] = [
          ...existingEntries,
          {
            lectureName: selectedLecture.lectureName,
            divisionName: selectedDivision.divisionName,
            day: selectedSection.day,
            period: selectedSection.period,
            classroom: selectedSection.classroom,
          },
        ];
        setTimetable(newTimetable);

        // 섹션을 고정 처리
        const updatedLectures = lectures.map((lecture) =>
          lecture.lectureName === selectedLecture.lectureName
            ? {
                ...lecture,
                divisionGroup: lecture.divisionGroup.map((division) =>
                  division.divisionName === selectedDivision.divisionName
                    ? {
                        ...division,
                        sectionGroup: division.sectionGroup.map((section) =>
                          section.day === selectedSection.day &&
                          section.period === selectedSection.period
                            ? { ...section, isFixed: true }
                            : section
                        ),
                      }
                    : division
                ),
              }
            : lecture
        );
        setValue("lectures", updatedLectures);
        setSelectedLecture(null); // 선택 초기화
        setSelectedDivision(null);
        setSelectedSection(null);
      }
    }
  };

  // 섹션 제거 핸들러
  const handleRemoveSection = (dayIndex, timeIndex, sectionToRemove) => {
    const newTimetable = [...timetable];
    newTimetable[dayIndex][timeIndex] = newTimetable[dayIndex][
      timeIndex
    ].filter(
      (section) =>
        section.lectureName !== sectionToRemove.lectureName ||
        section.divisionName !== sectionToRemove.divisionName
    );
    setTimetable(newTimetable);

    // 섹션의 고정 상태 해제
    const updatedLectures = lectures.map((lecture) =>
      lecture.lectureName === sectionToRemove.lectureName
        ? {
            ...lecture,
            divisionGroup: lecture.divisionGroup.map((division) =>
              division.divisionName === sectionToRemove.divisionName
                ? {
                    ...division,
                    sectionGroup: division.sectionGroup.map((section) =>
                      section.day === sectionToRemove.day &&
                      section.period === sectionToRemove.period
                        ? { ...section, isFixed: false }
                        : section
                    ),
                  }
                : division
            ),
          }
        : lecture
    );
    setValue("lectures", updatedLectures);
  };

  // 모달을 열고 닫는 함수
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 모달 저장 핸들러
  const handleSaveOptions = () => {
    // 유효성 검사 후 저장
    handleSubmit((data) => {
      setValue("timetableResult", data.timetableResult);
      setValue(
        "timetableLunchTimeConstraint",
        data.timetableLunchTimeConstraint
      );
      setValue("timetable4daysConstraint", data.timetable4daysConstraint);
      closeModal();
    })();
  };

  return (
    <Form
      title="STEP 7: 커스터마이징"
      prev="/timetable/postgraduatelectures"
      next="/timetable/timetableresult"
    >
      <div className="flex w-full h-screen text-base-content">
        {/* 왼쪽: 시간표 테이블 */}
        <div className="w-3/4 p-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">시간표</h2>
            {/* 톱니바퀴 모양 옵션 버튼 */}
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={openModal}
            >
              ⚙️
            </button>
          </div>
          <table className="table border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 w-16">시간</th>
                {days.map((day, index) => (
                  <th key={index} className="border border-gray-300">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time, timeIndex) => (
                <tr key={timeIndex}>
                  <td className="border border-gray-300">{time}</td>
                  {days.map((day, dayIndex) => (
                    <td
                      key={dayIndex}
                      className="border border-gray-300 cursor-pointer"
                      onClick={() => handleTimetableClick(dayIndex, timeIndex)}
                    >
                      {timetable[dayIndex][timeIndex].map((section, index) => (
                        <div
                          key={index}
                          className="bg-green-200 rounded relative"
                        >
                          <span>
                            {`${section.lectureName} (${section.divisionName})`}
                          </span>
                          <button
                            className="absolute top-1 right-1 text-xs text-red-500"
                            onClick={() =>
                              handleRemoveSection(dayIndex, timeIndex, section)
                            }
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 오른쪽: 강의 및 분반 선택 */}
        <div className="w-1/4 p-4 border-l-2 border-gray-200 relative">
          <h2 className="text-xl font-bold mb-4">강의 및 분반 선택</h2>

          {/* 강의 선택 */}
          <div className="space-y-4">
            {lectures.map((lecture) => (
              <div
                key={lecture.lectureName}
                className={`p-2 border rounded cursor-pointer ${
                  selectedLecture?.lectureName === lecture.lectureName
                    ? "bg-blue-200"
                    : "bg-white"
                }`}
                onClick={() => handleLectureSelect(lecture)}
              >
                {lecture.lectureName}
              </div>
            ))}
          </div>

          {/* 분반 선택 (강의가 선택된 경우에만 표시) */}
          {selectedLecture && (
            <div className="mt-6">
              <h3 className="font-bold">분반 선택</h3>
              <div className="space-y-2">
                {selectedLecture.divisionGroup.map((division) => (
                  <div
                    key={division.divisionName}
                    className={`p-2 border rounded cursor-pointer ${
                      selectedDivision?.divisionName === division.divisionName
                        ? "bg-blue-200"
                        : "bg-white"
                    }`}
                    onClick={() => handleDivisionSelect(division)}
                  >
                    {division.divisionName}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 섹션 선택 (분반이 선택된 경우에만 표시) */}
          {selectedDivision && (
            <div className="mt-6">
              <h3 className="font-bold">섹션 선택</h3>
              <div className="space-y-2">
                {selectedDivision.sectionGroup.map((section, index) => (
                  <div
                    key={index}
                    className={`p-2 border rounded cursor-pointer ${
                      selectedSection?.day === section.day &&
                      selectedSection?.period === section.period
                        ? "bg-yellow-200"
                        : "bg-white"
                    }`}
                    onClick={() => handleSectionSelect(section)}
                  >
                    {`${section.day}, ${section.period}, ${section.classroom}`}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="modal modal-open text-base-content">
          <div className="modal-box">
            <h3 className="font-bold text-lg">시간표 제약 조건 설정</h3>
            <div className="py-4">
              <label className="flex justify-between items-center">
                <span className="text-base">생성 할 시간표 수 (1 ~ 10)</span>
                <input
                  type="number"
                  className="input input-sm input-bordered ml-4"
                  {...register("timetableResult", {
                    required: "시간표 수는 필수 입력입니다.",
                    min: { value: 1, message: "최소 값은 1입니다." },
                    max: { value: 10, message: "최대 값은 10입니다." },
                    valueAsNumber: true, // 숫자 타입 변환
                  })}
                />
              </label>
              {errors.timetableResult && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.timetableResult.message}
                </p>
              )}

              <label className="flex justify-between items-center mt-4">
                <span className="text-base">점심 시간 고려 (11 ~ 2시)</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary ml-4"
                  {...register("timetableLunchTimeConstraint")}
                />
              </label>

              <label className="flex justify-between items-center mt-4">
                <span className="text-base">교수 주 4회 강의</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary ml-4"
                  {...register("timetable4daysConstraint")}
                />
              </label>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveOptions}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Form>
  );
}
