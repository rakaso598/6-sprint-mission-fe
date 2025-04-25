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
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTkxLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTc0NTU2MjU0MSwiZXhwIjoxNzQ1NTY0MzQxLCJpc3MiOiJzcC1wYW5kYS1tYXJrZXQifQ.ZioyYm5ZSDAConC4fXL8bOEhAeabzsYbd4W0N8DNH6g';

  useEffect(() => {
    async function loadProduct() {
      const data = await getProductDetail(itemId);
      setLoading(false);
      if (data?.error) {
        setError(data.error);
      } else {
        setProduct(data);
        setEditedProduct(data);
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
    const result = await updateProduct(itemId, editedProduct, authToken);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setProduct(result);
      setIsEditing(false);
      setError(null);
    }
  };

  const handleDeleteProduct = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      setLoading(true);
      const result = await deleteProduct(itemId, authToken);
      setLoading(false);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        router.push('/products');
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
          <button onClick={() => setIsEditing(false)}>취소</button>
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