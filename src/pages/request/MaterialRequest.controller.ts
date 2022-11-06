import { Api } from "../../context/hooks/useApi";

export const MaterialRequestController = () => ({
  findAll: async (fun: Function) => {
    return await Api.get(`/material-request`)
      .then((response) => fun(response.data))
      .catch((err) => console.error(err));
  },

  findOne: async (id: number, fun: Function) => {
    return await Api.get(`/material-request/${id}`)
      .then((response) => fun(response.data))
      .catch((err) => console.error(err));
  },

  create: async (data: Object) => {
    return await Api.post(`/material-request/`, data)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  },

  createMany: async (data: Object[]) => {
    return await Api.post(`/material-request/many`, data)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  },

  update: async (id: number, data: Object) => {
    return await Api.patch(`/material-request/${id}`, data)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  },

  delete: async (id: number) => {
    return await Api.delete(`/material-request/${id}`)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  },
});
