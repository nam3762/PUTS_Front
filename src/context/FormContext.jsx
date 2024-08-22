// Form 상태를 전부 관리하는 Context API
import React, { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    timetableName: "",
    password: "",
    timetableDescription: "",

    professors: [
      {
        professorName: "",
        professorCode: "",
        isProfessor: true,
        offTimes: [],
        hopeTimes: [],
      },
    ],

    classrooms: [{ buildingName: "", classroomNumber: "", capacity: null }],

    classroomGroups: [
      {
        groupId: null,
        groupName: "",
      },
    ],

    lectures: [
      {
        lectureName: "",
        lectureCode: "",
        year: "",
        group: "",
        divisionGroup: [
          {
            divisionName: "",
            sectionGroup: { sectionName: "", sectionTime: null },
            capacity: null,
            professor: "",
          },
        ],
      },
    ],

    postgraduateLectures: [
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
    ],
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
