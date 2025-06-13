"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";

// 상품 데이터의 타입을 정의합니다.
// 실제 API 응답 구조에 맞춰 속성을 추가하거나 수정해주세요.
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  // 여기에 API 응답에 포함된 다른 상품 속성들을 추가하세요.
  // 예를 들어: imageUrl?: string; createdAt?: string;
}

// 상품 업데이트 시 보낼 데이터의 타입을 정의합니다.
// PATCH 요청처럼 특정 필드만 업데이트할 수 있도록 모든 필드를 선택적(`?`)으로 만듭니다.
// 만약 PUT 요청으로 항상 모든 필드를 보내야 한다면, Product 인터페이스를 그대로 사용하세요.
interface ProductUpdatePayload {
  name?: string;
  description?: string;
  price?: number;
  // 여기에 업데이트 가능한 다른 속성들을 추가하세요.
}

export default function ProductDetailPage() {
  const params = useParams();
  // itemId가 문자열임을 명시합니다. Next.js의 useParams는 string | string[] | undefined를 반환할 수 있습니다.
  const itemId = params.itemId as string;
  const router = useRouter();

  // 상태 변수들에 명확한 타입을 지정합니다.
  const [product, setProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // editedProduct의 초기값은 null로 설정하고, 데이터를 불러온 후 Product 타입으로 설정합니다.
  const [editedProduct, setEditedProduct] =
    useState<ProductUpdatePayload | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  // Error 객체 또는 null로 에러 타입을 지정합니다.
  const [error, setError] = useState<Error | null>(null);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<Error | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<Error | null>(null);

  // 환경 변수는 컴포넌트 렌더링 시점에 고정된 값이므로 의존성 배열에 넣지 않아도 됩니다.
  // 하지만 ESLint 경고가 발생한다면, useEffect 내에서 사용되는 경우에 한해 추가해줍니다.
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // 컴포넌트 마운트 시 한 번 실행되어 토큰을 확인하고 설정합니다.
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (!storedAccessToken) {
      alert("토큰이 없습니다. 로그인 페이지로 이동합니다.");
      router.push("/signin");
      return;
    }
    setAccessToken(storedAccessToken);
    // router 객체는 변경되지 않으므로 의존성 배열에 포함하는 것이 좋습니다.
    // 하지만 ESLint 경고가 나지 않거나 무시해도 무방할 경우 제거할 수 있습니다.
  }, [router]);

  // itemId 또는 accessToken이 변경될 때 상품 상세 정보를 불러옵니다.
  useEffect(() => {
    // itemId, accessToken, apiUrl이 모두 유효할 때만 API 호출을 시도합니다.
    if (itemId && accessToken && apiUrl) {
      setLoading(true);
      setError(null); // 새로운 데이터 로딩 전에 이전 에러를 초기화합니다.

      fetch(`${apiUrl}/products/${itemId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            // 응답이 성공적이지 않으면, 에러를 던져 catch 블록으로 이동합니다.
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: Product) => {
          // 응답 데이터를 Product 타입으로 단언합니다.
          setProduct(data);
          setEditedProduct(data); // 불러온 데이터를 편집 상태의 초기값으로 설정합니다.
          setLoading(false);
        })
        .catch((e: unknown) => {
          // 에러 객체 타입을 unknown으로 받아 안전하게 처리합니다.
          console.error("상품 정보 불러오기 실패:", e);
          // 에러가 Error 인스턴스인 경우 메시지를 사용하고, 아닌 경우 문자열로 변환합니다.
          setError(e instanceof Error ? e : new Error(String(e)));
          setLoading(false);
        });
    }
  }, [itemId, accessToken, apiUrl]); // apiUrl을 의존성 배열에 추가하여 ESLint 경고를 방지합니다.

  // 입력 필드 변경을 처리합니다.
  // HTMLInputElement 또는 HTMLTextAreaElement의 ChangeEvent를 받을 수 있도록 타입을 지정합니다.
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // editedProduct가 null이 아님을 확인하고 업데이트합니다.
    setEditedProduct(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        } as ProductUpdatePayload)
    ); // 업데이트된 객체를 ProductUpdatePayload 타입으로 단언합니다.
  };

  // 상품 업데이트를 처리합니다.
  const handleUpdateProduct = async () => {
    // 필수 정보가 모두 있는지 확인합니다.
    if (!accessToken || !editedProduct || !itemId || !apiUrl) {
      alert(
        "업데이트에 필요한 정보가 부족합니다. 다시 로그인하거나 정보를 확인해주세요."
      );
      return;
    }

    setUpdateLoading(true);
    setUpdateError(null);
    try {
      // editedProduct에서 업데이트할 필드만 선택하여 payload를 만듭니다.
      const updatedData: ProductUpdatePayload = {
        name: editedProduct.name,
        description: editedProduct.description,
        price: editedProduct.price,
        // 필요하다면 다른 필드도 여기에 추가하세요 (예: imageUrl: editedProduct.imageUrl, category: editedProduct.category)
      };

      const response = await fetch(`${apiUrl}/products/${itemId}`, {
        method: "PUT", // PUT 요청은 전체 리소스 교체, PATCH는 부분 업데이트입니다. API 문서 확인 필요.
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        // 에러 응답 본문을 텍스트로 먼저 읽어서 JSON 파싱 실패에 대비합니다.
        const errorText = await response.text();
        let parsedError: { message?: string } = {};
        try {
          parsedError = JSON.parse(errorText);
        } catch {
          // JSON 파싱 실패 시, 텍스트 자체를 메시지로 사용합니다.
          parsedError.message = errorText;
        }
        throw new Error(
          parsedError.message || `HTTP error! status: ${response.status}`
        );
      }

      // 서버가 204 No Content 응답을 보낼 수도 있으므로, 성공 시 목록 페이지로 이동합니다.
      router.push("/items");
    } catch (e: unknown) {
      // 에러 타입을 unknown으로 받아 안전하게 처리합니다.
      console.error("상품 수정 오류:", e);
      setUpdateError(e instanceof Error ? e : new Error(String(e))); // Error 객체로 변환
      alert(
        "상품 수정에 실패했습니다: " +
          (e instanceof Error ? e.message : "알 수 없는 오류")
      );
    } finally {
      setUpdateLoading(false);
    }
  };

  // 편집 취소를 처리합니다.
  const handleCancelEdit = () => {
    // product가 null이 아닐 경우에만 setEditedProduct를 호출합니다.
    if (product) {
      setEditedProduct(product);
    }
    setIsEditing(false);
  };

  // 상품 삭제를 처리합니다.
  const handleDeleteProduct = async () => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) {
      return; // 사용자가 '취소'를 누르면 함수 종료
    }
    // 필수 정보가 모두 있는지 확인합니다.
    if (!accessToken || !itemId || !apiUrl) {
      alert(
        "삭제에 필요한 정보가 부족합니다. 다시 로그인하거나 정보를 확인해주세요."
      );
      return;
    }

    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const response = await fetch(`${apiUrl}/products/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        // 에러 응답 본문을 텍스트로 먼저 읽어서 JSON 파싱 실패에 대비합니다.
        const errorText = await response.text();
        let parsedError: { message?: string } = {};
        try {
          parsedError = JSON.parse(errorText);
        } catch {
          parsedError.message = errorText;
        }
        throw new Error(
          parsedError.message || `HTTP error! status: ${response.status}`
        );
      }

      router.push("/items"); // 삭제 성공 후 상품 목록 페이지로 이동
    } catch (e: unknown) {
      // 에러 타입을 unknown으로 받아 안전하게 처리합니다.
      console.error("상품 삭제 오류:", e);
      setDeleteError(e instanceof Error ? e : new Error(String(e))); // Error 객체로 변환
      alert(
        "상품 삭제에 실패했습니다: " +
          (e instanceof Error ? e.message : "알 수 없는 오류")
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // 로딩, 에러, 상품 없음 상태에 따른 조건부 렌더링
  if (loading) return <div>상품 정보를 불러오는 중입니다...</div>;
  if (error) return <div>오류가 발생했습니다: {error.message}</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div className="container flex flex-col gap-4 items-center mt-40">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            name="name"
            // editedProduct가 null일 수 있으므로 Optional Chaining과 Nullish Coalescing을 사용합니다.
            value={editedProduct?.name ?? ""}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <textarea
            name="description"
            value={editedProduct?.description ?? ""}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {/* 가격 입력 필드 추가 (만약 price도 편집 가능해야 한다면) */}
          <input
            type="number" // 숫자를 입력받을 때
            name="price"
            value={editedProduct?.price ?? ""}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleUpdateProduct}
              disabled={updateLoading}
              className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline ${
                updateLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {updateLoading ? "저장 중..." : "저장"}
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline"
            >
              취소
            </button>
          </div>
          {updateError && (
            <div className="text-red-500">
              상품 수정 오류: {updateError.message}
            </div>
          )}
        </div>
      ) : (
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            수정
          </button>
          <button
            onClick={handleDeleteProduct}
            disabled={deleteLoading}
            className={`bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline ${
              deleteLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {deleteLoading ? "삭제 중..." : "삭제"}
          </button>
          {deleteError && (
            <div className="text-red-500">
              상품 삭제 오류: {deleteError.message}
            </div>
          )}
        </div>
      )}
      {accessToken && (
        <div className="bg-yellow-400">
          localStorage에 JWT 토큰이 존재합니다.
        </div>
      )}
    </div>
  );
}
