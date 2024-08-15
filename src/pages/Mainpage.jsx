import { Link } from "react-router-dom";
import { useStepState } from "../context/StepContext";

export default function Mainpage() {
  const { handlePlusStep } = useStepState();

  return (
    <div className="flex flex-1 items-center justify-center bg-base-200 min-h-screen">
      <div className="text-center w-full">
        <div className="max-w-md mx-auto">
          <h1 className="text-5xl font-bold text-base-content">PUTS</h1>
          <p className="py-6 text-base-content">
            The best timetable generator for <br></br>CBNU School of Computer
            Science
          </p>
          <Link
            to="/timetable"
            className="btn btn-primary"
            onClick={handlePlusStep}
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
