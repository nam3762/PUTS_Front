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
};

function App() {
  const methods = useForm({ defaultValues });
  const { control } = methods; // methods에서 control 객체를 가져옵니다.

  return (
    <BrowserRouter>
      <StepProvider>
        <FormProvider {...methods}>
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
        </FormProvider>
      </StepProvider>
    </BrowserRouter>
  );
}

export default App;
