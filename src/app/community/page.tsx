import Header from "./components/Header";
import BestPost from "./components/BestPost";
import PostList from "./components/PostList";
import Footer from "./components/Footer";

const bestPostsData = [
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
  // ... 다른 베스트 게시글 데이터 ...
];

export default function Home() {
  return (
    <div className="flex flex-col items-center min-w-[375px]">
      <Header />
      <div className="p-[16px] w-full h-[auto] flex flex-col gap-4 max-w-screen-xl">
        <div className="flex text-lg font-bold">베스트 게시글</div>
        <div className="flex flex-col gap-4">
          {/* 모바일 (최대 sm breakpoint 미만) */}
          <div className="block sm:hidden">
            {bestPostsData.slice(0, 1).map((post, index) => (
              <BestPost key={index} post={post} />
            ))}
          </div>
          {/* 태블릿 (sm breakpoint 이상, md breakpoint 미만) */}
          <div className="hidden sm:grid md:hidden grid-cols-2 gap-4">
            {bestPostsData.slice(0, 2).map((post, index) => (
              <BestPost key={index} post={post} />
            ))}
          </div>
          {/* PC (md breakpoint 이상) */}
          <div className="hidden md:grid grid-cols-3 gap-4">
            {bestPostsData.slice(0, 3).map((post, index) => (
              <BestPost key={index} post={post} />
            ))}
          </div>
        </div>
        <PostList />
      </div>
      <Footer />
    </div>
  );
}
