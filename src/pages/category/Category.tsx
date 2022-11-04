import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { TCategory } from "../../types/TCategory";
import { CategoryController } from "./Category.controller";
import * as Yup from 'yup'
import { Filter } from "../../components/filter/Filter";

let previuosPage = 0

export const Category = () => {
    const controller = CategoryController();
    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("O nome é obrigatório!")
        }),

        onSubmit: (values) => {
            alert("Categoria cadastrado com sucesso!");
            createC(values);
        },
    });

    const [categories, setcategories] = useState<TCategory[]>([]);
    const [refresh, setRefresh] = useState<number>(0)

    useEffect(() => {
        controller.findAll(setcategories);
    }, [refresh]);

    const createC = async (data: Object) => {
        await controller.create(data);
        setRefresh(refresh + 1)
    };

    const deleteC = async (id: number) => {
        await controller.delete(id)
        setRefresh(refresh + 1)
    }

    // filtro
    const [filtro, setFiltro] = useState('')

    const lowerCase = filtro?.toLocaleLowerCase()
    const categoriesFiltered = categories.filter(category => {
        return category.name.toLowerCase().includes(lowerCase)
    })

    // paginação
    const [itensPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(0)

    const pages = Math.ceil(categoriesFiltered.length / itensPerPage)
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = categoriesFiltered.slice(startIndex, endIndex)

    const [flag, setFlag] = useState(0)
    let red = 0

    useEffect(() => {
        if (previuosPage - 1 > currentPage) {
            if (currentPage === 0) { setFlag(flag) }
            else {
                setFlag(flag - 1)
                previuosPage = currentPage - 1
            }
        } else if (previuosPage + 1 < currentPage) {
            if (currentPage === pages - 1) { setFlag(flag) }
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
                <span className="text-muted fw-light">Categorias /</span> Lista
            </h4>

            {/*Botão Modal*/}
            <div className="col-lg-4 col-md-6">
                <div className="mt-3">
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#basicModal"
                    >
                        Nova Categoria
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
                                        Cadastrar Categoria
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
                                                <label htmlFor="name" className="form-label">
                                                    Nome
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Enter Name"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.name || ""}
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
                                            data-bs-dismiss={formik.touched.name && formik.errors.name ? null : "modal"}
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
                                        Editar Categoria
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
                                                <label htmlFor="name" className="form-label">
                                                    Nome
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Enter Name"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.name || ""}
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
                                            data-bs-dismiss={formik.touched.name && formik.errors.name ? null : "modal"}
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

            {/* Busca */}
            <Filter filtro={filtro} fun={setFiltro} />

            {/* Lista */}
            <div className="card" style={{ marginBottom: "20px", marginTop: "20px" }}>
                <h5 className="card-header">Materiais</h5>
                <div className="table-responsive text-nowrap">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItens.map((item) => {
                                return (
                                    <tr key={item.id.toString()}>
                                        <td>{item.name}</td>
                                        <td>
                                            <p>
                                                <i onClick={() => { deleteC(item.id) }}
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
