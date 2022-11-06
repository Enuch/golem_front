import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TRequest } from "../../types/TRequest";
import { RequestController } from "./Request.controller";

let previuosPage = 0;

export const Request = () => {
    const controller = RequestController();

    const [requests, setRequests] = useState<TRequest[]>([]);
    const [refresh] = useState<number>(0);

    useEffect(() => {
        controller.findAll(setRequests);
    }, [refresh]);

    const setStatus = (status: Number): string => {
        if (status === 1) return "Em análise";
        else if (status === 2) return "Enviado";
        else if (status === 3) return "Cancelado";
        return '';
    }

    const setBadgeStatus = (status: Number): string => {
        if (status === 1) return "badge bg-label-secondary";
        else if (status === 2) return "badge bg-label-success";
        else if (status === 3) return "badge bg-label-danger";
        return '';
    }

    // FILTRO
    const [filtro, setFiltro] = useState(0);

    const requestsFiltered = requests.filter((request) => {
        if (filtro === 0) return request;
        return request.status === filtro;
    });

    // PAGINAÇÃO
    const [itensPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(0);

    const pages = Math.ceil(requestsFiltered.length / itensPerPage);
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = requestsFiltered.slice(startIndex, endIndex);

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
                <span className="text-muted fw-light">Requisições /</span> Lista
            </h4>

            {/*Botão Modal*/}
            <div style={{ marginBottom: "20px" }} className="col-lg-4 col-md-6">
                <div className="mt-3">
                    <Link to={`/form-request`}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#basicModal"
                        >
                            Nova Requisição
                        </button>
                    </Link>
                </div>
            </div>

            {/* Busca */}
            <div className="col" style={{ marginBottom: "20px" }}>
                <div className="card">
                    <h5 className="card-header">Busca</h5>
                    <div className="card-body">
                        <div>
                            <select
                                value={filtro}
                                onChange={(e) => setFiltro(Number.parseInt(e.target.value))}
                                className="form-select"
                                aria-label="Default select example"
                            >
                                <option value={0}>
                                    Selecione um estatus
                                </option>
                                <option value={1}>Em análise</option>
                                <option value={2}>Enviado</option>
                                <option value={3}>Finalizado</option>
                                <option value={4}>Recusada</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* LISTA */}
            <div className="row">
                <div className="col-lg-12 col-md-4 order-0">
                    <div className="row">
                        {currentItens.map((request) => {
                            return (
                                <div
                                    key={request.id.toString()}
                                    className="col-lg-3 col-md-24 col-6 mb-4"
                                >
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-title d-flex align-items-start justify-content-between">
                                                <div className="avatar flex-shrink-0">
                                                    <img
                                                        src="../static/assets/img/icons/unicons/chart-success.png"
                                                        alt="chart success"
                                                        className="rounded"
                                                    />
                                                </div>
                                                <div className="dropdown">
                                                    <button
                                                        className="btn p-0"
                                                        type="button"
                                                        id="cardOpt3"
                                                        data-bs-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="bx bx-dots-vertical-rounded"></i>
                                                    </button>
                                                    <div
                                                        className="dropdown-menu dropdown-menu-end"
                                                        aria-labelledby="cardOpt3"
                                                    >
                                                        <Link className="dropdown-item" to={`/details`}>
                                                            Detalhes
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="fw-semibold d-block mb-1">
                                                <strong>
                                                    {request.material_request[0]?.amount_requested.toString()}
                                                </strong>{" "}
                                                unid.
                                            </span>
                                            <h3 className="card-title mb-2">
                                                <strong>
                                                    {request.material_request[0]?.material.name}
                                                </strong>{" "}
                                                <span style={{ fontSize: "15px" }}>material.</span>
                                            </h3>
                                            <span className={setBadgeStatus(request.status)}>
                                                {setStatus(request.status)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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
                                        onClick={(e) =>
                                            setCurrentPage(Number(e.currentTarget.value))
                                        }
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
                </div>
            </div>
        </>
    );
};
