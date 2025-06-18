"use client";

import React, { useEffect } from "react";
import UserEmailInput from "../components/UserEmailInput";
import UserPasswordInput from "../components/UserPasswordInput";
import SubmitButton from "../components/SubmitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"; // useForm 훅 임포트
import { z } from "zod"; // Zod를 사용한 스키마 유효성 검사
import { zodResolver } from "@hookform/resolvers/zod"; // Zod 리졸버 임포트

// 1. Zod를 사용하여 유효성 검사 스키마 정의
const schema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

// 스키마의 타입을 추론하여 폼 데이터 타입으로 사용
type SignInFormInputs = z.infer<typeof schema>;

function SigninPage() {
  const router = useRouter();

  // 2. useForm 훅 초기화 및 Zod 리졸버 적용
  const {
    register, // 입력 필드를 등록하는 함수
    handleSubmit, // 폼 제출을 처리하는 함수
    formState: { errors, isSubmitting }, // 폼 상태에서 오류와 제출 상태를 가져옴
    setError, // 수동으로 오류를 설정하는 함수
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(schema), // Zod 스키마를 유효성 검사 리졸버로 사용
    mode: "onBlur", // 필드가 포커스를 잃을 때 유효성 검사 트리거
  });

  // 3. 폼 제출 핸들러 (유효성 검사를 통과한 경우에만 실행됨)
  const onSubmit = async (data: SignInFormInputs) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/auth/signIn`, {
        method: "POST",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // useForm이 관리하는 data 객체 사용
      });

      if (!response.ok) {
        // 서버에서 반환하는 특정 오류 메시지가 있다면 이를 파싱하여 사용
        const errorData = await response.json();
        const errorMessage = errorData.message || "로그인 중 오류가 발생했습니다.";

        // React Hook Form의 setError를 사용하여 특정 필드 또는 전체 폼에 오류 설정
        setError("email", { type: "server", message: errorMessage });
        setError("password", { type: "server", message: errorMessage });
        alert(errorMessage);
        throw new Error(errorMessage);
      }
      const responseData = await response.json();

      localStorage.setItem("accessToken", responseData.accessToken);
      alert(`${responseData.user.nickname}님, 로그인을 환영합니다!`);
      router.push("/");
    } catch (err: unknown) {
      console.error("로그인 중 오류:", err);
      // 이미 setError로 처리했으므로 여기서는 추가적인 UI 오류 메시지 설정은 생략하거나
      // 네트워크 오류 등 예상치 못한 오류에 대한 메시지를 설정할 수 있습니다.
      if (err instanceof Error && errors.email?.message === undefined && errors.password?.message === undefined) {
         setError("email", { type: "unknown", message: err.message });
         setError("password", { type: "unknown", message: err.message });
      } else if (errors.email?.message === undefined && errors.password?.message === undefined) {
          setError("email", { type: "unknown", message: "알 수 없는 오류가 발생했습니다." });
          setError("password", { type: "unknown", message: "알 수 없는 오류가 발생했습니다." });
      }
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/items"); // 인증된 사용자는 '/items'로 리다이렉트
    } else {
      // accessToken이 없지만, 로그인 페이지에 머무르는 것이 일반적이므로
      // 이 alert는 사용자 경험을 저해할 수 있어 주석 처리하거나 제거하는 것을 권장합니다.
      // alert("accessToken이 없음. 로그인 해주세요.");
    }
  }, [router]);

  return (
    // 4. handleSubmit으로 폼 onSubmit 연결
    <form onSubmit={handleSubmit(onSubmit)}>
      <UserEmailInput
        // 5. register를 사용하여 입력 필드 등록
        {...register("email")}
      />
      {/* 6. errors 객체를 통해 에러 메시지 표시 */}
      {errors.email && <div className="text-red-500 flex justify-center text-sm mt-1">{errors.email.message}</div>}

      <UserPasswordInput
        {...register("password")}
      />
      {errors.password && <div className="text-red-500 flex justify-center text-sm mt-1">{errors.password.message}</div>}

      {/* isSubmitting을 사용하여 제출 버튼 비활성화 (선택 사항) */}
      <SubmitButton label={"로그인"} disabled={isSubmitting} />

      {/* isSubmitting일 때 로딩 스피너 등을 표시할 수 있음 */}
      {isSubmitting && <div className="flex justify-center text-gray-500 text-sm mt-2">로그인 중...</div>}

      <div className="flex justify-center">
        <span>판다마켓이 처음이신가요?</span>
        <Link href={"/signup"}>
          <span className="text-blue-600 underline">회원가입</span>
        </Link>
      </div>
    </form>
  );
}

export default SigninPage;