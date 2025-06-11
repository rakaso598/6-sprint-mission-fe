import React from "react";
import styled from "styled-components";

const HeartIconPlaceholder = styled.div`
  width: 16px;
  height: 16px;
  background-color: green;
  border-radius: 50%;
  margin-right: 4px;
`;

function ItemCard({ item }) {
  return (
    <div className="itemCard">
      <div className="itemSummary">
        <h2 className="itemName">{item.name}</h2>
        <p className="itemPrice">{item.price?.toLocaleString()}원</p>
        <div className="favoriteCount">
          <HeartIconPlaceholder />
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;