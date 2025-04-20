import Link from "next/link";

export default function Home() {
  return (
    <>
      index 페이지입니다.
      <Link href="/community">/community 자유게시판 바로가기</Link>
      <br />
      <br />
      <Link href="/articles">
        articles 목록 조회하기 (route.js 서버 컴포넌트)
      </Link>
      <br />
      <br />
      <Link href="/articles/1">
        1번 articleId 조회하기(context.params.articleId) (route.js 서버
        컴포넌트)
      </Link>
    </>
  );
}
