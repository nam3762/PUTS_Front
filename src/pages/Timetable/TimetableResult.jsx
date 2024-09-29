import Form from "../../components/form/Form";
import React, { useState, useEffect } from "react";

export default function TimetableResult() {
  const [counter, setCounter] = useState(60); // 초 단위로 설정

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
    }, 1000); // 1초마다 실행

    // 컴포넌트가 언마운트될 때 interval 정리
    return () => clearInterval(interval);
  }, []);

  return (
    <Form
      title="STEP 8: 시간표 선택 및 저장"
      prev="/timetable/timetablecustomizing"
    >
      <h1 className="text-base-content">시간표 제작까지 ...</h1>
      {/* <progress class="progress w-56"></progress> */}
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max text-base-content">
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": 2 }}></span>
          </span>
          hours
        </div>
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": 59 }}></span>
          </span>
          min
        </div>
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": counter }}></span>
          </span>
          sec
        </div>
      </div>
      <h1>Excel 파일로 저장하기</h1>
    </Form>
  );
}
