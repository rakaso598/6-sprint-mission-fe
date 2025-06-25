import Image from "next/image";
import PostItem from "./PostItem";

export default function PostList() {
  return (
    <div className="flex flex-col gap-[16px] mt-2">
      <div className="flex justify-between items-center">
        <div className="flex text-[18px] font-bold">게시글</div>
        <div>
          <Image
            src="/images/home/homewritebutton.png"
            alt="글쓰기"
            width={88}
            height={42}
          />
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
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </div>
    </div>
  );
}
