// InputItem.tsx (이전과 동일하게 유지됩니다. 이 자체가 문제는 아닐 가능성이 높습니다.)
import React, { InputHTMLAttributes } from "react";
import styled, { css, DefaultTheme } from "styled-components";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputStyleProps {
  $error?: boolean;
  theme: DefaultTheme;
}

export const inputStyle = css<InputStyleProps>`
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.gray[1]};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 12px;
  font-size: 16px;
  line-height: 24px;
  width: 100%;
  outline: none;
  border: 1px solid transparent;

  ${({ $error, theme }) =>
    $error &&
    css`
      border-color: ${theme.colors.red[0]};
    `}

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[0]};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.blue[0]};
  }
`;

export const InputField = styled.input<InputStyleProps>`
  ${inputStyle}
`;

interface InputItemProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string;
  // FieldValues 타입 자체는 문제가 없습니다.
  // 이 에러는 사용 맥락에서 발생할 가능성이 높습니다.
  register?: UseFormRegisterReturn<string>;
}

function InputItem({
  id,
  label,
  error,
  register,
  ...inputProps
}: InputItemProps) {
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputField
        id={id}
        $error={!!error}
        {...inputProps}
        {...register} // 여기서 Type 'FieldValues' does not satisfy the constraint 'string'.ts(2344) 에러가 발생한다고 하셨습니다.
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

export default InputItem;
