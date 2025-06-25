"use client";

import React, { useEffect, useState } from "react";
import UserEmailInput from "../components/UserEmailInput";
import UserPasswordInput from "../components/UserPasswordInput";
import SubmitButton from "../components/SubmitButton";
import { useRouter } from "next/navigation";
import UserNicknameInput from "../components/UserNicknameInput";
// import UserPasswordConfirmInput from '../components/UserPasswordConfirmInput'

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    // 이벤트 타입 명시
    e.preventDefault();

    try {
      // 요청
      // 회원가입 API 엔드포인트가 'auth/signUp'이어야 할 수 있습니다. 현재 signIn으로 되어 있어 확인이 필요합니다.
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/auth/signIn`, {
        // 이 부분을 /auth/signUp으로 수정해야 할 수 있습니다.
        method: "POST",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: nickname,
          email: email,
          password: password,
          // passwordConfirmation: passwordConfirm
        }),
      });
      // 응답
      if (!response.ok) {
        alert("회원가입 중 오류가 발생했습니다. 재시도해주세요.");
        throw new Error("회원가입 중 오류가 발생했습니다.");
      }

      const data = await response.json();

      localStorage.setItem("accessToken", data.accessToken);
      // data.user.nickname이 필요할 수 있습니다. 현재 data는 전체 응답 객체일 수 있습니다.
      alert(`${data.user?.nickname || "회원"}님, 회원가입을 환영합니다!`);

      router.push("/");
    } catch (err: unknown) {
      // 에러 타입을 unknown으로 지정하고 타입 가드 사용
      console.error("회원가입 요청 중 오류:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/items");
    } else {
      alert("accessToken이 없음. 회원가입 이후 로그인 해주세요.");
    }
  }, [router]); // ✨ router를 의존성 배열에 추가

  return (
    <form onSubmit={handleSubmit}>
      <UserEmailInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <UserNicknameInput
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <UserPasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* <UserPasswordConfirmInput value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} /> */}
      {error && <div className="text-red-500 flex justify-center">{error}</div>}
      <SubmitButton label={"회원가입"} />
    </form>
  );
}

export default SignupPage;
