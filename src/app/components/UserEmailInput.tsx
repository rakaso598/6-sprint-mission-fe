import React from "react";

// forwardRef에 제네릭을 사용하여 ref의 타입을 명시합니다.
// 첫 번째 제네릭은 ref가 연결될 DOM 요소의 타입 (HTMLInputElement)
// 두 번째 제네릭은 컴포넌트가 받을 props의 타입 (여기서는 register가 넘겨주는 props)
const UserEmailInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return (
    <div className="flex flex-col items-center p-10">
      <div>로그인</div>
      <input
        className="w-full border border-black bg-gray-200"
        type="email"
        id="email"
        placeholder="이메일을 입력해주세요"
        {...props} // register에서 전달하는 props를 여기에 적용
        ref={ref} // ref를 input 요소에 연결 (이제 타입이 일치!)
      />
    </div>
  );
});

UserEmailInput.displayName = 'UserEmailInput';

export default UserEmailInput;