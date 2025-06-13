// src/app/items/[itemId]/page.tsx

"use client"; // 이 지시어는 Next.js App Router에서 클라이언트 컴포넌트임을 명시합니다.

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query"; // CommentSection 내부에서 사용
import axios from "@/api/axios"; // axios 인스턴스 경로 확인 (DetailBody, ItemCommentSection에서 사용)
import Button from "@/components/UI/Button"; // CommentForm에서 사용
import TextareaItem from "@/components/UI/TextareaItem"; // CommentForm에서 사용

// ====================================================================
// Product 데이터 타입 정의 (외부 파일에서 가져오던 것)
// ====================================================================
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  tags?: string[];
  ownerNickname?: string;
  createdAt?: string;
  favoriteCount?: number;
}

// ====================================================================
// getProductDetail 함수 (외부 파일에서 가져오던 것)
// ====================================================================
// 실제 API 엔드포인트와 응답 구조에 맞게 수정 필요합니다.
async function getProductDetail(productId: number): Promise<Product> {
  try {
    const response = await axios.get<Product>(`/articles/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product detail for ID ${productId}:`, error);
    throw new Error("상품 상세 정보를 가져오는 데 실패했습니다.");
  }
}

// ====================================================================
// addProductComment 함수 (ItemCommentSection 내부에서 사용)
// ====================================================================
// 댓글 추가 API 함수 (실제 API 경로와 응답 구조에 맞게 수정 필요)
interface AddCommentPayload {
  content: string;
}
async function addProductComment(
  productId: string,
  payload: AddCommentPayload
): Promise<void> {
  try {
    await axios.post(`/articles/${productId}/comments`, payload);
  } catch (error) {
    console.error(`Error adding comment to product ${productId}:`, error);
    throw new Error("댓글 추가에 실패했습니다.");
  }
}

// ====================================================================
// DetailImage 컴포넌트 (외부 파일에서 가져오던 것)
// ====================================================================
interface DetailImageProps {
  product: Product;
}
function DetailImage({ product }: DetailImageProps) {
  return (
    <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="text-gray-500">이미지 없음</div>
      )}
    </div>
  );
}

