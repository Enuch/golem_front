import { useFormik, Field, FormikProvider } from "formik";
import { useState } from "react";
import { TUser } from "../../types/TUser";
import * as Yup from "yup";
import { UserController } from "./User.controller";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

let update: boolean = false;

export const UserForm = () => {
    const controller = UserController();

    const [formValues, setFormValues] = useState<TUser>();
    const [refresh, setRefresh] = useState<number>(0);

    const [initialValues, setInitialValues] = useState({
        username: "",
        password: "",
        email: "",
        role: 0,
        office: "",
        sector: "",
        name: "",
        id: null,
    })
    const formik = useFormik({
        initialValues: formValues || initialValues,
        validationSchema: Yup.object({
            username: Yup.string().required("Obrigatório!"),
            password: Yup.string().required("Obrigatório!"),
            email: Yup.string().email().required("Obrigatório!"),
            role: Yup.number().min(1).max(3).moreThan(0, 'Obrigatório!').required("Obrigatório!"),
            office: Yup.string().required("Obrigatório!"),
            sector: Yup.string().required("Obrigatório!"),
            name: Yup.string().required("Obrigatório!"),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            values.role = Number.parseInt(values.role.toString());

            if (update === true) {
                updateU(values.id!, values);
            } else {
                createU(values);
            }
            update = false;
            setFormValues(undefined);
            setInitialValues({
                username: '',
                password: "",
                email: "",
                role: 0,
                office: "",
                sector: "",
                name: "",
                id: null,
            })
        },
    });

    const setUpdate = (data: TUser) => {
        update = true;
        setFormValues({
            username: data.username,
            password: data.password,
            email: data.email,
            role: data.role,
            office: data.office,
            sector: data.sector,
            name: data.name,
            active: data.active,
            id: data.id,
        });
    };

    const createU = async (data: Object) => {
        await controller.create(data);
        toast.success("Usuário cadastrado!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setRefresh(refresh + 1);
    };

    const updateU = async (id: number, data: Object) => {
        await controller.update(id, data);
        toast.success("Usuário atualizado!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setRefresh(refresh + 1);
    };

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                    <span className="text-muted fw-light">Usuários /</span> Formulário
                </h4>
                <div className="row">
                    <div className="col-xl">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Cadastrar Usuário</h5>
                            </div>
                            <div className="card-body">
                                <FormikProvider value={formik}>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="mb-3">
                                            <div className="modal-body">
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <label htmlFor="username" className="form-label">
                                                            Login
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="username"
                                                            name="username"
                                                            placeholder="ex: lucas"
                                                            aria-describedby="defaultFormControlHelp"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.username}
                                                            required={true}
                                                        />
                                                        {formik.touched.username && formik.errors.username ? (
                                                            <div style={{ color: 'red', fontWeight: 'bolder' }}>{formik.errors.username}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <label htmlFor="password" className="form-label">
                                                            Senha
                                                        </label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            id="password"
                                                            name="password"
                                                            placeholder="***"
                                                            aria-describedby="defaultFormControlHelp"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.password}
                                                            required
                                                        />
                                                        {formik.touched.password && formik.errors.password ? (
                                                            <div style={{ color: 'red', fontWeight: 'bolder' }}>{formik.errors.password}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <label htmlFor="email" className="form-label">
                                                            Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            id="email"
                                                            name="email"
                                                            placeholder="lucas@gmail.com"
                                                            aria-describedby="defaultFormControlHelp"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.email}
                                                            required
                                                        />
                                                        {formik.touched.email && formik.errors.email ? (
                                                            <div style={{ color: 'red', fontWeight: 'bolder' }}>{formik.errors.email}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <label htmlFor="role" className="form-label">
                                                            Papel
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            id="role"
                                                            name="role"
                                                            className="form-select"
                                                            aria-label="Default select example"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.role}
                                                            required
                                                        >
                                                            <option value={0}>Selecione um papel</option>
                                                            <option value={1}>Administrador</option>
                                                            <option value={2}>Funcionário</option>
                                                            <option value={3}>Requisitante</option>
                                                        </Field>
                                                        {formik.touched.role && formik.errors.role ? (
                                                            <div style={{ color: 'red', fontWeight: 'bolder' }}>{formik.errors.role}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <label htmlFor="office" className="form-label">
                                                            Função
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="office"
                                                            name="office"
                                                            placeholder="ex: Coordenador"
                                                            aria-describedby="defaultFormControlHelp"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.office}
                                                            required
                                                        />
                                                        {formik.touched.office && formik.errors.office ? (
                                                            <div style={{ color: 'red', fontWeight: 'bolder' }}>{formik.errors.office}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <label htmlFor="sector" className="form-label">
                                                            Setor
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="sector"
                                                            name="sector"
                                                            placeholder="ex: almoxarifado"
                                                            aria-describedby="defaultFormControlHelp"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.sector}
                                                            required
                                                        />
                                                        {formik.touched.sector && formik.errors.sector ? (
                                                            <div style={{ color: 'red', fontWeight: 'bolder' }}>{formik.errors.sector}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <label htmlFor="name" className="form-label">
                                                            Nome
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="name"
                                                            name="name"
                                                            placeholder="ex: Lucas Fernandes"
                                                            aria-describedby="defaultFormControlHelp"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.name}
                                                            required
                                                        />
                                                        {formik.touched.name && formik.errors.name ? (
                                                            <div style={{ color: 'red', fontWeight: 'bolder' }}>{formik.errors.name}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Cadastrar Usuário
                                        </button>
                                    </form>
                                </FormikProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}