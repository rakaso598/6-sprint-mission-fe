import React from 'react'

function DetailContact() {
  return (
    <div className='flex flex-col m-4'>
      <div className='font-bold'>문의하기</div>
      <div className='bg-gray-300 p-4 mt-4'>개인정보를 공유 및요청하거나 명예훼손, 무단 홍보, 불법 홍보 시 모니터링 후 삭제될 수 있으며, 민형사상 책임은 게시자에게 있습니다.</div>
      <div className='flex justify-end'>
        <button className='bg-gray-300 p-2 w-20 mt-4'>등록</button>
      </div>
      <div className='flex flex-col items-center'>
        <div className='m-16'>아직 문의가 없어요 ㅠ_ㅠ</div>
        <div className='bg-blue-400 p-3'>목록으로 돌아가기</div>
      </div>
    </div>
  )
}

export default DetailContact