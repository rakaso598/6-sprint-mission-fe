'use client'

import React, { useEffect, useState } from 'react'
import UserEmailInput from '../components/UserEmailInput'
import UserPasswordInput from '../components/UserPasswordInput'
import SubmitButton from '../components/SubmitButton'
import { useRouter } from 'next/navigation'
import UserNicknameInput from '../components/UserNicknameInput'
// import UserPasswordConfirmInput from '../components/UserPasswordConfirmInput'

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  // const [passwordConfirm, setPasswordConfirm] = useState('');
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
          nickname: nickname,
          email: email,
          password: password,
          // passwordConfirmation: passwordConfirm
        }),
      });
      //응답
      if (!response.ok) {
        alert("회원가입 중 오류가 발생했습니다. 재시도해주세요.")
        throw new Error("회원가입 중 오류가 발생했습니다.");
      }

      const data = await response.json();

      localStorage.setItem('accessToken', data.accessToken);
      alert(`${data}님, 회원가입을 환영합니다!`);

      router.push('/');
    } catch (error) {
      console.error('회원가입 요청 중 오류:', error)
      setError(error.message)
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.push('/items');
    } else {
      alert("accessToken이 없음. 회원가입 이후 로그인 해주세요.");
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <UserEmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
      <UserNicknameInput value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <UserPasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
      {/* <UserPasswordConfirmInput value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} /> */}
      {error && <div className='text-red-500 flex justify-center'>{error}</div>}
      <SubmitButton label={"회원가입"} />
    </form>
  )
}

export default SignupPage