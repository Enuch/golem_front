import { useEffect, useState } from "react";
import { MaterialController } from "./Material.controller";
import { TMaterial } from "../../types/TMaterial";
import { Filter } from "../../components/filter/Filter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

let previuosPage = 0;

export const Material = () => {
    const controller = MaterialController();
    const [formValues, setFormValue] = useState<TMaterial>()

    const [materials, setMaterials] = useState<TMaterial[]>([]);
    const [refresh, setRefresh] = useState<number>(0);

    useEffect(() => {
        controller.findAll(setMaterials);
    }, [refresh]);

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
            {/*Titulo*/}
            <h4 className="fw-bold py-3 mb-4">
                <span className="text-muted fw-light">Materiais /</span> Lista
            </h4>

            {/*Cadastrar material*/}
            <div className="col-lg-4 col-md-6">
                <div className="mt-3">
                    <Link to={`/material-form`}>
                        <button
                            type="button"
                            className="btn btn-primary"
                        >
                            Cadastrar Material
                        </button>
                    </Link>
                </div>
            </div>

            <div className="col-lg-4 col-md-6">
                <div className="mt-3">
                    {/*Modal excluir*/}
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

            {/* Busca */}
            <Filter filtro={filtro} fun={setFiltro} />

            {/* Lista */}
            <div className="card" style={{ marginBottom: "20px", marginTop: "20px" }}>
                <h5 className="card-header">Materiais</h5>
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
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
                                        <td>
                                            <i className="fa-solid fa-box-open"></i>
                                        </td>
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
                                                    style={{ cursor: "pointer", color: 'red' }}
                                                ></i>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Link to={`material-form`}>
                                                    <i
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#basicModal"
                                                        className="fa-solid fa-pen-to-square"
                                                        style={{ cursor: "pointer", color: 'blue' }}
                                                    ></i>
                                                </Link>
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
