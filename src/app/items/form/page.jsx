'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function CreateForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    const productData = {
      name,
      price: parseInt(price),
    };

    try {
      const response = await fetch('http://localhost:5050/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        router.push('/items');
      } else {
        const errorData = await response.json();
        console.error('상품 등록 실패:', errorData);
        setErrorMessage(errorData.message || '상품 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('상품 등록 요청 중 오류:', error);
      setErrorMessage('상품 등록 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1 className='text-2xl'>상품 등록</h1>
      <h2 className='text-xl'>로그인 통해 로컬스토리지에 토큰이 꼭 있어야 등록가능합니다.</h2>
      <div className='m-4'>
        <div>
          <label htmlFor="name">이름:</label>
          <input
            className='border'
            placeholder='상품 이름을 입력하세요'
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
            className='border'
            placeholder='상품 가격을 입력하세요'
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </div>
      <button onClick={handleRegister} className='border bg-orange-300 p-2'>등록하기</button>
      {errorMessage && (<div className='mt-4 text-red-500'>에러 발생: {errorMessage}</div>)}
    </div>
  );
}

export default CreateForm;