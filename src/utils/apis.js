import axios from "axios";

axios.defaults.baseURL = SERVER_URL;
axios.defaults.withCredentials = true;

export async function SignOut() {
  try {
    const { data } = await axios.post("/auth/signOut");
    return data;
  } catch (error) {
    return { success: false, message: "Error connection" };
  }
}
