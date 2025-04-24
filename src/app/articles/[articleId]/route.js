export async function GET(request, { params }) {
  const { articleId } = params;

  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/articles/${articleId}`
    );

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "API 요청 실패" }), {
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
    console.error("API 요청 중 오류 발생:", error);
    return new Response(JSON.stringify({ message: "서버 오류" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
