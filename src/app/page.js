import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-8 font-bold">index 페이지입니다!</div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/community">/community | 자유게시판 바로가기</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/articles">
          /articles | 아티클 목록 조회하기 (서버 컴포넌트)
        </Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/articles/1">
          /articles/1 | 1번 아티클 조회하기 (서버 컴포넌트)
        </Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/community/create">/community/create | 아티클 생성 폼</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/community/create">/signin | 로그인 페이지</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/community/create">/signup | 회원가입 페이지</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/community/create">/items | 상품목록 페이지</Link>
      </div>
    </div>
  );
}
