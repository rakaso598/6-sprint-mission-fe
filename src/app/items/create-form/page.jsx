'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function CreateForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const router = useRouter();

  const handleRegister = async () => { // 버튼 클릭 시 실행될 함수
    const productData = {
      name,
      price: parseInt(price),
    };

    try {
      const response = await fetch('http://localhost:5050/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        router.push('/products');
      } else {
        const errorData = await response.json();
        console.error('상품 등록 실패:', errorData);
        // 에러 처리
      }
    } catch (error) {
      console.error('상품 등록 요청 중 오류:', error);
      // 네트워크 오류 처리
    }
  };

  return (
    <div>
      <h1>상품 등록</h1>
      <div>
        <label htmlFor="name">이름:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="price">가격:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          required
        />
      </div>
      <button onClick={handleRegister}>등록</button> {/* form 대신 button 사용 */}
    </div>
  );
}

export default CreateForm;