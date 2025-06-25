import React from "react";

interface SubmitButtonProps {
  label: string;
  disabled?: boolean; // disabled 프롭은 선택적으로 정의합니다.
}

function SubmitButton({ label, disabled }: SubmitButtonProps) {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        className="w-24 h-12 bg-blue-400 border boder-black m-10"
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
}

export default SubmitButton;
