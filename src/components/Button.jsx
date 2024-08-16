// 추가 삭제용 버튼 컴포넌트

export default function Button({ onClick, style, children }) {
  return (
    <button onClick={onClick} className={`btn btn-${style} mb-4 max-w-28`}>
      {children}
    </button>
  );
}
