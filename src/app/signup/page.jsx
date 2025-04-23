'use client'

import React, { useState } from 'react'
import UserEmailInput from '../components/UserEmailInput'
import UserPasswordInput from '../components/UserPasswordInput'
import SubmitButton from '../components/SubmitButton'

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //요청
      const response = fetch('https://panda-market-api.vercel.app/auth/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: "abababcd1@email.com",
          nickname: "abababcd1",
          password: "abababcd",
          passwordConfirmation: "abababcd"
        }),
      });
      //응답
      const data = await response.json();
      console.log('회원가입 성공:', data);

    } catch (error) {
      console.error('회원가입 요청 중 오류:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <UserEmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
      <UserPasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
      <SubmitButton label={"회원가입"} />
    </form>
  )
}

export default SignupPage