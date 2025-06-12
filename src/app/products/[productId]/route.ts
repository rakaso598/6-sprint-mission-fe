// app/api/products/[productId]/route.js

/**
 * 상품 상세 조회
 * GET /products/[productId]
 */
export async function GET(request, { params }) {
  const { productId } = params;
  const apiUrl = `https://panda-market-api.vercel.app/products/${productId}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "상품 상세 조회 실패" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("상품 상세 조회 중 오류 발생:", error);
    return new Response(JSON.stringify({ message: "서버 오류" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/**
 * 상품 수정
 * PATCH /products/[productId]
 */
export async function PATCH(request, { params }) {
  const { productId } = params;
  const apiUrl = `https://panda-market-api.vercel.app/products/${productId}`;

  // 요청 헤더에서 Authorization 토큰을 추출합니다.
  const authorizationHeader = request.headers.get("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ message: "인증이 필요합니다." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
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
      return new Response(JSON.stringify({ message: "상품 수정 실패" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("상품 수정 중 오류 발생:", error);
    return new Response(JSON.stringify({ message: "서버 오류" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/**
 * 상품 삭제
 * DELETE /products/[productId]
 */
export async function DELETE(request, { params }) {
  const { productId } = params;
  const apiUrl = `https://panda-market-api.vercel.app/products/${productId}`;

  const authorizationHeader = request.headers.get("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ message: "인증이 필요합니다." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
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
      return new Response(JSON.stringify({ message: "상품 삭제 실패" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "상품이 성공적으로 삭제되었습니다." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("상품 삭제 중 오류 발생:", error);
    return new Response(JSON.stringify({ message: "서버 오류" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
