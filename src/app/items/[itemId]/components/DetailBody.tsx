import React from "react";

// ✨ Product 데이터의 타입을 정의합니다.
// 실제 API 응답에 따라 속성을 추가하거나 수정할 수 있습니다.
interface Product {
  name: string;
  price: number; // 가격은 숫자로 다루는 것이 좋습니다.
  description: string;
  tags: string[]; // 태그는 문자열 배열입니다.
  ownerNickname: string;
  createdAt: string; // 날짜/시간 문자열입니다.
  favoriteCount: number; // 찜 개수는 숫자입니다.
  // profileImageUrl?: string; // 프로필 사진 URL이 있다면 추가 (옵션)
}

// ✨ DetailBody 컴포넌트의 props 타입을 정의합니다.
interface DetailBodyProps {
  product: Product | null; // product는 Product 타입이거나 아직 로드되지 않았을 때 null일 수 있습니다.
}

function DetailBody({ product }: DetailBodyProps) {
  return (
    <div className="flex flex-col gap-4 m-4">
      {product ? (
        <>
          <div className="font-bold text-xl">{product.name}</div>{" "}
          {/* 이름 폰트 크기 조정 */}
          <div className="text-3xl font-semibold text-blue-600">
            {product.price.toLocaleString()}원
          </div>{" "}
          {/* 가격 포맷 및 스타일 강조 */}
          <div className="font-bold text-lg mt-4">상품 소개</div>
          <div className="text-gray-700 leading-relaxed">
            {product.description}
          </div>{" "}
          {/* 설명 텍스트 스타일 개선 */}
          <div className="font-bold text-lg mt-4">상품 태그</div>
          {product.tags && product.tags.length > 0 ? ( // product.tags가 존재하고 비어있지 않은지 확인
            <div className="flex flex-wrap gap-2">
              {" "}
              {/* 태그가 많을 경우를 대비해 flex-wrap 적용 */}
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-sm">등록된 태그가 없습니다.</div> // 태그가 없을 때 메시지
          )}
          <hr className="my-6 border-t border-gray-200" /> {/* 구분선 추가 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* 프로필 사진을 렌더링할 수 있도록 product.profileImageUrl prop을 가정 */}
              {/* {product.profileImageUrl ? (
                <img src={product.profileImageUrl} alt="프로필" className='w-10 h-10 rounded-full object-cover' />
              ) : (
                <div className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm'>
                  PIC
                </div>
              )} */}
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
                PIC {/* 임시 프로필 사진 아이콘 */}
              </div>
              <div>
                <div className="font-semibold text-lg">
                  {product.ownerNickname}
                </div>
                <div className="text-gray-500 text-sm">
                  {new Date(product.createdAt).toLocaleDateString("ko-KR")}{" "}
                  {/* 날짜 포맷팅 */}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-red-500">
              <span className="text-lg">❤️</span> {/* 하트 이모지 */}
              <span className="font-medium">{product.favoriteCount}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 py-8">
          상품 정보를 불러오는 중... 또는 정보가 없습니다.
        </div>
      )}
    </div>
  );
}

export default DetailBody;
