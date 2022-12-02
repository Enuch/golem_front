import { useEffect, useState } from "react"
import { TMaterial } from "../../types/TMaterial";
import { TRequest } from "../../types/TRequest"
import { MaterialController } from "../material/Material.controller";
import { RequestController } from "../request/Request.controller"

export const Dashboard = () => {
    const controllerRequest = RequestController();
    const controllerMaterial = MaterialController();

    const [requests, setRequests] = useState<TRequest[]>([])
    const [materials, setMaterials] = useState<TMaterial[]>([])

    const statusRequestNumbers = (status: number): number => {
        let requestNumber = 0;
        requests.forEach(req => {
            if (req.status === status) {
                requestNumber += 1
            }
        });
        return requestNumber;
    }

    useEffect(() => {
        controllerRequest.findAll(setRequests)
        controllerMaterial.findAllByMinorAmount(setMaterials)
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-md-10 col-lg-8 order-0">
                    <div className="row">
                        <div className="col-md-4 col-lg-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div >
                                            <h5 className="card-title">Requisições</h5>

                                            <p className="badge bg-label-secondary">Em Análise</p>

                                        </div>
                                        <div>
                                            <span className="badge bg-label-info"><i className="fa-solid fa-paper-plane"></i></span>
                                        </div>
                                    </div>
                                    <span>Quantidade</span>
                                    <h4 className="card-title mb-2">{statusRequestNumbers(1)}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div>
                                            <h5 className="card-title">Requisições</h5>

                                            <p className="badge bg-label-success">Enviadas</p>

                                        </div>
                                        <div>
                                            <span className="badge bg-label-info"><i className="fa-solid fa-paper-plane"></i></span>
                                        </div>
                                    </div>
                                    <span>Quantidade</span>
                                    <h4 className="card-title mb-2">{statusRequestNumbers(2)}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div>
                                            <h5 className="card-title">Requisições</h5>

                                            <p className="badge bg-label-danger">Canceladas</p>

                                        </div>
                                        <div>
                                            <span className="badge bg-label-info"><i className="fa-solid fa-paper-plane"></i></span>
                                        </div>
                                    </div>
                                    <span>Quantidade</span>
                                    <h4 className="card-title mb-2">{statusRequestNumbers(3)}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div>
                                            <h5 className="card-title">Requisições</h5>

                                            <p className="badge bg-label-primary">Total</p>

                                        </div>
                                        <div>
                                            <span className="badge bg-label-info"><i className="fa-solid fa-paper-plane"></i></span>
                                        </div>
                                    </div>
                                    <span>Quantidade</span>
                                    <h4 className="card-title mb-2">{requests.length}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4 order-2 mb-4 order-2">
                    <div className="card h-100">
                        <div className="card-header d-flex align-items-center justify-content-between">
                            <h5 className="card-title m-0 me-2">Menor Estoque</h5>
                            <div className="dropdown">
                                <button className="btn p-0" type="button" id="transactionID" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="transactionID">
                                    <a className="dropdown-item" href="javascript:void(0);">Last 28 Days</a>
                                    <a className="dropdown-item" href="javascript:void(0);">Last Month</a>
                                    <a className="dropdown-item" href="javascript:void(0);">Last Year</a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <ul className="p-0 m-0">
                                {materials.slice(0, 8).map(material => {
                                    return (
                                        <li className="d-flex mb-4 pb-1">
                                            <div className="avatar flex-shrink-0 me-3">
                                                <span className="avatar-initial rounded bg-label-primary"><i className="fa-solid fa-box-open"></i></span>
                                            </div>
                                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                                <div className="me-2">
                                                    <small className="text-muted d-block mb-1">{material.category.name}</small>
                                                    <h6 className="mb-0">{material.name}</h6>
                                                </div>
                                                <div className="user-progress d-flex align-items-center gap-1">
                                                    <h6 className="mb-0 badge bg-label-danger">{material.amount}</h6>
                                                    <span className="text-muted">Qtd.</span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row mb-5">

            </div>

        </>
    )
}