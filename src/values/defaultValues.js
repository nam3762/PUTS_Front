export const defaultValues = {
  timetableName: "",
  password: "",
  timetableDescription: "",
  timetableResult: 1,
  timetableLunchTimeConstraint: true,
  timetable4daysConstraint: true,
  professors: [
    {
      professorName: "",
      professorCode: "",
      isProfessor: true, // 기본 값 true, true = 교수, false = 강사
      offTimes: [{ day: "", period: "" }], // 배열 안에 객체가 존재 {day: "수요일", period: "1교시"}
      hopeTimes: [{ day: "", period: "" }],
    },
  ],

  classrooms: [
    {
      buildingName: "S4-1",
      classroomNumber: "101",
      capacity: 60,
      usage: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "102",
      capacity: 60,
      usage: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "103",
      capacity: 60,
      usage: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "104",
      capacity: 60,
      usage: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "106",
      capacity: 60,
      usage: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "201",
      capacity: 60,
      usage: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "202",
      capacity: 60,
      usage: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "203",
      capacity: 60,
      usage: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "205",
      capacity: 60,
      usage: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "206",
      capacity: 60,
      usage: 1,
    },
    {
      buildingName: "E8-7",
      classroomNumber: "101",
      capacity: 100,
      usage: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "301",
      capacity: 40,
      usage: 1,
    },
  ],
  classroomGroups: [
    {
      id: 0,
      groupName: "이론",
      classrooms: [],
    },
    {
      id: 1,
      groupName: "실습",
      classrooms: [],
    },
    {
      id: 2,
      groupName: "대형",
      classrooms: [],
    },
    {
      id: 3,
      groupName: "기타",
      classrooms: [],
    },
    {
      id: 4,
      groupName: "상관 없음",
      classrooms: [],
    },
  ],
  lectures: [
    {
      lectureName: "",
      lectureCode: "",
      year: "",
      group: "",
      majorRequired: false,
      isGrad: false, // 대학원 여부
      atNight: false, // 야간 여부
      gradClassrooms: [], // 대학원 강의실
      divisionGroup: [
        // 분반 그룹
        {
          divisionName: "",
          sectionGroup: [
            // isFixed는 여기 있어야함
          ],
          capacity: null,
          professor: "", // 교수 코드
        },
      ],
    },
  ],
};
