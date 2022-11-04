import { Api } from "../../context/hooks/useApi";

export const UserController = () => ({
  findAll: async (fun: Function) => {
    return await Api.get(`/user`)
      .then((response) => fun(response.data))
      .catch((err) => console.error(err));
  },

  findOne: async (id: number, fun: Function) => {
    return await Api.get(`/user/${id}`)
      .then((response) => fun(response.data))
      .catch((err) => console.error(err));
  },

  create: async (data: Object) => {
    return await Api.post(`/user`, data)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  },

  update: async (id: number, data: Object) => {
    return await Api.patch(`/user/${id}`, data)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  },

  delete: async (id: number) => {
    return await Api.delete(`/user/${id}`)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  },
});
