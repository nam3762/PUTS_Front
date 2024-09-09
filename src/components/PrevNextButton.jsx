// 사용자 입력 form에서 Prev, Next 버튼을 묶은 컴포넌트
export default function PrevNextButton({ onSubmitPrev, onSubmitNext }) {
  return (
    <div className="flex justify-between mt-4">
      <button
        type="button" // submit 대신 button으로 변경
        className="btn btn-primary"
        onClick={onSubmitPrev} // 이전 버튼 클릭 시 실행
      >
        이전
      </button>
      <button
        type="submit" // 다음 버튼은 form 제출을 유도
        className="btn btn-primary"
        onClick={onSubmitNext} // 다음 버튼 클릭 시 유효성 검사 후 실행
      >
        다음
      </button>
    </div>
  );
}
