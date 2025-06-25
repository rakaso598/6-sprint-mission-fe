import React from "react";
import styled from "styled-components";

const HeartIconPlaceholder = styled.div`
  width: 16px;
  height: 16px;
  background-color: green;
  border-radius: 50%;
  margin-right: 4px;
`;
interface Item {
  id: number;
  name: string;
  price: number;
  favoriteCount: number;
  imageUrl?: string;
}

interface ItemCardProps {
  item: Item;
}
function ItemCard({ item }: ItemCardProps) {
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
