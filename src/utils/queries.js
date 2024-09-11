import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
axios.defaults.baseURL = SERVER_URL;
axios.defaults.withCredentials = true;

export async function uploadFile(file) {
  try {
    const form = new FormData();
    form.append("file", file);
    const { data } = await axios.post("/uploads", form);
    return data;
  } catch (e) {
    return {
      success: false,
      message: e.response.data.message,
    };
  }
}

export function useLogin() {
  return useMutation({
    mutationFn: (variables) => axios.post("/auth/login", variables),
  });
}

export function useInitialized() {
  return useQuery({
    queryKey: ["initialize"],
    queryFn: () => axios.get("/misc/initialize"),
  });
}

export function useSignOut(isSignOut) {
  return useMutation({
    mutationFn: (variable) => axios.post("/auth/signOut", variable),
  });
}
export function useGetProductById(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => axios.get(`/api/products/${id}`),
  });
}

export function useEditProduct() {
  return useMutation({
    mutationFn: (variable) =>
      axios.put(`/api/products/${variable.id}`, variable.FormData),
  });
}

export function useCreateProduct() {
  return useMutation({
    mutationFn: (variable) => axios.post("/api/products", variable),
  });
}

export function useRemoveProductById() {
  return useMutation({
    mutationFn: (variable) =>
      axios.delete(`/api/products/${variable}`, variable),
  });
}
export function useGetAllProductsOfSeller(id) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => axios.get(`/api/products/seller/${id}`),
  });
}
export function useInfinityProducts(
  limit,
  category,
  star,
  search,
  sort,
  order,
  Min,
  Max
) {
  return useInfiniteQuery({
    queryKey: [
      "products",
      limit,
      category,
      star,
      search,
      sort,
      order,
      Min,
      Max,
    ],
    queryFn: ({ pageParam }) =>
      axios.get("/api/products", {
        params: {
          limit,
          page: pageParam,
          category,
          star,
          search,
          sort,
          order,
          Min,
          Max,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      const filtered = lastPage.data.totalProducts.filtered;
      const totalPages = Math.ceil(filtered / limit);
      if (totalPages > pages.length) {
        return lastPageParam + 1;
      } else {
        return undefined;
      }
    },
  });
}

export function useGetAllProducts(){
  return useQuery({
    queryKey: ["sliderProducts"],
    queryFn: () => axios.get("/api/products/"),
  });
}

export function usePayment() {
  return useMutation({
    mutationFn: (variable) =>
      axios.post(`/api/orders/create-payment-intent/${variable.id}`, variable),
  });
}

export function useOrderConfirm() {
  return useMutation({
    mutationFn: (variable) =>
      axios.put(`/api/orders/`, variable.payment_intent),
  });
}

export function useGetOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => axios.get(`/api/orders/`),
  });
}

export function useCreateReview() {
  return useMutation({
    mutationFn: (variable) =>
      axios.post(`/api/reviews/${variable.id}`, variable),
  });
}

export function useReviews(id) {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => axios.get(`/api/reviews/${id}`),
    // staleTime: Infinity,
  });
}

export function useDeleteReview(id) {
  return useMutation({
    mutationFn: (variable) =>
      axios.delete(`/api/reviews/${variable.id}`, variable),
  });
}

export function usegetChatsById(id) {
  return useQuery({
    queryKey: ["singleChat"],
    queryFn: () => axios.get(`/api/chats/${id}`),
  });
}

export function usetextChat() {
  return useMutation({
    mutationFn: (variable) => axios.post(`/api/chats/`, variable),
  });
}

export function useGetMessageList(id) {
  return useQuery({
    queryKey: ["messageList"],
    queryFn: () => axios.get(`/api/msgList/${id}`),
  });
}

export function useSeenOrder() {
  return useMutation({
    mutationFn: (variables) =>
      axios.put(`/api/orders/${variables.id}`, variables),
  });
}

export function useunreadMsg() {
  return useQuery({
    queryKey: ["unreadMsg"],
    queryFn: () => axios.get("/api/msgList"),
    refetchInterval: 180000,
  });
}

export function useUnSeenOrder() {
  return useQuery({
    queryKey: ["unSeenOrder"],
    queryFn: () => axios.get("/api/orders/unSeenOrder"),
    refetchInterval: 180000,
  });
}

export function useGetSellers() {
  return useQuery({
    queryKey: ["sellers"],
    queryFn: () => axios.get("/api/sellers/"),
  });
}
export function useGetSeller(id) {
  return useQuery({
    queryKey: ["seller"],
    queryFn: () => axios.get("/api/sellers/" + id),
  });
}