// ====================================================================
// DetailBody 컴포넌트 (외부 파일에서 가져오던 것)
// ====================================================================
interface DetailBodyProps {
  product: Product;
}
function DetailBody({ product }: DetailBodyProps) {
  return (
    <div className="flex flex-col gap-4 m-4">
      {product ? (
        <>
          <div className="font-bold text-xl">{product.name}</div>
          <div className="text-3xl font-semibold text-blue-600">
            {product.price.toLocaleString()}원
          </div>

          <div className="font-bold text-lg mt-4">상품 소개</div>
          <div className="text-gray-700 leading-relaxed">
            {product.description}
          </div>

          <div className="font-bold text-lg mt-4">상품 태그</div>
          {product.tags && product.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-sm">등록된 태그가 없습니다.</div>
          )}

          <hr className="my-6 border-t border-gray-200" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
                PIC
              </div>
              <div>
                <div className="font-semibold text-lg">
                  {product.ownerNickname}
                </div>
                <div className="text-gray-500 text-sm">
                  {new Date(product.createdAt || "").toLocaleDateString(
                    "ko-KR"
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-red-500">
              <span className="text-lg">❤️</span>
              <span className="font-medium">{product.favoriteCount}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 py-8">
          상품 정보를 불러오는 중... 또는 정보가 없습니다.
        </div>
      )}
    </div>
  );
}

// ====================================================================
// DetailContact 컴포넌트 (외부 파일에서 가져오던 것)
// ====================================================================
function DetailContact() {
  return (
    <div className="flex justify-center p-4">
      {/* 실제 연락처 정보 또는 메시지 보내기 버튼 등 */}
      <div className="bg-green-500 text-white p-3 rounded-lg text-center cursor-pointer">
        판매자와 채팅하기
      </div>
    </div>
  );
}

// ====================================================================
// CommentForm 컴포넌트 (외부 파일에서 가져오던 것)
// ====================================================================
const COMMENT_PLACEHOLDER =
  "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

const CommentForm_Form = styled.form`
  // 이름 충돌 방지를 위해 접두사 추가
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentForm_Footer = styled.div`
  // 이름 충돌 방지를 위해 접두사 추가
  display: flex;
  flex-direction: row-reverse;
  gap: 16px;
`;

type CommentFormProps = {
  defaultValue: string;
  submitLabel?: string;
  onSubmit: (content: string) => Promise<void> | void;
  onCancel?: () => void;
};

function CommentForm({
  defaultValue,
  submitLabel = "등록",
  onSubmit,
  onCancel,
}: CommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<{ content: string }>({
    mode: "onChange",
    defaultValues: { content: defaultValue },
  });

  const enhancedOnSubmit = async ({ content }: { content: string }) => {
    await onSubmit(content);
    reset({ content: defaultValue });
  };

  useEffect(() => {
    reset({ content: defaultValue });
  }, [defaultValue, reset]);

  return (
    <CommentForm_Form onSubmit={handleSubmit(enhancedOnSubmit)}>
      {" "}
      {/* 이름 변경된 스타일 컴포넌트 사용 */}
      <TextareaItem
        id="content"
        placeholder={COMMENT_PLACEHOLDER}
        register={register("content", {
          required: true,
        })}
      />
      <CommentForm_Footer>
        {" "}
        {/* 이름 변경된 스타일 컴포넌트 사용 */}
        <Button disabled={!isValid}>{submitLabel}</Button>
        {onCancel && (
          <Button type="button" onClick={onCancel} $appearance="secondary">
            취소
          </Button>
        )}
      </CommentForm_Footer>
    </CommentForm_Form>
  );
}

// ====================================================================
// CommentThread 컴포넌트 (외부 파일에서 가져오던 것)
// ====================================================================
// Comment 데이터 타입 정의 (실제 API 응답에 맞춰 속성을 추가하거나 수정)
interface Comment {
  id: number;
  content: string;
  authorNickname: string;
  createdAt: string;
  // 필요한 다른 댓글 속성들
}

interface CommentThreadProps {
  productId: string;
}

// 댓글 데이터를 가져오는 함수 (useQuery 사용 예시)
// 이 함수는 @tanstack/react-query의 useQuery 훅과 함께 사용됩니다.
async function fetchComments(productId: string): Promise<Comment[]> {
  try {
    const response = await axios.get<Comment[]>(
      `/articles/${productId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for product ${productId}:`, error);
    throw new Error("댓글을 불러오는 데 실패했습니다.");
  }
}

function CommentThread({ productId }: CommentThreadProps) {
  // useQuery를 직접 임포트하지 않고 여기서는 간단한 로딩/에러/데이터 상태를 보여줍니다.
  // 실제 CommentThread 컴포넌트는 useQuery를 사용하여 데이터를 가져와야 합니다.
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchComments(productId)
      .then((data) => {
        setComments(data);
      })
      .catch((err) => {
        setError("댓글을 불러오는 데 실패했습니다.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  if (loading)
    return (
      <div className="text-center py-4 text-gray-500">
        댓글을 불러오는 중...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-4 text-red-500">
        댓글 로드 오류: {error}
      </div>
    );

  return (
    <div className="mt-8 p-4 border rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4">댓글 ({comments.length})</h2>
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-3 last:border-b-0">
              <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                <span className="font-semibold">{comment.authorNickname}</span>
                <span>
                  {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
                </span>
              </div>
              <p className="text-gray-800">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">
          등록된 댓글이 없습니다.
        </div>
      )}
    </div>
  );
}

// ====================================================================
// ItemCommentSection 컴포넌트 (외부 파일에서 가져오던 것)
// ====================================================================
const CommentInputSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
`;

interface ItemCommentSectionProps {
  productId: string;
}

const ItemCommentSection = ({ productId }: ItemCommentSectionProps) => {
  const queryClient = useQueryClient();

  const handleCommentFormSubmit = async (content: string) => {
    await addProductComment(productId, { content });
    queryClient.invalidateQueries({
      queryKey: ["products", productId, "comments"],
    });
  };

  return (
    <>
      <CommentInputSection className="mt-8 p-4 border rounded-lg bg-white">
        <SectionTitle>문의하기</SectionTitle>
        <CommentForm defaultValue="" onSubmit={handleCommentFormSubmit} />
      </CommentInputSection>

      <CommentThread productId={productId} />
    </>
  );
};

// ====================================================================
// ProductDetailPage 메인 컴포넌트
// ====================================================================
export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("토큰이 없습니다. 로그인 페이지로 이동합니다.");
      router.push("/signin");
      return;
    }

    let currentItemId: number | undefined;
    if (typeof params.itemId === "string") {
      currentItemId = Number(params.itemId);
    } else if (Array.isArray(params.itemId) && params.itemId.length > 0) {
      currentItemId = Number(params.itemId[0]);
    }

    if (isNaN(currentItemId as number) || currentItemId === undefined) {
      setError("유효하지 않은 상품 ID입니다.");
      setLoading(false);
      return;
    }

    async function loadProduct() {
      try {
        const data: Product = await getProductDetail(currentItemId as number);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("상품 상세 정보를 불러오는 데 실패했습니다.");
        console.error("상품 상세 정보 로드 오류:", err);
      }
    }

    loadProduct();
  }, [params.itemId, router]);

  if (loading)
    return <div className="text-center py-10">상품 정보를 불러오는 중...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">오류: {error}</div>;
  if (!product)
    return <div className="text-center py-10">상품을 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <DetailImage product={product} />
      <DetailBody product={product} />

      {/* productId는 문자열이어야 하므로 toString() 사용 */}
      <ItemCommentSection productId={product.id.toString()} />

      <DetailContact />

      <div className="flex justify-center mt-8 mb-4">
        <Link href="/items" className="w-full">
          <div className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg flex justify-center items-center font-semibold">
            목록으로 돌아가기
          </div>
        </Link>
      </div>
    </div>
  );
}
