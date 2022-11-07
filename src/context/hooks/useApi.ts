import axios from "axios";

export const Api = axios.create({
  baseURL: `https://golem-tads.herokuapp.com/`,
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };

    const response = await Api.get("/profile/", { headers });
    return response.data;
  },

  signin: async (username: string, password: string) => {
    const response = await Api.post("/auth/login", { username, password });
    return response.data;
  },

  logout: async () => {
    const response = await Api.post("/logout/");
  },
});
