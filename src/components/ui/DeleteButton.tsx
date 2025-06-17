import React from "react";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../../assets/images/icons/ic_x.svg"; // 아이콘 경로 확인

// styled-components의 테마를 사용하기 위해 DefaultTheme 임포트 (필요한 경우)
import { DefaultTheme } from "styled-components";

// styled-components prop 타입 정의 (theme를 사용할 경우)
interface ButtonPropsWithTheme {
  theme: DefaultTheme;
}

const Button = styled.button<ButtonPropsWithTheme>`
  // theme prop이 필요한 경우 제네릭으로 전달
  background-color: ${({ theme }) => theme.colors.gray[0]};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none; // 버튼 기본 테두리 제거
  cursor: pointer; // 마우스 오버 시 포인터 변경

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue[0]};
  }
`;

// DeleteButton 컴포넌트의 props 인터페이스 정의
interface DeleteButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // 클릭 이벤트 핸들러
  label?: string; // label prop의 타입을 'string'으로 정확하게 수정했습니다.
}

function DeleteButton({ onClick, label }: DeleteButtonProps) {
  return (
    <Button type="button" aria-label={`${label} 삭제`} onClick={onClick}>
      <CloseIcon />
    </Button>
  );
}

export default DeleteButton;
