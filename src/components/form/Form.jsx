import PrevNextButton from "../PrevNextButton";

// Form 기본 레이아웃, h2 title과 이전, 다음 버튼 디자인 및 경로 지정하는 컴포넌트
export default function Form({ title, prev, next, children }) {
  return (
    <div className="flex flex-1 justify-center bg-base-200 min-h-screen">
      <form className="form-control p-6 bg-base-100 shadow-lg rounded w-full my-6 mr-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-left text-base-content">
          {title}
        </h2>
        {children}
        <div className="mt-auto">
          <PrevNextButton prev={prev} next={next} />
        </div>
      </form>
    </div>
  );
}
