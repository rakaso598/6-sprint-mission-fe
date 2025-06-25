// src/app/articles/[articleId]/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any // <-- ESLint 규칙을 이 라인에서만 비활성화
) {
  const articleId = (context.params as { articleId: string }).articleId;

  if (!articleId) {
    return NextResponse.json(
      { message: "articleId가 URL에서 제공되지 않았습니다." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/articles/${articleId}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "API 요청 실패", details: `Status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error("API 요청 중 오류 발생:", error);

    let errorMessage = "서버 오류가 발생했습니다.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
