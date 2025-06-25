import React from "react";

const UserPasswordInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return (
    <div className="flex flex-col items-center p-10">
      <div>비밀번호</div>
      <input
        type="password"
        className="w-full border border-black bg-gray-200"
        placeholder="비밀번호를 입력해주세요"
        {...props}
        ref={ref}
      />
    </div>
  );
});

UserPasswordInput.displayName = 'UserPasswordInput';

export default UserPasswordInput;