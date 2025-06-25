import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full h-[70px] border-b border-gray-300 flex justify-center">
      <div className="flex items-center justify-between w-full max-w-screen-xl px-4">
        <div className="flex items-center gap-[24px]">
          <div>
            <Image
              src="/images/home/pandamarket.png"
              alt="판다마켓"
              width={81}
              height={27}
            />
          </div>
          <div>
            <Image
              src="/images/home/freeboard.png"
              alt="자유게시판"
              width={70}
              height={19}
            />
          </div>
          <div>
            <Image
              src="/images/home/zoongomarket.png"
              alt="중고마켓"
              width={56}
              height={19}
            />
          </div>
        </div>
        <div className="ml-10">
          <Image
            src="/images/home/homeloginbutton.png"
            alt="로그인"
            width={88}
            height={42}
          />
        </div>
      </div>
    </header>
  );
}
