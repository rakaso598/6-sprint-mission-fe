'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ProductDetailPage() {
  const { itemId } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('토큰이 없습니다. 로그인 페이지로 이동합니다.');
      router.push('/signin');
      return;
    }
    setAccessToken(accessToken);
  }, [router]);

  useEffect(() => {
    if (itemId && accessToken) {
      setLoading(true);
      fetch(`${apiUrl}/products/${itemId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setProduct(data);
          setEditedProduct(data);
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          setLoading(false);
        });
    }
  }, [itemId, accessToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async () => {
    if (accessToken && editedProduct) {
      setUpdateLoading(true);
      setUpdateError(null);
      try {
        const updatedData = {
          name: editedProduct.name,
          price: editedProduct.price,
          // 필드가 필요하다면 추가
        };

        const response = await fetch(`${apiUrl}/products/${itemId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedData),
        });
        if (response.ok) {
          // 서버가 204 No Content 응답을 보낸 경우
          router.push('/items'); // 상품 목록 페이지로 이동
        }
      } catch (e) {
        console.error('상품 수정 오류', e);
        setUpdateError(e.message || '상품 수정에 실패했습니다.');
        alert('상품 수정에 실패했습니다.');
      } finally {
        setUpdateLoading(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditedProduct(product);
    setIsEditing(false);
  };

  const handleDeleteProduct = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?') && accessToken) {
      setDeleteLoading(true);
      setDeleteError(null);
      try {
        const response = await fetch(`${apiUrl}/products/${itemId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }
        router.push('/items');
      } catch (e) {
        console.error('상품 삭제 오류', e);
        setDeleteError(e.message || '상품 삭제에 실패했습니다.');
        alert('상품 삭제에 실패했습니다.');
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>{error?.message || '상품 정보를 불러오는 데 실패했습니다.'}</div>
    );
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container flex flex-col gap-4 items-center mt-40">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            name="name"
            value={editedProduct?.name || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <textarea
            name="description"
            value={editedProduct?.description || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleUpdateProduct}
              disabled={updateLoading}
              className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline ${updateLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {updateLoading ? '저장 중...' : '저장'}
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline"
            >
              취소
            </button>
          </div>
          {updateError && (
            <div className="text-red-500">{updateError}</div>
          )}
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
            disabled={deleteLoading}
            className={`bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline ${deleteLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {deleteLoading ? '삭제 중...' : '삭제'}
          </button>
          {deleteError && (
            <div className="text-red-500">{deleteError}</div>
          )}
        </div>
      )}
      {accessToken && (
        <div className="bg-yellow-400">localStorage에 JWT 토큰이 존재합니다.</div>
      )}
    </div>
  );
}