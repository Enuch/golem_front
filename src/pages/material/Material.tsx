import { useFormik, Field, FormikProvider } from "formik";
import { useEffect, useState } from "react";
import { TCategory } from "../../types/TCategory";
import { MaterialController } from "./Material.controller";
import * as Yup from "yup";
import { TMaterial } from "../../types/TMaterial";
import { CategoryController } from "../category/Category.controller";
import { Filter } from "../../components/filter/Filter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let previuosPage = 0;
let update = false

export const Material = () => {
    const controller = MaterialController();
    const controllerCategory = CategoryController();
    const [formValues, setFormValue] = useState<TMaterial>()
    const [initialValues, setInitialValues] = useState({
        name: "",
        origin: "",
        amount: 1,
        category_id: 0,
        id: 0,
    })
    const formik = useFormik({
        initialValues: formValues || initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required("Obrigatório!"),
            origin: Yup.string().required("Obrigatório!"),
            amount: Yup.number().required("Obrigatório!"),
            category_id: Yup.number().min(1).max(3).moreThan(0, 'Obrigatório!').required("Obrigatório!"),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            values.category_id = Number.parseInt(values.category_id.toString());

            if (update === true) {
                updateM(values.id, values as TMaterial)
            } else {
                createM(values);
            }
            update = false
            setFormValue(undefined)
        },
    });

    const [materials, setMaterials] = useState<TMaterial[]>([]);
    const [categories, setCategories] = useState<TCategory[]>([]);
    const [refresh, setRefresh] = useState<number>(0);

    useEffect(() => {
        controller.findAll(setMaterials);
        controllerCategory.findAll(setCategories);
    }, [refresh]);

    const createM = async (data: Object) => {
        await controller.create(data);
        toast.success("Material cadastrado!", {
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

    const setUpdate = async (data: TMaterial) => {
        update = true;
        setFormValue(data)
    };

    const updateM = async (id: number, data: TMaterial) => {
        console.log(data)
        await controller.update(id, {
            name: data.name,
            origin: data.origin,
            amount: data.amount,
            category_id: data.category_id,
        });
        toast.success("Material atualizado!", {
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

    const deleteM = async (event: any) => {
        event.preventDefault();
        await controller.delete(formValues?.id!);
        toast.success("Material deletado!", {
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

    const cancelForm = () => {
        update = false;
        setFormValue(undefined)
    }

    // FILTRO
    const [filtro, setFiltro] = useState("");

    const lowerCase = filtro?.toLocaleLowerCase();
    const materialsFiltered = materials.filter((material) => {
        return material.name.toLowerCase().includes(lowerCase);
    });

    // PAGINAÇÃO
    const [itensPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);

    const pages = Math.ceil(materialsFiltered.length / itensPerPage);
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = materialsFiltered.slice(startIndex, endIndex);

    const [flag, setFlag] = useState(0);
    let red = 0;

    useEffect(() => {
        if (previuosPage - 1 > currentPage) {
            if (flag === 0) {
                setFlag(flag);
            } else {
                setFlag(flag - 1);
                previuosPage = currentPage - 1;
            }
        } else if (previuosPage + 1 < currentPage) {
            if (flag === pages) {
                setFlag(flag);
            } else {
                setFlag(flag + 1);
                previuosPage = currentPage + 1;
            }
        }
    }, [currentPage, flag, pages]);

    return (
        <>
            <ToastContainer />
            {/*Titulo*/}
            <h4 className="fw-bold py-3 mb-4">
                <span className="text-muted fw-light">Materiais /</span> Lista
            </h4>

            <FormikProvider value={formik}>
                {/*Botão Modal*/}
                <div className="col-lg-4 col-md-6">
                    <div className="mt-3">
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#basicModal"
                        >
                            Novo Material
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
                                            Cadastrar Material
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={cancelForm}
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
                                                        className="form-control"
                                                        id="name"
                                                        name="name"
                                                        placeholder="Limpeza"
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
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label htmlFor="origin" className="form-label">
                                                        Origin
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="origin"
                                                        name="origin"
                                                        placeholder="UFRN"
                                                        aria-describedby="defaultFormControlHelp"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.origin}
                                                        required
                                                    />
                                                    {formik.touched.origin && formik.errors.origin ? (
                                                        <div style={{ color: 'red', fontWeight: 'bolder' }}>{formik.errors.origin}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label htmlFor="amount" className="form-label">
                                                        Quantidade
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="amount"
                                                        name="amount"
                                                        placeholder="1"
                                                        aria-describedby="defaultFormControlHelp"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.amount}
                                                        required
                                                    />
                                                    {formik.touched.amount && formik.errors.amount ? (
                                                        <div style={{ color: 'red', fontWeight: 'bolder' }}>{formik.errors.amount}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label htmlFor="category_id" className="form-label">
                                                        Categoria
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        as="select"
                                                        id="category_id"
                                                        name="category_id"
                                                        className="form-select"
                                                        aria-label="Default select example"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.category_id}
                                                        required
                                                    >
                                                        <option value={0}>Selecione uma categoria</option>
                                                        {categories.map((category) => {
                                                            return (
                                                                <option key={category.id} value={category.id}>
                                                                    {category.name}
                                                                </option>
                                                            );
                                                        })}
                                                        {formik.touched.category_id && formik.errors.category_id ? (
                                                            <div style={{ color: 'red', fontWeight: 'bolder' }}>{formik.errors.category_id}</div>
                                                        ) : null}
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                onClick={cancelForm}
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                data-bs-dismiss={
                                                    formik.errors.amount ||
                                                        formik.errors.origin ||
                                                        formik.errors.category_id ||
                                                        formik.errors.name
                                                        ? null
                                                        : "modal"
                                                }
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
                                            Deseja excluir?
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <form onSubmit={deleteM}>
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
                                                Sim
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
                                <th>Nome</th>
                                <th>Origem</th>
                                <th>Quantidade</th>
                                <th>Categoria</th>
                                <th>ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItens.map((item) => {
                                return (
                                    <tr key={item.id.toString()}>
                                        <td>{item.name}</td>
                                        <td>{item.origin}</td>
                                        <td>{item.amount.toString()}</td>
                                        <td>{item.category?.name}</td>
                                        <td>
                                            <p>
                                                <i
                                                    onClick={() => setFormValue(item)}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#basicModalUp"
                                                    className="fa-solid fa-trash"
                                                    style={{ cursor: "pointer" }}
                                                ></i>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <i onClick={() => setUpdate(item)}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#basicModal"
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
                    <li
                        value={0}
                        onClick={(e) => setCurrentPage(Number(e.currentTarget.value))}
                        className="page-item first"
                    >
                        <p style={{ cursor: "pointer" }} className="page-link">
                            <i className="tf-icon bx bx-chevrons-left"></i>
                        </p>
                    </li>
                    <li
                        value={currentPage < 1 ? currentPage : currentPage - 1}
                        onClick={(e) => setCurrentPage(Number(e.currentTarget.value))}
                        className="page-item prev"
                    >
                        <p style={{ cursor: "pointer" }} className="page-link">
                            <i className="tf-icon bx bx-chevron-left"></i>
                        </p>
                    </li>
                    {Array.from(Array(pages), (item, index) => {
                        if (red > 2) return red++;
                        return (
                            <li
                                key={index}
                                value={index + flag}
                                onClick={(e) => setCurrentPage(Number(e.currentTarget.value))}
                                className="page-item"
                            >
                                <p style={{ cursor: "pointer" }} className="page-link">
                                    {index + flag}
                                </p>
                            </li>
                        );
                    })}

                    <li
                        value={currentPage > pages - 2 ? currentPage : currentPage + 1}
                        onClick={(e) => setCurrentPage(Number(e.currentTarget.value))}
                        className="page-item next"
                    >
                        <p style={{ cursor: "pointer" }} className="page-link">
                            <i className="tf-icon bx bx-chevron-right"></i>
                        </p>
                    </li>
                    <li
                        value={pages - 1}
                        onClick={(e) => setCurrentPage(Number(e.currentTarget.value))}
                        className="page-item last"
                    >
                        <p style={{ cursor: "pointer" }} className="page-link">
                            <i className="tf-icon bx bx-chevrons-right"></i>
                        </p>
                    </li>
                </ul>
            </nav>
        </>
    );
};
