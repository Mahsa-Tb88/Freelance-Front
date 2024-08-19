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
    // staleTime: Infinity,
  });
}

export function useSignOut(isSignOut) {
  return useQuery({
    queryKey: ["signOut"],
    queryFn: () => axios.post("/auth/signOut"),
    enabled: isSignOut,
  });
}
export function useGetProductById(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => axios.get(`/api/products/${id}`),
  });
}

export function useEditProduct(id) {
  return useMutation({
    mutationFn: (variable) => axios.put(`/api/products/${id}`, variable),
  });
}

export function useCreateProduct() {
  return useMutation({
    mutationFn: (variable) => axios.post("/api/products", variable),
  });
}

export function useRemoveProductById(id) {
  return useMutation({
    mutationFn: () => axios.delete(`/api/products/${id}`),
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
