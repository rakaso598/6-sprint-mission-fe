export async function GET() {
  try {
    const response = await fetch(
      "https://fs-pandamarket-template-7-swagger-latest.onrender.com/articles"
    ); // 실제 API 엔드포인트로 변경해주세요.

    if (!response.ok) {
      // 에러 응답 처리
      return new Response(JSON.stringify({ message: "API 요청 실패" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();

    // 성공적인 응답
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    return new Response(JSON.stringify({ message: "서버 오류" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
