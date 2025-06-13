import Image from "next/image";
import Post from "../../../types/post";

export default function PostItem({ post }: { post: Post }) {
  return (
    <div className="flex flex-col">
      <div className="bg-[#FCFCFC] w-full h-[136px] border-b border-gray-300">
        <div className="flex w-full h-[90px] justify-between">
          <div className="text-[18px] font-semibold w-full pr-[16px] h-[52px] ">
            {post.title}
          </div>
          <div>
            <Image
              src={post.imageUrl}
              alt={post.altText}
              width={72}
              height={72}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-[8px] items-center">
            <div>
              <Image
                src="/images/home/profileicon.png"
                alt="프로필"
                width={24}
                height={24}
              />
            </div>
            <div className="font-medium text-[14px]">{post.author}</div>
            <div className="font-medium text-gray-500 text-[14px]">
              {post.date}
            </div>
          </div>
          <div className="flex gap-[8px] items-center">
            <div>
              <Image
                src="/images/home/hearticon.png"
                alt="좋아요"
                width={24}
                height={24}
              />
            </div>
            <div className="font-medium text-gray-500 text-[16px]">
              {post.likes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
