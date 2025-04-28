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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            name="name"
            value={editedProduct.name || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <textarea
            name="description"
            value={editedProduct.description || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleUpdateProduct}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              저장
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            수정
          </button>
          <button
            onClick={handleDeleteProduct}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}