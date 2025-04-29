/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
        pathname: "/Sprint_Mission/**",
      },
      // 다른 외부 이미지 호스트가 있다면 여기에 추가합니다.
    ],
  },
};

export default nextConfig;
