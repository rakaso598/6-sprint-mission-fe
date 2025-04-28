import React from 'react'

function DetailBody() {
  return (
    <div className='flex flex-col gap-4 m-4'>
      <div className='font-bold'>아이패드 미니 팔아요</div>
      <div className='text-2xl'>500,000원</div>
      <div className='font-bold'>상품 소개</div>
      <div>액정에 잔기스랑 주변부 스크래치있습니다 예민하신 분아니면 전혀 신경쓰지않아도됩니다 메모용과 넷플릭스용으로만쓰던거라 뭘 해보질 않아 기능이나 문제점을 못느꼈네요 싸게넘깁니다! 택배거래안합니다</div>
      <div className='font-bold'>샘플 태그</div>
      <div className='flex gap-1'>
        <div>#아이패드미니</div>
        <div>#애플</div>
        <div>#가성비</div>
      </div>
      <div className='flex items-center justify-between'>
        <div>프로필사진</div>
        <div>
          <div>총명한판다</div>
          <div>2024.01.02</div>
        </div>
        <div className='flex gap-1'>
          <div>♡</div>
          <div>123</div>
        </div>
      </div>
    </div>
  )
}

export default DetailBody