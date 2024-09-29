import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

export function useLecture() {
  const { control, watch, getValues } = useFormContext();
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

  function handleAddLecture(bool) {
    appendLecture({
      lectureName: "",
      lectureCode: "",
      year: "",
      group: "",
      majorRequired: false,
      isGrad: bool,
      atNight: false,
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

  const handlePageChange = (index) => {
    setCurrentIndex(index); // 드롭다운에서 선택된 인덱스 변경
  };

  return [
    lectureFields,
    currentIndex,
    classroomGroupOptions,
    handleAddLecture,
    handleRemoveLecture,
    handlePageChange,
  ];
}
