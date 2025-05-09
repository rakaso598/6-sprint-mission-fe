import Link from "next/link";

export default function Docs() {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-8 font-bold text-xl">:: Docs ::</div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/signin">/signin | 로그인 페이지</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/signup">/signup | 회원가입 페이지</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/items">/items | 상품목록 페이지</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/items/1">/items/ID | 상품상세 페이지</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/items/1/edit">/items/ID/edit | 상품상세 수정 페이지</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/community">/community | 자유게시판 페이지</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/community/create">
          /community/create | 아티클 생성 페이지
        </Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/articles">/articles | 아티클 목록 조회하기</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/articles/1">/articles/1 | 1번 아티클 조회하기</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/products/">/products | 상품 목록 조회하기</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/products/1">/products/ID | 상품상세 조회하기</Link>
      </div>
    </div>
  );
}
