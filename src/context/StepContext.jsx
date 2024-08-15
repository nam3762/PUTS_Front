import { useState, createContext, useContext } from "react";

const StepContext = createContext();

export function StepProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handlePlusStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleMinusStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0)); // Prevents going below 0
  };

  return (
    <StepContext.Provider
      value={{ currentStep, setCurrentStep, handlePlusStep, handleMinusStep }}
    >
      {children}
    </StepContext.Provider>
  );
}

// Custom Hook
export function useStepState() {
  const value = useContext(StepContext);
  if (value === undefined) {
    throw new Error("useStepState should be used within StepProvider");
  }
  return value;
}
