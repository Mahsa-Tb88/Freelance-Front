import { useMutation } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL = SERVER_URL;
const authAxios = axios.create({
  baseURL: SERVER_URL,
});

export default authAxios;

export async function uploadFile(file) {
  try {
    const form = new FormData();
    form.append("file", file);
    const { data } = await authAxios.post("/uploads", form);
    return data;
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: e.response.data.message,
    };
  }
}

export async function registerUser() {
  return useMutation({
    mutationFn: (data) => authAxios.post("/auth/register", data),
  });
}
