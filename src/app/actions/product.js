// app/actions/product.js
"use server";

export async function getProductDetail(itemId) {
  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/products/${itemId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("상품 상세 정보 요청 실패:", response.status);
      return {
        error: `상품 상세 정보를 불러오는 데 실패했습니다. ${itemId}`,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("상품 상세 정보 요청 중 오류 발생:", error);
    return { error: "상품 상세 정보를 불러오는 중 오류가 발생했습니다." };
  }
}
