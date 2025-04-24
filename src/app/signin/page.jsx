'use client'

import React, { useState } from 'react'
import UserEmailInput from '../components/UserEmailInput'
import UserPasswordInput from '../components/UserPasswordInput'
import SubmitButton from '../components/SubmitButton'

function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //요청
      const response = await fetch('https://panda-market-api.vercel.app/auth/signIn', {
        method: 'POST',
        credentials: 'omit',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "abababcd1@email.com",
          password: "abababcd",
        }),
      });
      //응답
      const data = await response.json();
      alert(data.user.nickname);

      // 액세스토큰 & 리프레쉬토큰
      const accessToken = data.accessToken; // 액세스토큰 추출
      const refreshToken = data.refreshToken; // 리프레쉬토큰 추출

      const accessTokenExpiry = new Date(Date.now() + 60 * 60 * 1000).toUTCString(); // 액세스토큰 유효기간
      document.cookie = `accessToken=${accessToken}; expires=${accessTokenExpiry}; path=/; HttpOnly;`; // 브라우저 쿠키에 저장

      const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString(); // 리프레쉬토큰 유효기간
      document.cookie = `refreshToken=${refreshToken}; expires=${refreshTokenExpiry}; path=/; HttpOnly;`; // 브라우저 쿠키에 저장

      alert(`${accessToken}`); // 테스트: 액세스토큰의 값 확인해보기 (성공)
    } catch (error) {
      console.error('로그인 중 오류:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <UserEmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
      <UserPasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
      <SubmitButton label={"로그인"} />
    </form>
  )
}

export default SigninPage