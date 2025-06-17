// app/api/products/[productId]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  // 더 이상 { params } 객체와 그에 대한 타입을 사용하지 않습니다.
  // Next.js가 제공하는 request 객체를 통해 직접 productId를 추출합니다.
) {
  // request.url에서 productId를 직접 추출합니다.
  // 예: /api/products/123 -> 123
  const pathnameSegments = request.nextUrl.pathname.split('/');
  const productId = pathnameSegments[pathnameSegments.length - 1]; // 마지막 세그먼트가 productId

  const apiUrl = `https://panda-market-api.vercel.app/products/${productId}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return NextResponse.json({ message: "상품 상세 조회 실패" }, {
        status: response.status,
      });
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("상품 상세 조회 중 오류 발생:", error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  // PATCH도 동일하게 수정합니다.
) {
  const pathnameSegments = request.nextUrl.pathname.split('/');
  const productId = pathnameSegments[pathnameSegments.length - 1];

  const apiUrl = `https://panda-market-api.vercel.app/products/${productId}`;

  const authorizationHeader = request.headers.get("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
  }

  const accessToken = authorizationHeader.split(" ")[1];

  try {
    const requestBody = await request.json();

    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      return NextResponse.json({ message: "상품 수정 실패" }, {
        status: response.status,
      });
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("상품 수정 중 오류 발생:", error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  // DELETE도 동일하게 수정합니다.
) {
  const pathnameSegments = request.nextUrl.pathname.split('/');
  const productId = pathnameSegments[pathnameSegments.length - 1];

  const apiUrl = `https://panda-market-api.vercel.app/products/${productId}`;

  const authorizationHeader = request.headers.get("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
  }

  const accessToken = authorizationHeader.split(" ")[1];

  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: "상품 삭제 실패" }, {
        status: response.status,
      });
    }

    return NextResponse.json(
      { message: "상품이 성공적으로 삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("상품 삭제 중 오류 발생:", error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}