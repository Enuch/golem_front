import { Api } from "../../context/hooks/useApi";

export const RequestController = () => ({
  findAll: async (fun: Function) => {
    return await Api.get(`/request`)
      .then((response) => fun(response.data))
      .catch((err) => console.error(err));
  },

  findOne: async (id: number, fun: Function) => {
    return await Api.get(`/request/${id}`)
      .then((response) => fun(response.data))
      .catch((err) => console.error(err));
  },

  create: async (data: Object) => {
    return await Api.post(`/request`, data)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  },

  update: async (id: number, data: Object) => {
    return await Api.patch(`/request/${id}`, data)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  },

  delete: async (id: number) => {
    return await Api.delete(`/request/${id}`)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  },
});
