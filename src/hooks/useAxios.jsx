import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { social_url } from "../utils/Api";

export default function useAxios() {
  const [auth] = useContext(AuthContext);
  const apiClient = axios.create({
    baseURL: social_url,
    headers: {
      "Content-Type": "application/json",
    },
  });

  apiClient.interceptors.request.use(function (config) {
    const token = auth.accessToken;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return apiClient;
}
