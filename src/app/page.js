import Link from "next/link";

export default function Home() {
  return (
    <>
      index 페이지입니다.
      <br />
      <br />
      <Link href="/community">/community 자유게시판 바로가기</Link>
      <br />
      <br />
      <Link href="/articles">
        /articles 아티클 목록 조회하기 (서버 컴포넌트)
      </Link>
      <br />
      <br />
      <Link href="/articles/1">
        /articles/1 1번 아티클 조회하기 (서버 컴포넌트)
      </Link>
      <br />
      <br />
      <Link href="/community/create">/community/create 아티클 생성 폼</Link>
    </>
  );
}
