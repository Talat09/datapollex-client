import axios from "axios";

export const api = axios.create({
  baseURL: "https://datapollex-backend.vercel.app/api",
});
