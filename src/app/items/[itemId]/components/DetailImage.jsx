import Image from 'next/image'
import React from 'react'

function DetailImage({ product }) {
  return (
    <div className='border rounded-3xl border-black-500 flex justify-center items-center w-auto aspect-square m-4 relative'>
      {product && product.images && product.images.length > 0 ? (
        <Image
          src={product.images[0]}
          alt={product.name || '상품 이미지'}
          fill
          style={{ objectFit: 'contain' }}
        />
      ) : (
        <div>이미지 준비중입니다</div>
      )}
    </div>
  )
}

export default DetailImage