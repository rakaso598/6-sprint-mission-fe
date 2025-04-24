// app/api/products/route.js

/**
 * 상품 목록 조회
 * GET /products/
 */
export async function GET() {
  const apiUrl = "https://panda-market-api.vercel.app/products/";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "상품 목록 조회 실패" }), {
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
    console.error("상품 목록 조회 중 오류 발생:", error);
    return new Response(JSON.stringify({ message: "서버 오류" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
