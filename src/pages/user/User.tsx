import { Field, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { TUser } from "../../types/TUser";
import { UserController } from "./User.controller";
import * as Yup from 'yup'
import { Filter } from "../../components/filter/Filter";

let previuosPage = 0;

export const User = () => {
    const controller = UserController();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
            role: 0,
            office: '',
            sector: '',
            name: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Obrigatório!'),
            password: Yup.string().required('Obrigatório!'),
            email: Yup.string().email().required('Obrigatório!'),
            role: Yup.number().min(1).max(3).moreThan(0).required('Obrigatório!'),
            office: Yup.string().required('Obrigatório!'),
            sector: Yup.string().required('Obrigatório!'),
            name: Yup.string().required('Obrigatório!'),
        }),

        onSubmit: (values) => {
            console.log(values);
            values.role = Number.parseInt(values.role.toString())
            createU(values);
            alert("User cadastrado com sucesso!");
        },
    });

    const [users, setUsers] = useState<TUser[]>([])
    const [refresh, setRefresh] = useState<number>(0)

    useEffect(() => {
        controller.findAll(setUsers);
    }, [refresh])

    const createU = async (data: Object) => {
        await controller.create(data);
        setRefresh(refresh + 1);
    }

    const deleteU = async (id: number) => {
        await controller.delete(id);
        setRefresh(refresh + 1);
    }

    // USER ROLE
    function roleUser(role: number) {
        if (role === 1) return 'Administrador'
        else if (role === 2) return 'Funcionário'
        else if (role === 3) return 'Requisitante'
    }

    // FILTROS
    const [filtro, setFiltro] = useState('')

    const lowerCase = filtro?.toLocaleLowerCase()
    const usersFiltered = users.filter(user => {
        return user.name.toLowerCase().includes(lowerCase)
    })

    // PAGINAÇÃO
    const [itensPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(0)

    const pages = Math.ceil(usersFiltered.length / itensPerPage)
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = usersFiltered.slice(startIndex, endIndex)

    const [flag, setFlag] = useState(0)
    let red = 0

    useEffect(() => {
        if (previuosPage - 1 > currentPage) {
            if (flag === 0) { setFlag(flag) }
            else {
                setFlag(flag - 1)
                previuosPage = currentPage - 1
            }
        } else if (previuosPage + 1 < currentPage) {
            if (flag === pages) { setFlag(flag) }
            else {
                setFlag(flag + 1)
                previuosPage = currentPage + 1
            }
        }
    }, [currentPage, flag, pages])

    return (
        <>
            {/*Titulo*/}
            <h4 className="fw-bold py-3 mb-4">
                <span className="text-muted fw-light">Usuários /</span> Lista
            </h4>

            {/*Botão Modal*/}
            <FormikProvider value={formik}>
                <div className="col-lg-4 col-md-6">
                    <div className="mt-3">
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#basicModal"
                        >
                            Novo Usuário
                        </button>

                        {/*Modal Create*/}
                        <div
                            className="modal fade"
                            id="basicModal"
                            tabIndex={-1}
                            aria-hidden="true"
                        >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel1">
                                            Cadastrar Usuário
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label
                                                        htmlFor="username"
                                                        className="form-label"
                                                    >
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
                                                    />
                                                    {formik.touched.username && formik.errors.username ? (
                                                        <div>{formik.errors.username}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label
                                                        htmlFor="password"
                                                        className="form-label"
                                                    >
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
                                                    />
                                                    {formik.touched.password && formik.errors.password ? (
                                                        <div>{formik.errors.password}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label
                                                        htmlFor="email"
                                                        className="form-label"
                                                    >
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
                                                    />
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <div>{formik.errors.email}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label
                                                        htmlFor="role"
                                                        className="form-label"
                                                    >
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
                                                    >
                                                        <option value={0}>Selecione um papel</option>
                                                        <option value={1}>Administrador</option>
                                                        <option value={2}>Funcionário</option>
                                                        <option value={3}>Requisitante</option>
                                                    </Field>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label
                                                        htmlFor="office"
                                                        className="form-label"
                                                    >
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
                                                    />
                                                    {formik.touched.office && formik.errors.office ? (
                                                        <div>{formik.errors.office}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label
                                                        htmlFor="sector"
                                                        className="form-label"
                                                    >
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
                                                    />
                                                    {formik.touched.sector && formik.errors.sector ? (
                                                        <div>{formik.errors.sector}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label
                                                        htmlFor="name"
                                                        className="form-label"
                                                    >
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
                                                    />
                                                    {formik.touched.name && formik.errors.name ? (
                                                        <div>{formik.errors.name}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Adicionar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="mt-3">
                        {/*Modal Update*/}
                        <div
                            className="modal fade"
                            id="basicModalUp"
                            tabIndex={-1}
                            aria-hidden="true"
                        >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel1">
                                            Editar Usuário
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label
                                                        htmlFor="username"
                                                        className="form-label"
                                                    >
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
                                                    />
                                                    {formik.touched.username && formik.errors.username ? (
                                                        <div>{formik.errors.username}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label
                                                        htmlFor="password"
                                                        className="form-label"
                                                    >
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
                                                    />
                                                    {formik.touched.password && formik.errors.password ? (
                                                        <div>{formik.errors.password}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label
                                                        htmlFor="email"
                                                        className="form-label"
                                                    >
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
                                                    />
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <div>{formik.errors.email}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label
                                                        htmlFor="role"
                                                        className="form-label"
                                                    >
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
                                                    >
                                                        <option value={0}>Selecione um papel</option>
                                                        <option value={1}>Administrador</option>
                                                        <option value={2}>Funcionário</option>
                                                        <option value={3}>Requisitante</option>
                                                    </Field>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label
                                                        htmlFor="office"
                                                        className="form-label"
                                                    >
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
                                                    />
                                                    {formik.touched.office && formik.errors.office ? (
                                                        <div>{formik.errors.office}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label
                                                        htmlFor="sector"
                                                        className="form-label"
                                                    >
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
                                                    />
                                                    {formik.touched.sector && formik.errors.sector ? (
                                                        <div>{formik.errors.sector}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label
                                                        htmlFor="name"
                                                        className="form-label"
                                                    >
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
                                                    />
                                                    {formik.touched.name && formik.errors.name ? (
                                                        <div>{formik.errors.name}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Adicionar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FormikProvider>

            {/* Busca */}
            <Filter filtro={filtro} fun={setFiltro} />

            {/* Lista */}
            <div className="card" style={{ marginBottom: "20px", marginTop: "20px" }}>
                <h5 className="card-header">Materiais</h5>
                <div className="table-responsive text-nowrap">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th>Login</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Função</th>
                                <th>Setor</th>
                                <th>Ativo</th>
                                <th>Papel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItens.map((item) => {
                                return (
                                    <tr key={item.id.toString()}>
                                        <td>{item.username}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.office}</td>
                                        <td>{item.sector}</td>
                                        <td>{item.active === true ? "Sim" : "Não"}</td>
                                        <td>{roleUser(item.id)}</td>
                                        <td>
                                            <p>
                                                <i
                                                    onClick={() => deleteU(item.id)}
                                                    className="fa-solid fa-trash"
                                                    style={{ cursor: "pointer" }}
                                                ></i>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <i
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#basicModalUp"
                                                    className="fa-solid fa-pen-to-square"
                                                    style={{ cursor: "pointer" }}
                                                ></i>
                                            </p>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* PAGINAÇÃO */}
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li value={0} onClick={(e) => setCurrentPage(Number(e.currentTarget.value))} className="page-item first">
                        <p style={{ cursor: "pointer" }} className="page-link"><i className="tf-icon bx bx-chevrons-left"></i></p>
                    </li>
                    <li value={(currentPage < 1) ? currentPage : currentPage - 1} onClick={(e) => setCurrentPage(Number(e.currentTarget.value))} className="page-item prev">
                        <p style={{ cursor: "pointer" }} className="page-link"><i className="tf-icon bx bx-chevron-left"></i></p>
                    </li>
                    {Array.from(Array(pages), (item, index) => {
                        if (red > 2) return red++
                        return (
                            <li key={index} value={index + flag} onClick={(e) => setCurrentPage(Number(e.currentTarget.value))} className="page-item">
                                <p style={{ cursor: "pointer" }} className="page-link">{index + flag}</p>
                            </li>
                        )
                    })}

                    <li value={(currentPage > pages - 2) ? currentPage : currentPage + 1} onClick={(e) => setCurrentPage(Number(e.currentTarget.value))} className="page-item next">
                        <p style={{ cursor: "pointer" }} className="page-link"><i className="tf-icon bx bx-chevron-right"></i></p>
                    </li>
                    <li value={pages - 1} onClick={(e) => setCurrentPage(Number(e.currentTarget.value))} className="page-item last">
                        <p style={{ cursor: "pointer" }} className="page-link"><i className="tf-icon bx bx-chevrons-right"></i></p>
                    </li>
                </ul>
            </nav>
        </>
    );
};
