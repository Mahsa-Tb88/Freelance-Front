import axios from "axios";

axios.defaults.baseURL = SERVER_URL;
const authAxios = axios.create({
  baseURL: SERVER_URL,
}); 
export async function uploadFile(file) {
  try {
    const form = new FormData();
    form.append("file", file);
    const { data } = await authAxios.post("/uploads", form);
    return data;
  } catch (e) {
    return {
      success: false,
      message: e.message,
    };
  }
}
