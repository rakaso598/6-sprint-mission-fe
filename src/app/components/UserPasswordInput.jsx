import React from 'react'

function UserPasswordInput() {
  return (
    <div className='flex flex-col items-center px-[16px] py-[16px]'>
      <div>비밀번호</div>
      <input
        type='password'
        className='w-full border border-black bg-gray-200' />
    </div>
  )
}

export default UserPasswordInput