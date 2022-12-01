import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StatusBadge } from "../../components/status/StatusBadge";
import { AuthContext } from "../../context/auth/AuthContext";
import { TRequest } from "../../types/TRequest";
import { formatDate } from "../../utils/utils";
import { MaterialController } from "../material/Material.controller";
import { MaterialRequestController } from "./MaterialRequest.controller";
import { RequestController } from "./Request.controller";

export const Details = () => {
    const auth = useContext(AuthContext);
    const controller = RequestController();
    const materialRequestController = MaterialRequestController();
    const materialController = MaterialController();
    const { id } = useParams();
    const id_request = Number.parseInt(id!);
    const navigate = useNavigate()

    useEffect(() => {
        controller.findOne(id_request, setRequests);
    }, []);

    const [request, setRequests] = useState<TRequest>();
    const [fields, setFields] = useState<any>({})
    const [ids, setIds] = useState<any>({})
    console.log(fields)
    console.log(ids)

    const handleChange = (event: any, material_id: any, material_amount: number) => {
        setFields({ ...fields, [event.target.name]: event.target.value })
        setIds({ ...ids, [material_id]: (material_amount - event.target.value) })
    }

    const aceptRequest = (event: any) => {
        event.preventDefault()
        controller.update(id_request, { status: 2 })

        for (const key in fields) {
            materialRequestController.update(Number.parseInt(key), { amount_received: Number.parseInt(fields[key]) })

            console.log(`Key: ${key}, Value: ${fields[key]}`)
        }

        for (const key in ids) {
            materialController.update(Number.parseInt(key), { amount: Number.parseInt(ids[key]) })
        }

        navigate(`/request`)

    }

    const cancelRequest = () => {
        controller.update(id_request, { status: 3 })

    }

    return (
        <>
            {/*Titulo*/}
            <h4 className="fw-bold py-3 mb-4">
                <span className="text-muted fw-light">Requisições /</span> Detalhes
            </h4>

            <div className="row">
                <div className="col-md-6 col-lg-4 col-xl-2 order-0 mb-4"></div>

                <div className="col-md-6 col-lg-8 order-1 mb-4">
                    <div className="card h-100">
                        <div className="card-header d-flex align-items-center justify-content-between pb-0">
                            <div className="card-title mb-0">
                                <h5 className="m-0 me-2">Detalhes da Requisição</h5>
                                <StatusBadge status={request?.status} />
                            </div>
                            {request?.status! > 1 ? (
                                <div></div>
                            ) : (
                                <div className="dropdown">
                                    <button
                                        className="btn p-0"
                                        type="button"
                                        id="orederStatistics"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i className="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="orederStatistics"
                                    >
                                        {/* <a className="dropdown-item" href="">
                                            Deletar
                                        </a>
                                        <a
                                            onClick={() =>
                                                handleSetRequest(
                                                    request?.material_request[0].id!,
                                                    request?.material_request[0].material.id!,
                                                    request?.material_request[0].amount!,
                                                    request?.origin!
                                                )
                                            }
                                            className="dropdown-item"
                                            href=""
                                            data-bs-toggle="modal"
                                            data-bs-target="#basicModal"
                                        >
                                            Editar
                                        </a> */}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="card-body">
                            <div
                                className="d-flex justify-content-between align-items-center mb-3"
                                style={{ position: "relative" }}
                            >
                                <div className="d-flex flex-column gap-0">
                                    <h4>Requisitante</h4>
                                    <span>{request?.requested_user.username}</span>
                                </div>
                                <div className="resize-triggers">
                                    <div className="expand-trigger">
                                        <div style={{ width: "240px", height: "139px" }}></div>
                                    </div>
                                    <div className="contract-trigger"></div>
                                </div>
                            </div>
                            <ul className="p-0 m-0">
                                {request?.material_request.map((material) => {
                                    return (
                                        <li key={material.id} className="d-flex mb-4 pb-1">
                                            <div className="avatar flex-shrink-0 me-3">
                                                <span className="avatar-initial rounded bg-label-primary">
                                                    <i className="bx bx-mobile-alt"></i>
                                                </span>
                                            </div>
                                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                                <div className="me-2">
                                                    <h6 className="mb-0">{material.material.name}</h6>

                                                    <small className="text-muted">
                                                        {material.material.origin}
                                                    </small>
                                                </div>
                                                <div className="user-progress">
                                                    <small className="fw-semibold">
                                                        {material.amount_requested}
                                                        <span>unid.</span>
                                                    </small>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                                <li className="d-flex mb-4 pb-1">
                                    <div className="avatar flex-shrink-0 me-3">
                                        <span className="avatar-initial rounded bg-label-success">
                                            <i className="bx bx-closet"></i>
                                        </span>
                                    </div>
                                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                        <div className="me-2">
                                            <h6 className="mb-0">Data de Requisição</h6>
                                            <small className="text-muted">
                                                {formatDate(request?.created_date.toString()!)}
                                            </small>
                                        </div>
                                        <div className="user-progress">
                                            <small className="fw-semibold">23h ago</small>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 col-lg-4 col-xl-2 order-0 mb-4"></div>

                <div className="col-md-6 col-lg-8 order-1 mb-4">
                    <form
                        id="form-action-request"
                        className="card h-100"
                    >
                        <div className="card-header d-flex align-items-center justify-content-between pb-0">
                            <div className="d-flex flex-column gap-0">
                                <h4>Reposta de</h4>
                                <span>{auth.user?.username}</span>
                            </div>
                            {request?.status! > 1 ? (
                                <div></div>
                            ) : (
                                <div className="dropdown">
                                    <input
                                        className="btn btn-primary"
                                        type="submit"
                                        value="Aceitar"
                                        style={{ marginRight: "5px" }}
                                        onClick={(e) => aceptRequest(e)}
                                    />
                                    <input
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        value="Recusar"
                                        onClick={cancelRequest}
                                    />
                                </div>
                            )}
                        </div>
                        <br />
                        <div className="card-body">
                            {request?.material_request.map((material, index) => {
                                return (
                                    <div
                                        key={material.id}
                                        className="d-flex justify-content-between align-items-center mb-3"
                                        style={{ position: "relative" }}
                                    >
                                        <div>
                                            <label
                                                htmlFor="defaultFormControlInput"
                                                className="form-label"
                                            >
                                                Quantidade aceita
                                            </label>
                                            {request?.status! > 1 ? (
                                                <p> {material.amount_received} </p>
                                            ) : (
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="defaultFormControlInput"
                                                    placeholder="0"
                                                    aria-describedby="defaultFormControlHelp"
                                                    name={`${material.id}`}
                                                    onChange={(e) => handleChange(e, material.material.id, material.material.amount)}
                                                />
                                            )}

                                            <div
                                                id="defaultFormControlHelp"
                                                className="form-text"
                                            ></div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="defaultFormControlInput"
                                                className="form-label"
                                            >
                                                Quantidade pedida
                                            </label>
                                            <p>{material.amount_requested}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
