'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductDetail, updateProduct, deleteProduct } from '@/app/actions/product';

export default function ProductDetailPage() {
  const { itemId } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
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
        setEditedProduct(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('상품 상세 정보를 불러오는 데 실패했습니다.');
        console.error('상품 상세 정보 로드 오류:', err);
      }
    }

    loadProduct();
  }, [itemId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async () => {
    setLoading(true);
    try {
      const updatedData = {
        name: editedProduct.name,
        description: editedProduct.description,
        tags: editedProduct.tags,
        price: editedProduct.price
        // 필드 추가 가능
      };
      const result = await updateProduct(itemId, updatedData, authToken);
      setProduct(result);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('상품 수정에 실패했습니다.');
      console.error('상품 수정 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedProduct(product);
    setIsEditing(false);
  };

  const handleDeleteProduct = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      setLoading(true);
      try {
        const result = await deleteProduct(itemId, authToken);
        if (result?.success) {
          router.push('/products');
        } else {
          setError('상품 삭제에 실패했습니다.');
        }
      } catch (err) {
        setError('상품 삭제 중 오류가 발생했습니다.');
        console.error('상품 삭제 오류:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {isEditing ? (
        <div>
          <input type="text" name="name" value={editedProduct.name || ''} onChange={handleInputChange} />
          <textarea name="description" value={editedProduct.description || ''} onChange={handleInputChange} />
          <button onClick={handleUpdateProduct}>저장</button>
          <button onClick={handleCancelEdit}>취소</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setIsEditing(true)}>수정</button>
          <button onClick={handleDeleteProduct}>삭제</button>
        </div>
      )}
    </div>
  );
}