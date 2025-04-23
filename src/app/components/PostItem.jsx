import Image from "next/image";

export default function PostItem() {
  return (
    <div className="flex flex-col">
      <div className="w-full h-[136px] border-b border-gray-300">
        <div className="flex w-full h-[90px] justify-between">
          <div className="text-[18px] font-semibold w-full pr-[16px] h-[52px] ">
            맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
          </div>
          <div>
            <Image
              src="/images/home/laptop1.png"
              alt="맥북"
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
            <div className="font-medium text-[14px]">총명한 판다</div>
            <div className="font-medium text-gray-500 text-[14px]">
              2024.04.16
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
            <div className="font-medium text-gray-500 text-[16px]">9999+</div>
          </div>
        </div>
      </div>
    </div>
  );
}
