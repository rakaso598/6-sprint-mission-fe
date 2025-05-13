import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../api/products";
import ItemCard from "./ItemCard";
import DropdownMenu from "../../../components/UI/DropdownMenu";
import styled from "styled-components";

const PAGE_SIZE = 12;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex-grow: 1;
`;

const ItemCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const LoadingMessage = styled.div`
  padding: 24px;
  text-align: center;
  color: #777;
`;

const ErrorMessage = styled.div`
  padding: 24px;
  text-align: center;
  color: red;
`;

function AllItemsSection() {
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["products", orderBy, keyword], // page 제거
    queryFn: () => getProducts({ orderBy, pageSize: PAGE_SIZE, keyword }), // page 파라미터 제거
    placeholderData: (prev) => prev,
    refetchInterval: 60 * 1000,
  });

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="allItemsContainer">
      <div className="allItemsSectionHeader">
        <h1 className="sectionTitle mb-2 text-2xl">판매 중인 상품</h1>
        <Link href="/registration" className="loginLink button bg-blue-400 rounded-xl">
          상품 등록하기
        </Link>
      </div>

      <div className="allItemsSectionHeader">
        <SearchBarWrapper>
          <div><DropdownMenu onSortSelection={setOrderBy} /></div>
          <SearchInput
            placeholder="검색할 상품을 입력해 주세요"
            value={keyword}
            onChange={handleSearch}
          />
        </SearchBarWrapper>
      </div>

      {isFetching ? (
        <LoadingMessage>상품 목록을 불러오는 중입니다...</LoadingMessage>
      ) : isError ? (
        <ErrorMessage>상품 목록을 불러오는 중 오류가 발생했습니다: {error?.message || '알 수 없는 오류'}</ErrorMessage>
      ) : data ? (
        <ItemCardList>
          {data.list.map((item) => (
            <Link href={`/items/${item.id}`} key={`market-item-${item.id}`}>
              <ItemCard item={item} />
            </Link>
          ))}
        </ItemCardList>
      ) : (
        <LoadingMessage>표시할 상품이 없습니다.</LoadingMessage>
      )}
    </div>
  );
}

export default AllItemsSection;