import { useState } from "react";
import Button from "../../components/Button";
import Form from "../../components/form/Form";
import InputText from "../../components/form/InputText";
import Toggle from "../../components/Toggle";
import Select from "../../components/Select";
import Tooltip from "../../components/Tooltip";

export default function PostgraduateLectures() {
  const [graduateLectures, setGraduateLectures] = useState([
    {
      graduateLectureName: "",
      graduateLectureCode: "",
      graduateYear: "",
      graduateClassrooms: [],
      graduateDivisionGroup: [
        {
          divisionName: "",
          sectionGroup: { sectionName: "", sectionTime: null },
          capacity: null,
          professor: "",
        },
      ],
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGraduateLectureChange = (index, event) => {
    const { name, value, checked, type } = event.target;
    setGraduateLectures((prev) => {
      const newGraduateLectures = [...prev];
      if (type === "checkbox") {
        newGraduateLectures[index][name] = checked;
      } else {
        newGraduateLectures[index][name] = value;
      }
      return newGraduateLectures;
    });
  };

  const handleDivisionChange = (lectureIndex, divisionIndex, event) => {
    const { name, value } = event.target;
    setLectures((prev) => {
      const newGraduateLectures = [...prev];
      newGraduateLectures[lectureIndex].graduateDivisionGroup[divisionIndex][
        name
      ] = value;
      return newGraduateLectures;
    });
  };

  const addGraduateLecture = (event) => {
    event.preventDefault();
    setLectures((prev) => [
      ...prev,
      {
        graduateLectureName: "",
        graduateLectureCode: "",
        graduateYear: "",
        graduateClassrooms: [],
        graduateDivisionGroup: [
          {
            divisionName: "",
            sectionGroup: { sectionName: "", sectionTime: null },
            capacity: null,
            professor: "",
          },
        ],
      },
    ]);
    setCurrentIndex(graduateLectures.length); // 새 강의 페이지로 이동
  };

  const removeGraduateLecture = (event, index) => {
    event.preventDefault();
    setGraduateLectures((prev) => {
      return prev.filter((_, i) => i !== index);
    });
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : 0); // 이전 강의 페이지로 이동
  };

  const addDivision = (event, lectureIndex) => {
    event.preventDefault();
    setGraduateLectures((prev) => {
      const newGraduateLectures = [...prev];
      newGraduateLectures[lectureIndex].graduateDivisionGroup.push({
        divisionName: "",
        sectionGroup: { sectionName: "", sectionTime: null },
        capacity: null,
        professor: "",
      });
      return newGraduateLectures;
    });
  };

  const removeDivision = (event, lectureIndex, divisionIndex) => {
    event.preventDefault();
    setLectures((prev) => {
      const newGraduateLectures = [...prev];
      newGraduateLectures[lectureIndex].graduateDivisionGroup = newLectures[
        lectureIndex
      ].graduateDivisionGroup.filter((_, i) => i !== divisionIndex);
      return newGraduateLectures;
    });
  };

  const handleFirst = (event) => {
    event.preventDefault();
    setCurrentIndex(0);
  };

  const handleLast = (event) => {
    event.preventDefault();
    setCurrentIndex(graduateLectures.length - 1);
  };

  const handlePageChange = (index) => {
    setCurrentIndex(index);
  };

  const getVisiblePages = () => {
    const totalGraduateLectures = graduateLectures.length;
    const visiblePages = [];

    if (totalGraduateLectures <= 5) {
      for (let i = 0; i < totalGraduateLectures; i++) {
        visiblePages.push(i);
      }
    } else {
      let start = Math.max(currentIndex - 2, 0);
      let end = Math.min(start + 4, totalGraduateLectures - 1);

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
    <Form title="STEP 6: 대학원 강의 정보" prev="/timetable/lectures" next="/">
      {graduateLectures.length > 0 && (
        <div
          key={currentIndex}
          className="mb-4 p-4 rounded border-2 border-base-content"
        >
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="flex flex-row justify-between items-center col-span-3 max-w-max">
              <kbd className="kbd kbd-sm max-w-24 font-sans font-semibold bg-base-content text-base-200 max-h-1 px-4">
                {currentIndex + 1}번 강의
              </kbd>
              <Toggle>야간 강의 체크</Toggle>
            </div>
            <div className="text-right">
              {graduateLectures.length > 1 && (
                <Button
                  onClick={(event) =>
                    removeGraduateLecture(event, currentIndex)
                  }
                  style="btn-error btn-sm mb-0"
                >
                  강의 삭제
                </Button>
              )}
            </div>
            <InputText
              index={currentIndex}
              name="lectureName"
              onChange={(e) => handleGraduateLectureChange(currentIndex, e)}
            >
              교과목명 (ex: 자료구조)
            </InputText>
            <InputText
              index={currentIndex}
              name="lectureCode"
              onChange={(e) => handleGraduateLectureChange(currentIndex, e)}
            >
              교과목 코드 (ex: SW-001)
            </InputText>
            <InputText
              index={currentIndex}
              name="year"
              onChange={(e) => handleGraduateLectureChange(currentIndex, e)}
            >
              학년 (ex: 2)
            </InputText>
            <Select style="select-bordered text-xs">
              강의실 그룹 선택 (여기 부분 어떻게 할지 고민)
            </Select>
          </div>
          {/* 분반 추가 */}
          {graduateLectures[currentIndex].graduateDivisionGroup.map(
            (division, divisionIndex) => (
              <div
                key={divisionIndex}
                className="grid grid-cols-5 gap-4 mt-8 p-4 rounded border-2 border-base-300"
              >
                <kbd className="kbd kbd-sm max-w-40 min-w-40 font-sans font-semibold bg-base-content text-base-200 max-h-1 px-4 mt-2">
                  {currentIndex + 1}번 강의: {divisionIndex + 1}번 분반
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
                  {graduateLectures[currentIndex].graduateDivisionGroup.length >
                    1 && (
                    <Button
                      style="btn-error btn-sm mb-0"
                      onClick={(event) =>
                        removeDivision(event, currentIndex, divisionIndex)
                      }
                    >
                      분반 삭제
                    </Button>
                  )}
                </div>
                <InputText
                  index={divisionIndex}
                  name="divisionName"
                  onChange={(e) =>
                    handleDivisionChange(currentIndex, divisionIndex, e)
                  }
                >
                  분반 구분 (ex: 1 or A)
                </InputText>

                {/* 섹션 입력 input 2개 모아놓은 div */}
                <div className="grid grid-cols-2 col-span-2 gap-4 rounded">
                  <InputText
                    index={divisionIndex}
                    name="sectionTime"
                    style="text-sm input-primary"
                    onChange={(e) =>
                      handleDivisionChange(currentIndex, divisionIndex, e)
                    }
                  >
                    강의 시간 분리 (ex: 1)
                  </InputText>
                  <InputText
                    index={divisionIndex}
                    name="sectionTime"
                    style="text-sm input-primary"
                    onChange={(e) =>
                      handleDivisionChange(currentIndex, divisionIndex, e)
                    }
                  >
                    강의 시간 분리 (ex: 1)
                  </InputText>
                </div>

                <InputText
                  index={divisionIndex}
                  name="capacity"
                  onChange={(e) =>
                    handleDivisionChange(currentIndex, divisionIndex, e)
                  }
                >
                  수강 인원 (ex: 40)
                </InputText>

                <Select style="select-bordered">전임교원 선택</Select>
                <Button
                  style="mb-0"
                  onClick={(event) => addDivision(event, currentIndex)}
                >
                  분반 추가
                </Button>
              </div>
            )
          )}
        </div>
      )}
      <div>
        <Button onClick={(event) => addGraduateLecture(event)}>
          강의 추가
        </Button>
        <div className="flex justify-center items-center space-x-2 -mt-8">
          <Button
            onClick={(event) => handleFirst(event)}
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
    </Form>
  );
}
