import styled from "styled-components";
import React from "react"; // React를 명시적으로 임포트합니다.
import Modal from "./Modal";
import Button from "./Button";
import { ReactComponent as CheckIcon } from "../../assets/images/icons/ic_check.svg";

// --- 1. 타입 정의 ---
interface ConfirmModalProps {
  content: React.ReactNode; // content는 JSX 요소, 문자열 등을 받을 수 있도록 ReactNode로 변경
  isOpen: boolean; // isOpen은 불리언 타입이어야 합니다.
  onClose: () => void;
  onConfirm: () => void;
  onReject?: () => void; // onReject는 선택 사항으로 변경 (없을 경우 아무 동작 안함)
}

// --- 2. 스타일 컴포넌트 정의 ---
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px; // 적절한 패딩 추가
`;

const Content = styled.div`
  margin: 24px 0 32px;
  text-align: center; // 텍스트 중앙 정렬
  font-size: 16px; // 적절한 폰트 사이즈
  color: #333; // 적절한 글자 색상
`;

const StyledButton = styled(Button)`
  width: 88px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse; // '아니오' 버튼이 오른쪽에 오도록
  gap: 8px;
  width: 100%; // 버튼 그룹이 모달 너비에 맞춰지도록
  justify-content: center; // 버튼들을 중앙 정렬
`;

// --- 3. ConfirmModal 컴포넌트 ---
function ConfirmModal({
  content,
  isOpen,
  onClose,
  onConfirm,
  onReject,
}: ConfirmModalProps) {
  const handleClickConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleClickReject = () => {
    if (onReject) {
      // onReject가 존재할 경우에만 호출
      onReject();
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        {/* 아이콘이 필요한 경우에만 렌더링하거나, 아이콘 크기/색상 제어 필요 */}
        <CheckIcon width="48" height="48" fill="#4CAF50" />
        <Content>{content}</Content> {/* content는 이제 ReactNode입니다. */}
        <Footer>
          <StyledButton onClick={handleClickConfirm}>네</StyledButton>
          <StyledButton $appearance="secondary" onClick={handleClickReject}>
            아니오
          </StyledButton>
        </Footer>
      </Container>
    </Modal>
  );
}

export default ConfirmModal;
