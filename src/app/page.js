export default function Home() {
  return (
    <>
      index 페이지입니다.
      <a href="http://localhost:3000/community">
        http://localhost:3000/community 자유게시판 바로가기
      </a>
      <br />
      <br />
      <a href="http://localhost:3000/articles">
        articles 목록 조회하기 (route.js 서버 컴포넌트)
      </a>
      <br />
      <br />
      <a href="http://localhost:3000/articles/1">
        1번 articleId 조회하기(context.params.articleId) (route.js 서버
        컴포넌트)
      </a>
    </>
  );
}
