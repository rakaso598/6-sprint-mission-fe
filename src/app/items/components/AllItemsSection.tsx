import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "../../../api/axios";
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/products", {
          params: {
            orderBy,
            pageSize: PAGE_SIZE,
            keyword,
          },
        });
        setProducts(response.data);
      } catch (e) {
        setError(e.message || "상품 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [orderBy, keyword]);

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="allItemsContainer">
      <div className="allItemsSectionHeader">
        <h1 className="sectionTitle mb-4 text-2xl">판매 중인 상품</h1>
        <Link href="/items/new" className="loginLink button bg-blue-400 rounded-xl p-2">
          상품 등록하기
        </Link>
      </div>
      <div className="allItemsSectionHeader mt-5 mb-4">
        <SearchBarWrapper>
          <div><DropdownMenu onSortSelection={setOrderBy} /></div>
          <SearchInput
            placeholder="검색할 상품을 입력해 주세요"
            value={keyword}
            onChange={handleSearch}
          />
        </SearchBarWrapper>
      </div>
      {loading ? (
        <LoadingMessage>상품 목록을 불러오는 중입니다...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : products && products.length > 0 ? (
        <ItemCardList>
          {products.map((item) => (
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