import axios from "axios";

export const Api = axios.create({
  baseURL: `https://golem-tads.herokuapp.com/`,
});
