import React, { useEffect, useState, KeyboardEvent, ChangeEvent } from "react";
import styled, { DefaultTheme } from "styled-components";
import InputItem from "./InputItem";
// CommonStyles 모듈을 찾을 수 없다는 오류는 경로 문제일 가능성이 높습니다.
// 임시로 FlexContainer의 타입을 any로 지정하여 컴파일 오류를 피합니다.
// 실제 프로젝트에서는 해당 파일의 정확한 경로와 타입을 확인해야 합니다.
// import { FlexContainer } from "../../styles/CommonStyles"; // 이 경로를 확인하세요.
import DeleteButton from "./DeleteButton";

// styled-components prop 타입 정의
interface TagProps {
  theme: DefaultTheme;
}

const TagButtonsSection = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

// FlexContainer에 대한 타입 정의를 임시로 추가합니다.
// 실제 FlexContainer 컴포넌트의 props에 따라 정확하게 정의해야 합니다.
// 예를 들어, FlexContainer가 styled.div라면 그 자체로 props를 받지 않을 수도 있습니다.
const Tag = styled.div<TagProps>`
  background-color: ${({ theme }) => theme.colors.gray[2]};
  color: ${({ theme }) => theme.colors.black};
  padding: 14px 14px 14px 16px;
  border-radius: 999px;
  min-width: 100px;
`;

const TagText = styled.span`
  font-size: 16px;
  line-height: 24px;
  margin-right: 8px;
  max-width: calc(100% - 28px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// TagInput 컴포넌트의 props 타입 정의
interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

function TagInput({ value, onChange }: TagInputProps) {
  const [text, setText] = useState<string>("");
  const [tags, setTags] = useState<string[]>(value);
  const [error, setErrors] = useState<string>("");

  const addTag = (tag: string) => {
    const nextTags = [...tags];
    if (!tags.includes(tag)) {
      nextTags.push(tag);
    }
    onChange(nextTags);
  };

  const removeTag = (tagToRemove: string) => {
    const nextTags = tags.filter((tag) => tag !== tagToRemove);
    onChange(nextTags);
  };

  const handlePressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;

    const inputString = text.trim();
    if (event.key === "Enter") {
      event.preventDefault();

      if (inputString && !error) {
        addTag(inputString);
        setText("");
      }
    }
  };

  const validateTag = (newTag: string) => {
    if (newTag.length > 5) {
      setErrors("태그는 5글자 이내로 입력해주세요.");
    } else {
      setErrors("");
    }
  };

  useEffect(() => {
    setTags(value);
  }, [value]);

  return (
    <div>
      <InputItem
        id="tag-input" // 'id' prop을 추가하여 오류 해결
        label="태그"
        value={text}
        placeholder="태그를 입력해 주세요"
        onKeyDown={handlePressEnter}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setText(e.target.value);
          validateTag(e.target.value);
        }}
        error={error}
      />

      {tags?.length > 0 && (
        <TagButtonsSection>
          {tags.map((tag) => (
            <Tag key={`tag-${tag}`}>
              <TagText>{tag}</TagText>
              <DeleteButton
                onClick={() => removeTag(tag)}
                label={`${tag} 태그`}
              />
            </Tag>
          ))}
        </TagButtonsSection>
      )}
    </div>
  );
}

export default TagInput;
