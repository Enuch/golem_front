export const Details = () => {
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
                                {/* <small className={setBadgeStatus(request?.status!)}>
                                        {setStatus(request?.status!)}
                                    </small> */}
                            </div>
                            {/* {request?.status! > 1 ? (
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
                                            <a className="dropdown-item" href="">
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
                                            </a>
                                        </div>
                                    </div>
                                )} */}
                        </div>
                        <div className="card-body">
                            <div
                                className="d-flex justify-content-between align-items-center mb-3"
                                style={{ position: "relative" }}
                            >
                                <div className="d-flex flex-column gap-0">
                                    <h4>Requisitante</h4>
                                    {/* <span>{request?.requested_user.name}</span> */}
                                </div>
                                <div className="resize-triggers">
                                    <div className="expand-trigger">
                                        <div style={{ width: "240px", height: "139px" }}></div>
                                    </div>
                                    <div className="contract-trigger"></div>
                                </div>
                            </div>
                            <ul className="p-0 m-0">
                                <li className="d-flex mb-4 pb-1">
                                    <div className="avatar flex-shrink-0 me-3">
                                        <span className="avatar-initial rounded bg-label-primary">
                                            <i className="bx bx-mobile-alt"></i>
                                        </span>
                                    </div>
                                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                        <div className="me-2">
                                            <h6 className="mb-0">Material</h6>
                                            <small className="text-muted">
                                                {/* {request?.material_request[0].material.name} */}
                                            </small>
                                        </div>
                                        <div className="user-progress">
                                            <small className="fw-semibold">
                                                {/* {request?.material_request[0].amount.toString()}{" "} */}
                                                <span>unid.</span>
                                            </small>
                                        </div>
                                    </div>
                                </li>
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
                                                {/* {request?.requested_date.toString()} */}
                                            </small>
                                        </div>
                                        <div className="user-progress">
                                            <small className="fw-semibold">23h ago</small>
                                        </div>
                                    </div>
                                </li>
                                <li className="d-flex mb-4 pb-1">
                                    <div className="avatar flex-shrink-0 me-3">
                                        <span className="avatar-initial rounded bg-label-info">
                                            <i className="bx bx-home-alt"></i>
                                        </span>
                                    </div>
                                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                        <div className="me-2">
                                            <h6 className="mb-0">Origem</h6>
                                            {/* <small className="text-muted">{request?.origin}</small> */}
                                        </div>
                                        <div className="user-progress">
                                            <small className="fw-semibold">849k</small>
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
                    // onSubmit={aceptRequest}
                    >
                        <div className="card-header d-flex align-items-center justify-content-between pb-0">
                            <div className="d-flex flex-column gap-0">
                                <h4>Reposta de</h4>
                                {/* <span>{auth.user?.name}</span> */}
                            </div>
                            {/* {request?.status! > 1 ? (
                                    <div></div>
                                ) : (
                                    <div className="dropdown">
                                        <input
                                            className="btn btn-primary"
                                            type="submit"
                                            value="Aceitar"
                                            style={{ marginRight: "5px" }}
                                        />
                                        <input
                                            className="btn btn-outline-secondary"
                                            onClick={rejectRequest}
                                            type="button"
                                            value="Recusar"
                                        />
                                    </div>
                                )} */}
                        </div>
                        <br />
                        <div className="card-body">
                            <div
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
                                    {/* {request?.status! > 1 ? (
                                            <p> {materialEntrance?.amount} </p>
                                        ) : (
                                            <input
                                                value={amountAcept?.toString()}
                                                onChange={(e) =>
                                                    setAmountAcept(Number.parseInt(e.target.value))
                                                }
                                                type="number"
                                                max={request?.material_request[0].amount.toString()}
                                                min={1}
                                                className="form-control"
                                                id="defaultFormControlInput"
                                                placeholder="0"
                                                aria-describedby="defaultFormControlHelp"
                                            />
                                        )} */}

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
                                    {/* <p>{request?.material_request[0].amount.toString()}</p> */}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
