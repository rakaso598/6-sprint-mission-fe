import React from 'react'

function UserEmailInput({ value, onChange }) {
  return (
    <div className='flex flex-col items-center px-[16px] py-[16px]'>
      <div>로그인</div>
      <input className='w-full border border-black bg-gray-200'
        type='email'
        id="email"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default UserEmailInput