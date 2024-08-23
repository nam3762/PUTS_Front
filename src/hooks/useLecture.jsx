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

  const handleFirst = (event) => {
    event.preventDefault();
    setCurrentIndex(0);
  };

  const handleLast = (event) => {
    event.preventDefault();
    setCurrentIndex(lectures.length - 1);
  };

  const handlePageChange = (index) => {
    setCurrentIndex(index);
  };

  const getVisiblePages = () => {
    const totalLectures = lectures.length;
    const visiblePages = [];

    if (totalLectures <= 5) {
      for (let i = 0; i < totalLectures; i++) {
        visiblePages.push(i);
      }
    } else {
      let start = Math.max(currentIndex - 2, 0);
      let end = Math.min(start + 4, totalLectures - 1);

      if (end - start < 4) {
        start = Math.max(end - 4, 0);
      }

      for (let i = start; i <= end; i++) {
        visiblePages.push(i);
      }
    }

    return visiblePages;
  };

  return [
    lectureFields,
    currentIndex,
    classroomGroupOptions,
    handleAddLecture,
    handleRemoveLecture,
    handleFirst,
    handleLast,
    handlePageChange,
    getVisiblePages,
  ];
}
