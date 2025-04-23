"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

function CreateArticleForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleCreateArticleFormSubmit = async () => {
    if (isSubmitDisabled) {
      // 인풋 값이 비어있으면 아무 동작도 하지 않음
      return;
    }

    try {
      const response = await fetch(
        "https://fs-pandamarket-template-7-swagger-latest.onrender.com/articles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 필요한 경우 인증 헤더 추가 (예: Authorization: `Bearer ${token}`)
          },
          body: JSON.stringify({
            title: title,
            content: content,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("게시글 등록 성공:", data);
        // 성공 후 처리 (예: 알림 메시지, 페이지 리다이렉션)
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error("게시글 등록 실패 (유효성 검사 오류):", errorData);
        // 유효성 검사 실패에 대한 처리 (예: 에러 메시지 표시)
      } else {
        console.error("게시글 등록 실패:", response.status);
        // 기타 오류에 대한 처리
      }
    } catch (error) {
      console.error("게시글 등록 중 오류 발생:", error);
      // 네트워크 오류 등 처리
    }
  };

  // 제목 또는 내용이 비어있으면 등록 버튼을 비활성화
  useEffect(() => {
    setIsSubmitDisabled(!title.trim() || !content.trim());
  }, [title, content]);

  return (
    <div>
      <div className="p-[16px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex justify-between items-center">
            <p className="text-[20px] font-bold">상품 등록하기</p>
            <div
              className={`min-w-[74px] cursor-pointer ${
                isSubmitDisabled ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={handleCreateArticleFormSubmit}
            >
              <Image
                src="/images/form/submitgraybutton.png"
                alt="등록"
                width={74}
                height={42}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[12px]">
            <p className="text-[14px] font-bold">*제목</p>
            <input
              className="rounded-xl bg-gray-200 w-full h-[56px] py-[16px] px-[24px]"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={handleTitleChange}
            />
          </div>

          <div className="flex flex-col gap-[12px]">
            <p className="text-[14px] font-bold">*내용</p>
            <input
              className="rounded-xl bg-gray-200 w-full h-[56px] py-[16px] px-[24px]"
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={handleContentChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateArticleForm;
