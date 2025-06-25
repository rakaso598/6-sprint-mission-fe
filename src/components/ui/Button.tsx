import styled, { css } from "styled-components";
import React from "react";
import Image from "next/image";
import SpinnerSvg from "../../assets/images/ui/spinner.svg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  $pill?: boolean;
  $appearance?: "primary" | "secondary";
  children?: React.ReactNode;
}

export const buttonStyle = css<ButtonProps>`
  background-color: ${({ theme }) => theme.colors.blue[0]};
  color: #ffffff;
  border-radius: ${({ $pill }) => ($pill ? "999px" : "8px")};
  padding: 14px 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue[1]};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.blue[2]};
    outline: none;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[0]};
    cursor: not-allowed;
    pointer-events: none;
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
        border-color: ${theme.colors.gray[0]}; 
        color: ${theme.colors.gray[1]};
      }
    `}
`;

const BaseButton: React.FC<ButtonProps> = ({
  isLoading,
  children,
  onClick,
  ...props
}) => {
  return (
    <button onClick={onClick} {...props}>
      {isLoading ? (
        <Image src={SpinnerSvg} alt="로딩 스피너" width={24} height={24} />
      ) : (
        children
      )}
    </button>
  );
};

const Button = styled(BaseButton)<ButtonProps>`
  ${buttonStyle}
`;

export default Button;