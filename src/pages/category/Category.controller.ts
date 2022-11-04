import { Api } from "../../context/hooks/useApi";

export const CategoryController = () => ({
    findAll: async (fun: Function) => {
        return await Api.get(`/category`)
            .then((response) => fun(response.data))
            .catch((err) => console.error(err));
    },

    findOne: async (id: number, fun: Function) => {
        return await Api.get(`/category/${id}`)
            .then((response) => fun(response.data))
            .catch((err) => console.error(err));
    },

    create: async (data: Object) => {
        return await Api.post(`/category`, data)
            .then((response) => response.data)
            .catch((err) => console.error(err));
    },

    update: async (id: number, data: Object) => {
        return await Api.patch(`/category/${id}`, data)
            .then((response) => response.data)
            .catch((err) => console.error(err));
    },

    delete: async (id: number) => {
        return await Api.delete(`/category/${id}`)
            .then((response) => response.data)
            .catch((err) => console.error(err));
    },
});
