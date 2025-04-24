'use client'

import React, { useEffect, useState } from 'react'
import UserEmailInput from '../components/UserEmailInput'
import UserPasswordInput from '../components/UserPasswordInput'
import SubmitButton from '../components/SubmitButton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

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

      localStorage.setItem('accessToken', data.accessToken);

      alert(`${data.user.nickname}님, 환영합니다!`);

      router.push('/');
    } catch (error) {
      console.error('로그인 중 오류:', error)
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.push('/items');
    } else {
      alert("액세스토큰이없음");
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <UserEmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
      <UserPasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
      <SubmitButton label={"로그인"} />
      <div className='flex justify-center'>
        <span>판다마켓이 처음이신가요?</span>
        <Link href={"/signup"}><span className='text-blue-600 underline'>회원가입</span></Link>
      </div>
    </form>
  )
}

export default SigninPage