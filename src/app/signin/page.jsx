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
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //요청
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/auth/signIn`, {
        method: 'POST',
        credentials: 'omit',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      //응답

      if (!response.ok) {
        alert("로그인 중 오류가 발생했습니다. 재시도해주세요.")
        throw new Error("로그인 중 오류가 발생했습니다.");
      }
      const data = await response.json();

      localStorage.setItem('accessToken', data.accessToken);
      alert(`${data.user.nickname}님, 로그인을 환영합니다!`);
      router.push('/');

    } catch (error) {
      console.error('로그인 중 오류:', error)
      setError(error.message)
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.push('/items');
    } else {
      alert("accessToken이 없음. 로그인 해주세요.");
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <UserEmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
      <UserPasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <div className='text-red-500 flex justify-center'>{error}</div>}
      <SubmitButton label={"로그인"} />
      <div className='flex justify-center'>
        <span>판다마켓이 처음이신가요?</span>
        <Link href={"/signup"}><span className='text-blue-600 underline'>회원가입</span></Link>
      </div>
    </form>
  )
}

export default SigninPage