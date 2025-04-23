import React from 'react';

function SubmitButton({ label }) {
  return (
    <div className='flex justify-center'>
      <button
        type="submit"
        className='w-20 h-12 bg-blue-400 border boder-black'
      >
        {label}
      </button>
    </div>
  );
}

export default SubmitButton;