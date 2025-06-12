import Image from "next/image";
import Post from "../../type/post";

export default function BestPost({ post }: { post: Post }) {
  return (
    <div className="w-full h-[198px] rounded-md bg-[#F9FAFB]">
      <div className="w-full flex ml-[24px]">
        <Image
          src="/images/home/best_badge.png"
          alt="베스트"
          width={102}
          height={30}
        />
      </div>
      <div className="w-full h-[165px] flex flex-col items-center justify-center">
        <div className="w-full">
          <div className="flex w-full h-[120px] items-start justify-between pr-[24px]">
            <div className="text-[18px] ml-[24px] mr-[24px] w-[240px] h-[136px] text-base font-semibold">
              {post.title}
            </div>
            <div>
              <Image
                src={post.imageUrl}
                alt={post.altText}
                width={72}
                height={72}
                className="rounded-md object-cover"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="font-medium text-sm ml-[24px]">{post.author}</div>
              <div className="flex gap-2 items-center ml-2">
                <div>
                  <Image
                    src="/images/home/hearticon.png"
                    alt="좋아요"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="font-medium text-gray-500 text-sm">
                  {post.likes}
                </div>
              </div>
            </div>
            <div className="font-medium text-gray-500 text-sm pr-[24px]">
              {post.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
