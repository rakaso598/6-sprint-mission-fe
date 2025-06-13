import { User } from "@/types/user"; // User와 함께 필요한 credentials 타입 임포트
import axios from "./axios"; // axios 인스턴스 경로 확인

// 회원가입 함수 개선
export async function signUp(credentials: string): Promise<User> {
  const response = await axios.post<{ user: User }>(
    `/auth/signUp`,
    credentials
  ); // 응답 데이터 타입 명시
  const { user } = response.data;
  return user;
}

// 로그인 함수 개선
export async function signIn(credentials: string): Promise<User> {
  const response = await axios.post<{ user: User }>(
    `/auth/signIn`,
    credentials
  ); // 응답 데이터 타입 명시
  const { user } = response.data;
  return user;
}

// 로그아웃 함수 개선
export async function signOut(): Promise<void> {
  await axios.post(`/auth/signOut`);
}

// 사용자 정보 조회 함수 개선
export async function getMe(): Promise<User> {
  const response = await axios.get<User>(`/users/me`); // 응답 데이터 타입 명시
  const user = response.data;
  return user;
}
