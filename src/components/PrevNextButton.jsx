import { Link } from "react-router-dom";

// 사용자 입력 form에서 Prev, Next 버튼을 묶은 컴포넌트
// Prev는 이전 페이지, Next는 다음 페이지의 url을 props로 받는다.
export default function PrevNextButton({ prev, next }) {
  // 현재 form 제출 로직 구현 안 되어 있음

  return (
    <div className="flex flex-row justify-between">
      <Link to={prev} className="btn btn-primary py-4 px-8">
        이전
      </Link>

      <Link to={next} className="btn btn-success py-4 px-8">
        다음
      </Link>
    </div>
  );
}
