import { Api } from "../../context/hooks/useApi";

export const MaterialController = () => ({
    findAll: async (fun: Function) => {
        return await Api.get(`/material`)
            .then((response) => fun(response.data))
            .catch((err) => console.error(err));
    },

    findOne: async (id: number, fun: Function) => {
        return await Api.get(`/material/${id}`)
            .then((response) => fun(response.data))
            .catch((err) => console.error(err));
    },

    create: async (data: Object) => {
        return await Api.post(`/material`, data)
            .then((response) => response.data)
            .catch((err) => console.error(err));
    },

    update: async (id: number, data: Object) => {
        return await Api.patch(`/material/${id}`, data)
            .then((response) => response.data)
            .catch((err) => console.error(err));
    },

    delete: async (id: number) => {
        return await Api.delete(`/material/${id}`)
            .then((response) => response.data)
            .catch((err) => console.error(err));
    },
});
