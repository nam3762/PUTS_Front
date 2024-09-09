// Form.jsx

import PrevNextButton from "../PrevNextButton";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // navigate 추가
import { useStepState } from "../../context/StepContext";

export default function Form({ title, prev, next, children }) {
  const { handleSubmit } = useFormContext(); // React Hook Form에서 handleSubmit 가져오기
  const navigate = useNavigate(); // useNavigate 훅 사용하여 navigate 정의
  const { handlePlusStep, handleMinusStep } = useStepState();

  const onSubmitNext = (data) => {
    // 데이터 유효성 검사가 완료되면 다음 페이지로 이동
    handlePlusStep(); // 스텝 증가
    console.log("Form data submitted (Next):", data);
    navigate(next); // navigate를 통해 다음 페이지로 이동
  };

  const onSubmitPrev = () => {
    // 이전 페이지로 이동
    handleMinusStep(); // 스텝 감소
    console.log("Previous step triggered");
    navigate(prev); // 이전 페이지로 이동
  };

  return (
    <div className="flex flex-1 justify-center bg-base-200 min-h-screen">
      <form
        className="form-control p-6 bg-base-100 shadow-lg rounded w-full my-6 mr-6 flex flex-col"
        // 폼 제출 시 handleSubmit을 통해 유효성 검사 후 이동 처리
        onSubmit={handleSubmit(onSubmitNext)}
      >
        <h2 className="text-2xl font-bold mb-6 text-left text-base-content">
          {title}
        </h2>
        {children}
        <div className="mt-auto">
          <PrevNextButton
            prev={prev}
            next={next}
            onSubmitPrev={onSubmitPrev} // 이전 클릭 시 onSubmitPrev 호출
            onSubmitNext={handleSubmit(onSubmitNext)} // 다음 클릭 시 유효성 검사를 거친 후 onSubmitNext 호출
          />
        </div>
      </form>
    </div>
  );
}
