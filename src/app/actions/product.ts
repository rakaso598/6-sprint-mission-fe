"use server";

export async function getProductDetail(itemId: number) {
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
      throw new Error(
        `상품 상세 정보를 불러오는 데 실패했습니다. 상태 코드: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("상품 상세 정보 요청 중 오류 발생:", error);
    throw new Error("상품 상세 정보를 불러오는 중 오류가 발생했습니다.");
  }
}

export async function updateProduct(
  itemId: number,
  productData: {},
  authToken: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${itemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      console.error("상품 수정 실패:", response.status);
      const errorData = await response.json();
      throw new Error(
        `상품 수정에 실패했습니다. 상태 코드: ${
          response.status
        }, 오류: ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.error("상품 수정 중 오류 발생:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("상품 수정 중 오류 발생:");
    }
  }
}

export async function deleteProduct(itemId: number, authToken: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error("상품 삭제 실패:", response.status);
      const errorData = await response.json();
      throw new Error(
        `상품 삭제에 실패했습니다. 상태 코드: ${
          response.status
        }, 오류: ${JSON.stringify(errorData)}`
      );
    }

    return { success: true };
  } catch (error) {
    console.error("상품 삭제 중 오류 발생:", error);
    throw new Error("상품 삭제 중 오류가 발생했습니다.");
  }
}
