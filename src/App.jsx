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
import SearchPage from "./pages/SearchPage";
import TimetableResult from "./pages/Timetable/TimetableResult";
import About from "./pages/About";
import { FormProvider, useForm } from "react-hook-form";
import { defaultValues } from "./values/defaultValues";
import TimetableCustomizing from "./pages/Timetable/TimetableCustomizing";
import TimetableInfo from "./pages/Timetable/TimetableInfo";

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
                <Route path="/search" element={<SearchPage />}></Route>
                <Route
                  path="/about"
                  element={
                    <>
                      <AutoScroll />
                      <About />
                    </>
                  }
                ></Route>
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
                <Route
                  path="/timetable/timetablecustomizing"
                  element={
                    <>
                      <AutoScroll />
                      <TimetableCustomizing />
                    </>
                  }
                ></Route>
                <Route
                  path="/timetable/timetableresult"
                  element={
                    <>
                      <AutoScroll />
                      <TimetableResult />
                    </>
                  }
                ></Route>
                <Route
                  path="/timetable/timetableinfo"
                  element={
                    <>
                      <TimetableInfo />
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
