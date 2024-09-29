import { useState } from "react";
import ErrorAlert from "../alerts/ErrorAlert";
import { Link } from "react-router-dom";
import { useStepState } from "../context/StepContext";
import ThemeToggle from "../themes/ThemeToggle";
import putsLogoSquare from "../assets/puts_logo_square.png";

const Navbar = () => {
  const { currentStep, setCurrentStep } = useStepState();

  console.log(currentStep);

  function handleStep() {
    setCurrentStep(0);
  }

  const [isErrored, setIsErrored] = useState(false);

  function handleError() {
    setIsErrored((prevState) => !prevState);
  }

  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        {/* <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-base-content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div> */}
        <Link
          to="/"
          className="btn btn-ghost text-2xl text-base-content"
          onClick={handleStep}
        >
          <img src={putsLogoSquare} alt="PUTS Logo" className="h-8" />
        </Link>
      </div>
      <div className="navbar-center">
        {/* <Link
          to="/"
          className="btn btn-ghost text-2xl text-base-content"
          onClick={handleStep}
        >
          <img src={putsLogo} alt="PUTS Logo" className="h-8" />
        </Link> */}
      </div>
      <div className="navbar-end">
        <div className="flex justify-center items-center h-5 w-5 mr-4">
          <ThemeToggle />
        </div>
        <Link to="/search">
          <button className="btn btn-ghost btn-circle text-base-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </Link>
      </div>
      {isErrored ? (
        <div>
          <ErrorAlert />
        </div>
      ) : undefined}
    </div>
  );
};

export default Navbar;
