import Form from "../../components/form/Form";
import InputText from "../../components/form/InputText";

// 사용자 입력 첫 화면 (STEP 1: 시간표 정보 입력)
export default function TimetableGenerator() {
  return (
    <Form
      title="
      STEP 1: 시간표 정보"
      prev="/"
      next="/timetable/professors"
    >
      <div className="form-control mb-4">
        <span className="my-2 label-text text-right text-xs text-green-500 font-bold">
          모든 정보는 서버에 저장되며 언제든 불러올 수 있습니다.
        </span>
        <span className="label-text text-base-content font-bold">
          시간표 이름
        </span>
        <InputText name="timetableName"></InputText>
      </div>
      <div className="form-control mb-4">
        <div className="flex items-center">
          <span className="label-text text-base-content font-bold">
            비밀번호
          </span>
          <div
            className="tooltip ml-2"
            data-tip="시간표 생성 이후에 비밀번호를 이용하여 접근할 수 있습니다."
          >
            <span className="btn btn-xs btn-circle text-sm h-5 w-5">?</span>
          </div>
        </div>
        <label
          className="input input-bordered text-base-content flex items-center gap-2 mt-2"
          htmlFor="password"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70 text-base-content"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input type="password" id="password" className="grow" />
        </label>
      </div>
      <div className="form-control mb-4">
        <label className="label" htmlFor="Description">
          <span className="label-text text-base-content font-bold">
            시간표 설명
          </span>
        </label>
        <textarea
          id="Description"
          className="textarea textarea-bordered text-base-content w-full"
          placeholder="시간표 설명을 적어주세요."
        ></textarea>
      </div>
    </Form>
  );
}
