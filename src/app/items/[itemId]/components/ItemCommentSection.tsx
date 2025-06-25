// import styled from "styled-components";
// import { useQueryClient } from "@tanstack/react-query";
// import CommentThread from "./CommentThread";
// import CommentForm from "./CommentForm";
// import { addProductComment } from "../../../api/products"; // api 경로 확인

// // Styled-components 정의
// const CommentInputSection = styled.section`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;

// const SectionTitle = styled.h1`
//   font-size: 16px;
//   font-weight: 600;
// `;

// // ✨ ItemCommentSection 컴포넌트의 props 타입을 정의합니다.
// interface ItemCommentSectionProps {
//   productId: string; // productId는 문자열입니다.
// }

// const ItemCommentSection = ({ productId }: ItemCommentSectionSectionProps) => {
//   const queryClient = useQueryClient();

//   // ✨ handleCommentFormSubmit 함수의 인자 타입을 명시합니다.
//   const handleCommentFormSubmit = async (content: string) => {
//     // addProductComment 함수에 필요한 두 번째 인자가 객체 형태여야 합니다.
//     // 만약 addProductComment가 { content: string } 형태를 직접 받는다면 다음처럼 호출합니다.
//     await addProductComment(productId, { content });

//     // 댓글 추가 후 관련 쿼리를 무효화하여 최신 데이터를 다시 가져옵니다.
//     queryClient.invalidateQueries({
//       queryKey: ["products", productId, "comments"],
//     });
//   };

//   return (
//     <>
//       <CommentInputSection>
//         <SectionTitle>문의하기</SectionTitle>
//         {/* CommentForm에 defaultValue와 onSubmit prop을 전달합니다. */}
//         <CommentForm defaultValue="" onSubmit={handleCommentFormSubmit} />
//       </CommentInputSection>

//       {/* CommentThread 컴포넌트에 productId를 전달하여 해당 상품의 댓글을 표시합니다. */}
//       <CommentThread productId={productId} />
//     </>
//   );
// };

// export default ItemCommentSection;
