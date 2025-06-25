import Image from "next/image";
import PostItem from "./PostItem";
import Link from "next/link";

const postsData = [
  {
    title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
    imageUrl: "/images/home/laptop1.png",
    altText: "맥북",
    author: "총명한 판다",
    likes: "991",
    date: "2024.04.16",
  },
  {
    title: "아이폰 15 Pro Max 스페이스 블랙 256GB 미개봉 팔아요!",
    imageUrl: "/images/home/laptop1.png",
    altText: "아이폰",
    author: "사과농장",
    likes: "500",
    date: "2024.04.15",
  },
  {
    title: "갤럭시 BOOK 스페이스 블랙 1TB 미개봉 팔아요!",
    imageUrl: "/images/home/laptop1.png",
    altText: "갤럭시",
    author: "우주괴물",
    likes: "321",
    date: "2024.04.14",
  },
  {
    title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
    imageUrl: "/images/home/laptop1.png",
    altText: "맥북",
    author: "총명한 판다",
    likes: "991",
    date: "2024.04.16",
  },
  {
    title: "아이폰 15 Pro Max 스페이스 블랙 256GB 미개봉 팔아요!",
    imageUrl: "/images/home/laptop1.png",
    altText: "아이폰",
    author: "사과농장",
    likes: "500",
    date: "2024.04.15",
  },
  {
    title: "갤럭시 BOOK 스페이스 블랙 1TB 미개봉 팔아요!",
    imageUrl: "/images/home/laptop1.png",
    altText: "갤럭시",
    author: "우주괴물",
    likes: "321",
    date: "2024.04.14",
  },
];

export default function PostList() {
  return (
    <div className="flex flex-col gap-[16px] mt-2">
      <div className="flex justify-between items-center">
        <div className="flex text-[18px] font-bold">게시글</div>
        <div>
          <Link href="/community/create">
            <Image
              src="/images/home/homewritebutton.png"
              alt="글쓰기"
              width={88}
              height={42}
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <Image
            src="/images/home/searchinput.png"
            alt="검색"
            width={288}
            height={42}
          />
        </div>
        <div>
          <Image
            src="/images/home/homesortbutton.png"
            alt="정렬"
            width={42}
            height={42}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[16px]">
        {postsData.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </div>
    </div>
  );
}
