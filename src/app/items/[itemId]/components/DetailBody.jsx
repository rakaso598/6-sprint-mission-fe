import React from 'react'

function DetailBody({ product }) {
  return (
    <div className='flex flex-col gap-4 m-4'>
      {product ?
        (
          <>
            <div className='font-bold'>{product.name}</div>
            <div className='text-2xl'>{product.price}</div>
            <div className='font-bold'>상품 소개</div>
            <div>{product.description}</div>
            <div className='font-bold'>상품 태그</div>
            {product && product.tags && product.tags.length > 0 && (
              <div className='flex gap-2'>
                {product.tags.map((tag, index) => (
                  <div key={index}>#{tag}</div>
                ))}
              </div>
            )}
            <div className='flex items-center justify-between'>
              <div>프로필사진</div>
              <div>
                <div>{product.ownerNickname}</div>
                <div>{product.createdAt}</div>
              </div>
              <div className='flex gap-2'>
                <div>♡</div>
                <div>{product.favoriteCount}</div>
              </div>
            </div>
          </>
        ) : (
          <div>상품 정보를 불러오는 중... 또는 정보가 없습니다.</div>
        )}
    </div>
  )
}

export default DetailBody