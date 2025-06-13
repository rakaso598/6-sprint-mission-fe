import React from "react";
import "./PaginationBar.css";
import styled from "styled-components";

const ArrowPlaceholder = styled.div`
  width: 16px;
  height: 16px;
  background-color: #888; /* 임시 화살표 배경색 */
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 10px;
  line-height: 1;
`;
interface PaginationBarProps {
  totalPageNum: number; // 전체 페이지 수
  activePageNum: number; // 현재 활성화된 페이지 번호
  onPageChange: (pageNumber: number) => void; // 페이지 변경 시 호출될 함수
}
const PaginationBar = ({
  totalPageNum,
  activePageNum,
  onPageChange,
}: PaginationBarProps) => {
  const maxVisiblePages = 5;
  let startPage;

  if (totalPageNum <= maxVisiblePages) {
    startPage = 1;
  } else {
    startPage = Math.max(activePageNum - Math.floor(maxVisiblePages / 2), 1);
    startPage = Math.min(startPage, totalPageNum - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPageNum - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <div className="paginationBar">
      <button
        className="paginationButton"
        disabled={activePageNum === 1}
        onClick={() => onPageChange(activePageNum - 1)}
      >
        <ArrowPlaceholder>{"<"}</ArrowPlaceholder> {/* 임시 왼쪽 화살표 */}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`paginationButton ${
            activePageNum === page ? "active" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="paginationButton"
        disabled={activePageNum === totalPageNum}
        onClick={() => onPageChange(activePageNum + 1)}
      >
        <ArrowPlaceholder>{">"}</ArrowPlaceholder> {/* 임시 오른쪽 화살표 */}
      </button>
    </div>
  );
};

export default PaginationBar;
