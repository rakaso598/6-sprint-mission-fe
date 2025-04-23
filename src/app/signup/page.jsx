import React from 'react'
import UserEmailInput from '../components/UserEmailInput'
import UserPasswordInput from '../components/UserPasswordInput'
import SubmitButton from '../components/SubmitButton'

function signupPage() {
  return (
    <form>
      <UserEmailInput />
      <UserPasswordInput />
      <SubmitButton label={"회원가입"} />
    </form>
  )
}

export default signupPage