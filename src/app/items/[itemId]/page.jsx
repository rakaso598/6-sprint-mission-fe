// app/items/[itemId]/page.js
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductDetail } from '@/app/actions/product';

export default function ItemIdPage() {
  const { itemId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProductDetail() {
      const result = await getProductDetail(itemId);
      setLoading(false);
      if (result?.error) {
        setError(result.error);
      } else {
        setProductDetail(result);
      }
    }

    loadProductDetail();
  }, [itemId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!productDetail) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <div>
        <div>상세사진</div>
        <div>{productDetail?.name}</div>
        <div>{productDetail?.description}</div>
        {/* 다른 상세 내용들 */}
      </div>
      <div>
        <div>문의하기</div>
        <div>
          <input type="text" />
        </div>
        <div>등록Btn</div>
      </div>
      <div>
        <div>댓글</div>
        {/* 댓글 목록 표시 */}
      </div>
    </>
  );
}