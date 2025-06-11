import { useState } from "react";

function SafeImage({ ...props }) {
  const [src, setSrc] = useState(props.src ?? "주소는 존재하지만 로딩에 실패");
  const handleError = () => setSrc("주소는 존재하지만 로딩에 실패"); // 주소는 존재하지만 로딩에 실패하는 경우
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} src={src} onError={handleError} />;
}

export default SafeImage;
