"use server";

// (기존 코드 - getProductDetail 함수)
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

// --- productData 타입을 위한 인터페이스 정의 ---
interface ProductUpdateData {
  name?: string; // 상품 이름 (선택적)
  description?: string; // 상품 설명 (선택적)
  price?: number; // 상품 가격 (선택적)
  imageUrl?: string; // 상품 이미지 URL (선택적)
  category?: string; // 상품 카테고리 (선택적)
  // 여기에 업데이트할 수 있는 다른 상품 속성들을 추가하세요.
  // 예: stock?: number; isActive?: boolean; tags?: string[];
}
// ---------------------------------------------

export async function updateProduct(
  itemId: number,
  productData: ProductUpdateData, // 정의한 인터페이스를 타입으로 사용
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

// (기존 코드 - deleteProduct 함수)
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
