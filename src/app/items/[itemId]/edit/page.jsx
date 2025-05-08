'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductDetail, updateProduct, deleteProduct } from '@/app/actions/product';

export default function ProductDetailPage() {
  const { itemId } = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [authToken, setAuthToken] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('토큰이 없습니다. 로그인 페이지로 이동합니다.');
      router.push('/signin');
      return;
    }
    setAuthToken(accessToken);
  }, [router]);

  // useQuery 사용
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', itemId],
    queryFn: () => getProductDetail(itemId),
    onSuccess: (data) => {
      setEditedProduct(data);
    },
    enabled: !!itemId && !!authToken,
  });

  // updateMutation
  const updateMutation = useMutation({
    mutationFn: (updatedData) => updateProduct(itemId, updatedData, authToken),
    onSuccess: () => {  //수정 후 캐시 무효화
      queryClient.invalidateQueries(['product', itemId]);
      setIsEditing(false);
    },
    onError: (error) => {
      console.error('상품 수정 오류', error);
      alert('상품 수정에 실패했습니다.');
    },
  });

  // deleteMutation
  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(itemId, authToken),
    onSuccess: () => {
      router.push('/products'); //성공시 '/products'로 이동
    },
    onError: (error) => {
      console.error('상품 삭제 오류', error);
      alert('상품 삭제에 실패했습니다.');
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = () => { // async 제거
    if (authToken) {
      const updatedData = {
        name: editedProduct.name,
        description: editedProduct.description,
        tags: editedProduct.tags,
        price: editedProduct.price,
        // 필드 추가 가능
      };
      updateMutation.mutate(updatedData); // await 제거
    }
  };

  const handleCancelEdit = () => {
    setEditedProduct(product);
    setIsEditing(false);
  };

  const handleDeleteProduct = () => { // async 제거
    if (window.confirm('정말로 삭제하시겠습니까?') && authToken) {
      deleteMutation.mutate(); // await 제거
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>{error?.message || '상품 정보를 불러오는 데 실패했습니다.'}</div>
    ); //error 메세지
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
              disabled={updateMutation.isLoading} // react-query 관련 코드: 뮤테이션 로딩 중 버튼 비활성화
              className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline ${updateMutation.isLoading ? 'opacity-50 cursor-not-allowed' : '' // react-query 관련 코드: 로딩 중 스타일 변경
                }`}
            >
              {updateMutation.isLoading ? '저장 중...' : '저장'}
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline"
            >
              취소
            </button>
          </div>
          {updateMutation.isError && (
            <div className="text-red-500">{updateMutation.error?.message}</div>
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
            disabled={deleteMutation.isLoading} // react-query 관련 코드: 뮤테이션 로딩 중 버튼 비활성화
            className={`bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline ${deleteMutation.isLoading ? 'opacity-50 cursor-not-allowed' : '' // react-query 관련 코드: 로딩 중 스타일 변경
              }`}
          >
            {deleteMutation.isLoading ? '삭제 중...' : '삭제'}
          </button>
          {deleteMutation.isError && (
            <div className="text-red-500">{deleteMutation.error?.message}</div>
          )}
        </div>
      )}
      {authToken && (
        <div className="bg-yellow-400">localStorage에 JWT 토큰이 존재합니다.</div>
      )}
    </div>
  );
}
