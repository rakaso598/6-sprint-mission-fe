import Image, { ImageProps } from "next/image";
import { useState } from "react";

// SafeImageProps 인터페이스를 제거하고, ImageProps를 직접 사용합니다.
// 함수 컴포넌트의 props 타입으로 ImageProps를 바로 사용합니다.
function SafeImage({
  src: initialSrc,
  alt,
  width,
  height,
  ...props
}: ImageProps) {
  const [src, setSrc] = useState(initialSrc);
  const fallbackSrc = "/images/default-image.png"; // 실제 대체 이미지 경로로 변경하세요.

  const handleError = () => {
    if (src === fallbackSrc) return;
    setSrc(fallbackSrc);
  };

  return (
    <Image
      src={src}
      alt={alt}
      onError={handleError}
      width={width}
      height={height}
      {...props}
    />
  );
}

export default SafeImage;
