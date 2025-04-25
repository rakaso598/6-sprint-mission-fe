// app/actions/product.js
"use server";

export async function getProductDetail(itemId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${itemId}`,
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

export async function updateProduct(itemId, productData, authToken) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${itemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authToken}`,
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      console.error("상품 수정 실패:", response.status);
      return { error: "상품 수정에 실패했습니다." };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("상품 수정 중 오류 발생:", error);
    return { error: "상품 수정 중 오류가 발생했습니다." };
  }
}

export async function deleteProduct(itemId, authToken) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error("상품 삭제 실패:", response.status);
      return { error: "상품 삭제에 실패했습니다." };
    }

    return { success: true };
  } catch (error) {
    console.error("상품 삭제 중 오류 발생:", error);
    return { error: "상품 삭제 중 오류가 발생했습니다." };
  }
}
