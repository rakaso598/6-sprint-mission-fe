// DetailImage.tsx 파일 상단
import React from "react";
import SafeImage from "./SafeImage"; // SafeImage 임포트 경로 확인

// Product 인터페이스 정의 (여러 파일에서 사용될 경우 별도 파일로 분리 권장)
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  // 다른 product 속성들
}

interface DetailImageProps {
  product: Product;
}

function DetailImage({ product }: DetailImageProps) {
  return (
    <div>
      <h2>{product.name}</h2>
      {product.imageUrl && (
        <SafeImage
          src={product.imageUrl}
          alt={product.name}
          width={500} // 실제 크기에 맞춰 변경
          height={300} // 실제 크기에 맞춰 변경
        />
      )}
    </div>
  );
}

export default DetailImage;
