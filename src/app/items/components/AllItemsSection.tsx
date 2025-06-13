"use client"; // 클라이언트 컴포넌트임을 명시

import React, { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import styled from "styled-components";

// 다른 컴포넌트 import (경로 확인)
import ItemCard from "./ItemCard"; // ItemCard 컴포넌트 경로 및 props 타입 확인 필요
import DropdownMenu from "../../../components/UI/DropdownMenu"; // DropdownMenu 컴포넌트 경로 및 props 타입 확인 필요

// API 서비스 파일에서 정의한 Product 타입을 여기에 직접 정의하거나,
// 해당 파일에서 export된 타입을 임포트하는 것이 이상적입니다.
// 현재 컨텍스트를 위해 여기에 임시로 정의합니다.
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  favoriteCount: number; // favoriteCount 추가
  // 실제 API 응답에 맞춰 필요한 다른 속성들을 여기에 추가하세요.
  // 예: description: string; createdAt: string;
}

// API 요청 함수를 이 파일 내에서 직접 정의 (외부 파일 변경 없이 임시 해결)
// 실제 프로젝트에서는 이 함수를 별도의 API 서비스 파일로 분리하는 것이 좋습니다.
interface ProductParams {
  orderBy?: string;
  pageSize?: number;
  keyword?: string;
}

async function getProductList(params: ProductParams): Promise<Product[]> {
  try {
    // process.env.NEXT_PUBLIC_API_URL은 Next.js 환경 변수입니다.
    // 만약 정의되지 않았다면 런타임 오류가 발생할 수 있으니, 실제 값으로 대체하거나 환경 변수 설정을 확인해야 합니다.
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"; // 기본 URL 제공 (개발용)

    const query = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    const url = `${apiUrl}/products?${query}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to fetch products: ${response.status} ${
          errorData.message || ""
        }`
      );
    }

    const data = await response.json();
    // API 응답 구조에 따라 products 배열이 data.data에 있을 수 있습니다.
    // 여기서는 data 자체가 Product 배열이라고 가정합니다.
    return data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw new Error("상품 목록을 불러오는 중 오류가 발생했습니다.");
  }
}

const PAGE_SIZE = 12;

// styled-components에서 theme prop을 사용할 때 필요한 타입 정의
// DefaultTheme에 colors와 mediaQuery 속성이 정의되어 있다고 가정합니다.
// interface StyledPropsWithTheme {
//   theme: DefaultTheme;
// }

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

// DropdownMenu 컴포넌트의 props 타입을 정의 (예시, 실제 구현에 따라 다를 수 있음)
// interface DropdownMenuProps {
//   onSortSelection: (sortBy: string) => void;
//   // 다른 prop들이 있다면 여기에 추가
// }

// // ItemCard 컴포넌트의 props 타입을 정의 (예시, 실제 구현에 따라 다를 수 있음)
// interface ItemCardProps {
//   item: Product; // Product 인터페이스 사용
//   // 다른 prop들이 있다면 여기에 추가
// }

function AllItemsSection() {
  const [orderBy, setOrderBy] = useState<string>("recent");
  const [keyword, setKeyword] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProducts = await getProductList({
          orderBy,
          pageSize: PAGE_SIZE,
          keyword,
        });
        setProducts(fetchedProducts);
      } catch (e) {
        // 'e'는 'unknown' 타입이므로, 먼저 'Error' 인스턴스인지 확인
        let errorMessage =
          "상품 목록을 불러오는 중 알 수 없는 오류가 발생했습니다.";
        if (e instanceof Error) {
          errorMessage = e.message;
        } else if (typeof e === "string") {
          errorMessage = e;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [orderBy, keyword]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="allItemsContainer">
      <div className="allItemsSectionHeader">
        <h1 className="sectionTitle mb-4 text-2xl">판매 중인 상품</h1>
        <Link
          href="/items/new"
          className="loginLink button bg-blue-400 rounded-xl p-2"
        >
          상품 등록하기
        </Link>
      </div>
      <div className="allItemsSectionHeader mt-5 mb-4">
        <SearchBarWrapper>
          <div>
            {/* DropdownMenu 컴포넌트가 실제로 존재하고, onSortSelection prop을 받는지 확인 */}
            <DropdownMenu onSortSelection={setOrderBy} />
          </div>
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
              {/* ItemCard 컴포넌트가 item prop을 Product 타입으로 받도록 정의되어 있어야 합니다. */}
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
