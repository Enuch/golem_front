import axios from "axios";

export const Api = axios.create({
  baseURL: process.env.GOLEM_API || `http://localhost:3001`,
});
