import React from "react";
import TUserInput from "../../type/TUserInput";

function UserEmailInput({ value, onChange }: TUserInput) {
  return (
    <div className="flex flex-col items-center p-10">
      <div>로그인</div>
      <input
        className="w-full border border-black bg-gray-200"
        type="email"
        id="email"
        value={value}
        onChange={onChange}
        placeholder="이메일을 입력해주세요"
      />
    </div>
  );
}

export default UserEmailInput;
