// src/components/UI/TextareaItem.tsx

import React from "react";
import styled from "styled-components";
import { UseFormRegisterReturn } from "react-hook-form";

// 스타일드 컴포넌트를 사용하여 기본 <textarea> 스타일링
const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 120px; /* 기본 높이 설정 */
  padding: 12px;
  border: 1px solid #e2e8f0; /* Tailwind CSS gray-300과 유사 */
  border-radius: 8px; /* 둥근 모서리 */
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  resize: vertical; /* 수직 크기 조절 허용 */
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05); /* 미묘한 그림자 */

  &:focus {
    outline: none;
    border-color: #3b82f6; /* Tailwind CSS blue-500과 유사 */
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25); /* 포커스 링 효과 */
  }

  &::placeholder {
    color: #94a3b8; /* Tailwind CSS gray-400과 유사 */
  }

  /* Tailwind CSS의 focus:ring, focus:border 등의 효과를 직접 구현 */
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

// TextareaItem 컴포넌트의 props 타입을 정의
interface TextareaItemProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string; // HTML input의 id
  placeholder?: string; // 플레이스홀더 텍스트
  register?: UseFormRegisterReturn; // react-hook-form의 register prop
  // 추가적으로 필요한 props가 있다면 여기에 정의
}

const TextareaItem: React.FC<TextareaItemProps> = ({
  id,
  placeholder,
  register,
  ...rest
}) => {
  return (
    <StyledTextarea
      id={id}
      placeholder={placeholder}
      {...register} // react-hook-form의 register 속성들을 스프레드 연산자로 전달
      {...rest} // 나머지 HTML textarea 속성들 (예: name, value, onChange 등)
    />
  );
};

export default TextareaItem;
