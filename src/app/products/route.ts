import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL 환경 변수가 설정되지 않았습니다.");
    return NextResponse.json({ message: "서버 설정 오류: API URL 없음" }, { status: 500 });
  }

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return NextResponse.json({ message: "상품 목록 조회 실패" }, {
        status: response.status,
      });
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("상품 목록 조회 중 오류 발생:", error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}