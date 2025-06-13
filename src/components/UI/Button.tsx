import styled, { css } from "styled-components";
import { ReactComponent as Spinner } from "../../assets/images/ui/spinner.svg";
import React from "react";

// 1. Button 컴포넌트가 받을 props의 타입을 정의합니다.
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  $pill?: boolean;
  $appearance?: "primary" | "secondary";
  children?: React.ReactNode;
}

// 2. 재사용 가능한 CSS 스타일을 정의합니다.
export const buttonStyle = css<ButtonProps>`
  background-color: ${({ theme }) => theme.colors.blue[0]};
  color: #ffffff;
  border-radius: ${({ $pill }) => ($pill ? "999px" : "8px")};
  padding: 14px 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; // 기본 커서 추가

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue[1]};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.blue[2]};
    outline: none; // 기본 포커스 아웃라인 제거 (필요시)
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[0]};
    cursor: not-allowed; // 비활성화 커서 변경
    pointer-events: none; // 클릭 이벤트 방지
  }

  ${({ $appearance, theme }) =>
    $appearance === "secondary" &&
    css`
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.blue[0]};
      color: ${theme.colors.blue[0]};

      &:focus,
      &:hover,
      &:disabled {
        color: ${theme.colors.white};
      }
      &:disabled {
        border-color: ${theme.colors.gray[0]}; // 비활성화 시 테두리 색상
        color: ${theme.colors.gray[1]}; // 비활성화 시 텍스트 색상
      }
    `}
`;

// 3. styled-components로 감싸기 전의 기본 컴포넌트를 정의합니다.
//    여기서는 HTML button 요소를 렌더링하고 props를 전달합니다.
const BaseButton: React.FC<ButtonProps> = ({
  isLoading,
  children,
  onClick,
  ...props
}) => {
  return (
    <button onClick={onClick} {...props}>
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

// 4. BaseButton에 스타일을 적용하고, ButtonProps 타입을 전달합니다.
const Button = styled(BaseButton)<ButtonProps>`
  ${buttonStyle}
`;

export default Button;
