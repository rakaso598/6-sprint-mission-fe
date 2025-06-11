import React from "react";

function SubmitButton({ label }: { label: string }) {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        className="w-24 h-12 bg-blue-400 border boder-black m-10"
      >
        {label}
      </button>
    </div>
  );
}

export default SubmitButton;
