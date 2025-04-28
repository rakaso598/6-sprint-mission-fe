import React from 'react';

function UserNicknameInput({ value, onChange }) {
  return (
    <div className='flex flex-col items-center px-[16px] py-[16px]'>
      <div>닉네임</div>
      <input
        className='w-full border border-black bg-gray-200'
        type='text'
        id="nickname"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default UserNicknameInput;