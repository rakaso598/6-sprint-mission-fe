// route.js (app/api/products/[productId]/route.js)

// 상품 ID를 동적으로 처리하기 위해 파일명을 [productId]로 설정합니다.

/**
 * 상품 상세 조회
 * GET /api/products/[productId]
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
 * PATCH /api/products/[productId]
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
        Authorization: `Bearer ${accessToken}`, // 추출한 토큰을 Bearer 스키마로 설정
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
 * DELETE /api/products/[productId]
 */
export async function DELETE(request, { params }) {
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
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // 추출한 토큰을 Bearer 스키마로 설정
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "상품 삭제 실패" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // DELETE 요청은 일반적으로 응답 본문이 없을 수 있습니다.
    // 성공적인 응답으로 204 No Content를 반환하거나,
    // 삭제 성공 메시지를 JSON 형태로 반환할 수 있습니다.
    return new Response(
      JSON.stringify({ message: "상품이 성공적으로 삭제되었습니다." }),
      {
        status: 200, // 또는 204 No Content
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
