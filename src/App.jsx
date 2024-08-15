import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
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

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  function handleStep() {
    setCurrentStep((prev) => prev + 2);
  }

  return (
    <BrowserRouter>
      <main className="flex items-center flex-col min-h-screen w-full font-sans">
        <Navbar />
        <div className="flex w-full flex-row bg-base-200">
          <Steps />
          <HorizontalDivider />
          <Routes>
            <Route path="/" element={<Mainpage />}></Route>
            <Route path="/timetable" element={<TimetableGenerator />}></Route>
            <Route
              path="/timetable/professors"
              element={<Professors />}
            ></Route>
            <Route
              path="/timetable/classrooms"
              element={<Classrooms />}
            ></Route>
            <Route
              path="/timetable/classroomgroups"
              element={<ClassroomGroups />}
            ></Route>
            <Route path="/timetable/lectures" element={<Lectures />}></Route>
            <Route
              path="/timetable/postgraduatelectures"
              element={<PostgraduateLectures />}
            ></Route>
          </Routes>
        </div>
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;
