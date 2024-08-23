import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { StepProvider } from "./context/StepContext";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Mainpage from "./pages/Mainpage";
import Steps from "./components/Steps";
import TimetableGenerator from "./pages/Timetable/TimetableGenerator";
import Professors from "./pages/Timetable/Professors";
import HorizontalDivider from "./components/HorizontalDivider";
import Classrooms from "./pages/Timetable/Classrooms";
import ClassroomGroups from "./pages/Timetable/ClassroomGroups";
import Lectures from "./pages/Timetable/Lectures";
import PostgraduateLectures from "./pages/Timetable/PostgraduateLectures";
import AutoScroll from "./components/AutoScroll";
import { FormProvider, useForm } from "react-hook-form";

const defaultValues = {
  timetableName: "",
  password: "",
  timetableDescription: "",
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
    },
    {
      buildingName: "S4-1",
      classroomNumber: "102",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "103",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "104",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "106",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "201",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "202",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "203",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "205",
      capacity: 60,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "206",
      capacity: 60,
    },
    {
      buildingName: "E8-7",
      classroomNumber: "101",
      capacity: 100,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "301",
      capacity: 40,
    },
  ],
  classroomGroups: [
    {
      groupName: "이론",
      classrooms: [],
    },
    {
      groupName: "실습",
      classrooms: [],
    },
    {
      groupName: "대형",
      classrooms: [],
    },
    {
      groupName: "기타",
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
      gradClassrooms: [], // 대학원 강의실
      divisionGroup: [
        {
          divisionName: "",
          sectionGroup: [],
          capacity: null,
          professor: "", // 교수 코드
        },
      ],
    },
  ],
};

function App() {
  const methods = useForm({ defaultValues });

  return (
    <BrowserRouter>
      <FormProvider {...methods}>
        <StepProvider>
          <main className="flex items-center flex-col min-h-screen w-full font-sans">
            <Navbar />
            <div className="flex flex-row w-full bg-base-200">
              <Steps />
              <HorizontalDivider />
              <Routes>
                <Route path="/" element={<Mainpage />}></Route>
                <Route
                  path="/timetable"
                  element={
                    <>
                      <AutoScroll />
                      <TimetableGenerator />
                    </>
                  }
                ></Route>
                <Route
                  path="/timetable/professors"
                  element={
                    <>
                      <AutoScroll />
                      <Professors />
                    </>
                  }
                ></Route>
                <Route
                  path="/timetable/classrooms"
                  element={
                    <>
                      <AutoScroll />
                      <Classrooms />
                    </>
                  }
                ></Route>
                <Route
                  path="/timetable/classroomgroups"
                  element={
                    <>
                      <AutoScroll />
                      <ClassroomGroups />
                    </>
                  }
                ></Route>
                <Route
                  path="/timetable/lectures"
                  element={
                    <>
                      <AutoScroll />
                      <Lectures />
                    </>
                  }
                ></Route>
                <Route
                  path="/timetable/postgraduatelectures"
                  element={
                    <>
                      <AutoScroll />
                      <PostgraduateLectures />
                    </>
                  }
                ></Route>
              </Routes>
            </div>
            <Footer />
          </main>
        </StepProvider>
      </FormProvider>
    </BrowserRouter>
  );
}

export default App;
