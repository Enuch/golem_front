import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { TMaterial } from "../../types/TMaterial";
import { CategoryController } from "./Category.controller";
import * as Yup from 'yup'

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
            alert("Material cadastrado com sucesso!");
            createM(values);
        },
    });

    const [materials, setMaterials] = useState<TMaterial[]>([]);
    const [refresh, setRefresh] = useState<number>(0)

    useEffect(() => {
        controller.findAll(setMaterials);
    }, [refresh]);

    const createM = async (data: Object) => {
        await controller.create(data);
        setRefresh(refresh + 1)
    };

    const deleteM = async (id: number) => {
        await controller.delete(id)
        setRefresh(refresh + 1)
    }

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
            {/* <Search filtro={filtro} fun={setFiltro} /> */}

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
                            {materials.map((item) => {
                                return (
                                    <tr key={item.id.toString()}>
                                        <td>{item.name}</td>
                                        <td>
                                            <p>
                                                <i onClick={() => { deleteM(item.id) }}
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
            {/* <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li value={0} onClick={(e) => setCurrentPage(Number(e.currentTarget.value))} className="page-item first">
                  <a className="page-link" href="javascript:void(0);"><i className="tf-icon bx bx-chevrons-left"></i></a>
                </li>
                <li value={(currentPage < 1) ? currentPage : currentPage - 1} onClick={(e) => setCurrentPage(Number(e.currentTarget.value))} className="page-item prev">
                  <a className="page-link" href="javascript:void(0);"><i className="tf-icon bx bx-chevron-left"></i></a>
                </li>
                {Array.from(Array(pages), (item, index) => {
                  if (red > 2) return
                  red++
                  return <li key={index} value={index + flag} onClick={(e) => setCurrentPage(Number(e.currentTarget.value))} className="page-item">
                    <a className="page-link" href="javascript:void(0);">{index + flag}</a>
                  </li>
                })}

                <li value={(currentPage > pages - 2) ? currentPage : currentPage + 1} onClick={(e) => setCurrentPage(Number(e.currentTarget.value))} className="page-item next">
                  <a className="page-link" href="javascript:void(0);"><i className="tf-icon bx bx-chevron-right"></i></a>
                </li>
                <li value={pages - 1} onClick={(e) => setCurrentPage(Number(e.currentTarget.value))} className="page-item last">
                  <a className="page-link" href="javascript:void(0);"><i className="tf-icon bx bx-chevrons-right"></i></a>
                </li>
              </ul>
            </nav>*/}
        </>
    );
};
