import React from "react";
import TUserInput from "../../type/TUserInput";

function UserNicknameInput({ value, onChange }: TUserInput) {
  return (
    <div className="flex flex-col items-center p-10">
      <div>닉네임</div>
      <input
        className="w-full border border-black bg-gray-200"
        type="text"
        id="nickname"
        value={value}
        onChange={onChange}
        placeholder="닉네임을 입력해주세요"
      />
    </div>
  );
}

export default UserNicknameInput;
