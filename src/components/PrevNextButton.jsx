import { useNavigate } from "react-router-dom";
import { useStepState } from "../context/StepContext";

// 사용자 입력 form에서 Prev, Next 버튼을 묶은 컴포넌트
//  props: prev는 이전 페이지, next는 다음 페이지의 url, prevClick, nextClick은 현재 입력된 form data context로 업데이트
export default function PrevNextButton({ prev, next }) {
  // 여기서 Step을 handle하게끔 로직 작성
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
        type="submit"
        className="btn btn-primary"
        onClick={handlePrevClick}
        // disabled={currentStep === 0}
      >
        이전
      </button>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={handleNextClick}
        // disabled={currentStep === 8}
      >
        다음
      </button>
    </div>
  );
}
