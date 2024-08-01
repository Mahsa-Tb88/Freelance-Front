import { useMutation, useQuery } from "@tanstack/react-query";
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
    staleTime: Infinity,
  });
}

export function useSignOut() {
  return useQuery({
    queryKey: ["signOut"],
    queryFn: () => axios.post("/auth/signOut"),
  });
}

export function useGetAllProductsOfSeller(id) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => axios.get(`/api/products/seller/${id}`),
  });
}
