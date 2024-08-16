import { useNavigate } from "react-router-dom";
import { useStepState } from "../context/StepContext";

// 사용자 입력 form에서 Prev, Next 버튼을 묶은 컴포넌트
// Prev는 이전 페이지, Next는 다음 페이지의 url을 props로 받는다.
export default function PrevNextButton({ prev, next }) {
  // 현재 form 제출 로직 구현 안 되어 있음

  // 여기서 Step을 handle하게끔 로직 작성함
  const { handlePlusStep, handleMinusStep, currentStep } = useStepState();
  const navigate = useNavigate();

  const handlePrevClick = () => {
    handleMinusStep();
    navigate(prev);
  };

  const handleNextClick = () => {
    handlePlusStep();
    navigate(next);
  };

  return (
    <div className="flex justify-between mt-4">
      <button
        type="button"
        className="btn btn-primary"
        onClick={handlePrevClick}
        // disabled={currentStep === 0}
      >
        이전
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleNextClick}
        // disabled={currentStep === 8}
      >
        다음
      </button>
    </div>
  );
}
