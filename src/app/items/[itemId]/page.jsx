'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductDetail } from '@/app/actions/product';
import DetailImage from './components/DetailImage';
import DetailBody from './components/DetailBody';
import DetailContact from './components/DetailContact';

export default function ProductDetailPage() {
  const { itemId } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('토큰이 없습니다. 로그인 페이지로 이동합니다.');
      router.push('/signin');
      return;
    }
    setAuthToken(accessToken);

    async function loadProduct() {
      try {
        const data = await getProductDetail(itemId);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('상품 상세 정보를 불러오는 데 실패했습니다.');
        console.error('상품 상세 정보 로드 오류:', error);
      }
    }

    loadProduct();
  }, [itemId]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <DetailImage product={product} />
      <DetailBody product={product} />
      <DetailContact product={product} />
    </div>
  );
}

// 상품상세정보 렌더링