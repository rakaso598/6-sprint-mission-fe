import React from 'react'
import UserEmailInput from '../components/UserEmailInput'
import UserPasswordInput from '../components/UserPasswordInput'
import SubmitButton from '../components/SubmitButton'

function signinPage() {
  return (
    <form>
      <UserEmailInput />
      <UserPasswordInput />
      <SubmitButton label={"로그인"} />
    </form>
  )
}

export default signinPage