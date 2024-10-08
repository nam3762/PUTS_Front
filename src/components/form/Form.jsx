import React, { useState } from "react";
import PrevNextButton from "../PrevNextButton";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // navigate 추가
import { useStepState } from "../../context/StepContext";

export default function Form({ title, prev, next, children, helpContent }) {
  const { handleSubmit } = useFormContext(); // React Hook Form에서 handleSubmit 가져오기
  const navigate = useNavigate(); // useNavigate 훅 사용하여 navigate 정의
  const { handlePlusStep, handleMinusStep } = useStepState();

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

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

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-1 justify-center bg-base-200 min-h-screen">
      <form
        className="form-control p-6 bg-base-100 shadow-lg rounded w-full my-6 mr-6 flex flex-col"
        onSubmit={handleSubmit(onSubmitNext)}
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6 text-left text-base-content">
            {title}
          </h2>
          <button
            type="button"
            className="btn btn-sm text-xs"
            onClick={openModal}
          >
            도움말
          </button>
        </div>
        {children}
        <div className="mt-auto">
          <PrevNextButton
            onSubmitPrev={onSubmitPrev}
            onSubmitNext={handleSubmit(onSubmitNext)}
          />
        </div>
      </form>

      {/* 모달 */}
      {isModalOpen && (
        <div className="modal modal-open text-base-content">
          <div className="modal-box">
            <h3 className="font-bold text-lg">도움말</h3>
            <div className="py-4">
              {/* 페이지에서 전달된 helpContent를 렌더링 */}
              {helpContent}
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={closeModal}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
