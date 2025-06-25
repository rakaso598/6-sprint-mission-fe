import axios from "axios";

// 기본 URL 설정 (환경 변수 사용 권장)
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000", // 예시 URL, 실제 API URL로 변경 필요
  timeout: 10000, // 요청 타임아웃 시간 (10초)
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전에 수행할 작업 (예: 인증 토큰 추가)
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
instance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 처리 (예: 데이터 전처리)
    return response;
  },
  (error) => {
    // 응답 오류 처리 (예: 401 Unauthorized 에러 시 로그인 페이지로 리다이렉트)
    // if (error.response?.status === 401) {
    //   // 로그인 페이지로 리다이렉트 또는 토큰 갱신 로직
    //   console.log('Unauthorized, redirecting to login...');
    // }
    return Promise.reject(error);
  }
);

export default instance;
