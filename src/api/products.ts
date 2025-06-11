import axios from "./axios.js";

type TGetProduct = {
  orderBy: string;
  page: number;
  pageSize: number;
  keyword: string;
};

export async function getProducts({
  orderBy = "recent",
  page = 1,
  pageSize = 10,
  keyword,
}: TGetProduct) {
  const response = await axios.get("/products", {
    params: {
      orderBy,
      page,
      pageSize,
      keyword,
    },
  });
  const { totalCount, list } = response.data;
  return { totalCount, list };
}

export async function addProduct(product: {}) {
  const response = await axios.post("/products", product);
  const newProduct = response.data;
  return newProduct;
}

export async function getProduct(productId: number) {
  const response = await axios.get(`/products/${productId}`);
  const product = response.data;
  return product;
}

export async function patchProduct(productId: number, partialProduct: {}) {
  const response = await axios.patch(`/products/${productId}`, partialProduct);
  const product = response.data;
  return product;
}

export async function deleteProduct(productId: number) {
  await axios.delete(`/products/${productId}`);
}

export async function addProductFavorite(productId: number) {
  const response = await axios.post(`/products/${productId}/favorite`);
  const product = response.data;
  return product;
}

export async function deleteProductFavorite(productId: number) {
  const response = await axios.delete(`/products/${productId}/favorite`);
  const product = await response.data;
  return product;
}

export async function getProductComments({
  productId,
  params: { limit, cursor },
}: {
  productId: number;
  params: { limit: number; cursor: number };
}) {
  const response = await axios.get(`/products/${productId}/comments`, {
    params: { limit, cursor },
  });
  const { totalCount, list: comments } = response.data;
  return comments;
}

export async function addProductComment(
  productId: number,
  { content }: { content: {} }
) {
  const response = await axios.post(`/products/${productId}/comments`, {
    content,
  });
  const comment = response.data;
  return comment;
}
