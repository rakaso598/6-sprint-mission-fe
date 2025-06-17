import styled from "styled-components";
import Modal from "./Modal";
import Button from "./Button";

const ModalContent = styled.div`
  padding: 47px;
`;

const ModalFooter = styled.div`
  display: flex;

  ${Button} {
    margin-left: auto;
  }
`;
type SimpleModalProps = {
  isOpen: boolean; // 모달의 열림 상태를 나타냅니다.
  text?: string; // 모달에 표시될 텍스트입니다. 선택적이며 기본값은 빈 문자열입니다.
  onClose: () => void; // 모달이 닫힐 때 호출될 함수입니다.
};

function SimpleModal({ isOpen, text = "", onClose }: SimpleModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>{text}</ModalContent>
      <ModalFooter>
        <Button onClick={onClose}>확인</Button>
      </ModalFooter>
    </Modal>
  );
}

export default SimpleModal;
