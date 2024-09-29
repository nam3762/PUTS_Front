// 사용자 입력 form에서 Prev, Next 버튼을 묶은 컴포넌트
export default function PrevNextButton({ onSubmitPrev, onSubmitNext }) {
  return (
    <div className="flex justify-between mt-4">
      <button
        type="button" // submit 대신 button으로 설정하여 이전 페이지로 이동만 처리
        className="btn btn-primary"
        onClick={onSubmitPrev} // 이전 버튼 클릭 시 실행
      >
        이전
      </button>
      <button
        type="button" // 다음 버튼은 form 제출을 유도
        className="btn btn-primary"
        onClick={onSubmitNext}
      >
        다음
      </button>
    </div>
  );
}
