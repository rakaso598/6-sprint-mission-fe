import React, { useEffect, ReactNode, MouseEvent } from "react";
import ReactDOM from "react-dom";
import styled, { DefaultTheme } from "styled-components";

interface ModalWrapperProps {
  theme: DefaultTheme;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // 모달이 다른 요소들 위에 오도록 z-index 추가
`;

const ModalWrapper = styled.div<ModalWrapperProps>`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 28px;
  border-radius: 8px;
  min-width: 327px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // 모달에 그림자 효과 추가

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 23px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #333; // 닫기 버튼 색상
  &:hover {
    color: #000;
  }
`;

// 스크롤 잠금 훅
function useScrollLock(enabled: boolean): void {
  useEffect(() => {
    if (enabled) {
      document.body.style.overflow = "hidden"; // 스크롤 고정
      return () => {
        document.body.style.overflow = ""; // 스크롤 고정 해제
      };
    }
  }, [enabled]);
}

interface ModalProps {
  isOpen: boolean;
  closeButton?: boolean; // closeButton은 선택적이며 기본값은 false
  onClose: () => void; // onClose는 아무것도 반환하지 않는 함수
  children: ReactNode; // children은 React 노드 타입
}

function Modal({ isOpen, closeButton = false, onClose, children }: ModalProps) {
  // 모달이 열려있을 때만 스크롤 잠금 활성화
  useScrollLock(isOpen);

  // 오버레이 클릭 시 모달 내부 클릭 이벤트 전파 방지
  const preventOverlayClick = (e: MouseEvent) => e.stopPropagation();

  // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
  if (!isOpen) {
    return null;
  }

  // "modal-root" ID를 가진 DOM 요소에 포탈 렌더링
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    // modal-root 요소가 없으면 에러를 발생시키거나 경고를 남길 수 있습니다.
    console.error("The DOM element with ID 'modal-root' was not found.");
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={preventOverlayClick}>
        {closeButton && <CloseButton onClick={onClose}>X</CloseButton>}
        {children}
      </ModalWrapper>
    </Overlay>,
    modalRoot
  );
}

export default Modal;
