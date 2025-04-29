import React from 'react'

function UserPasswordInput({ value, onChange }) {
  return (
    <div className='flex flex-col items-center p-10'>
      <div>비밀번호</div>
      <input
        type='password'
        className='w-full border border-black bg-gray-200'
        value={value}
        onChange={onChange}
        placeholder='비밀번호를 입력해주세요'
      />
    </div>
  )
}

export default UserPasswordInput