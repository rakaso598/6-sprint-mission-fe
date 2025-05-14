import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-8 font-bold text-xl">:: Docs ::</div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/signin">/signin - 로그인</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/signup">/signup - 회원가입</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/items">/items - 상품목록 조회</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/items/new">/items/new - 상품 등록</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/items/1">/items/ID - 상품상세 페이지</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/items/1/edit">/items/ID/edit - 상품상세 수정</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/community">/community - 자유게시판</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/community/new">/community/new - 아티클 생성 페이지</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/articles">/articles - 아티클 목록 조회</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/articles/1">/articles/ID - 아티클 상세조회</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/products/">/products - 상품목록 조회</Link>
      </div>
      <div className="mt-8 underline text-blue-700">
        <Link href="/products/1">/products/ID - 상품상세 조회</Link>
      </div>
    </div>
  );
}
