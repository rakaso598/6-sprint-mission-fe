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

      // 일반 쿠키에 저장 (XSS 취약점 주의)
      document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${60 * 60}; secure:false; httpOnly`;
      document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=${60 * 60 * 24 * 7}; secure:false; httpOnly`;

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