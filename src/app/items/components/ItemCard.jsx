import React from "react";
import styled from "styled-components";
import SafeImage from "../[itemId]/components/SafeImage";

const StyledSafeImage = styled(SafeImage)`
  width: 200px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 16px;

`;

const HeartIconPlaceholder = styled.div`
  width: 16px;
  height: 16px;
  background-color: #f00; /* 임시 하트 아이콘 배경색 */
  border-radius: 50%;
  margin-right: 4px;
`;

function ItemCard({ item }) {
  return (
    <div className="itemCard">
      <StyledSafeImage
        src={item.images[0]}
        alt={`${item.name} 상품 대표 사진`}
      />
      <div className="itemSummary">
        <h2 className="itemName">{item.name}</h2>
        <p className="itemPrice">{item.price.toLocaleString()}원</p>
        <div className="favoriteCount">
          <HeartIconPlaceholder /> {/* 임시 하트 아이콘 */}
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;