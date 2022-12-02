import { useContext } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext"

export const MenuHorizontal = () => {
    const auth = useContext(AuthContext);

    const setRole = (role: number) => {
        if (role === 1) return 'Admin'
        else if (role === 2) return 'Funcionário'
        else if (role === 3) return 'Requisitante'
    }

    return (
        <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                    <i className="bx bx-menu bx-sm"></i>
                </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                <span>
                    <i className="fa-solid fa-circle-exclamation">
                    </i>{' '}
                    4 Novas Requisições
                </span>
                {(auth.user?.role !== 3) ?
                    (
                        null
                    ) :
                    (
                        <div className="navbar-nav align-items-center">
                            <div style={{ padding: '5px' }}>
                                <Link to={`/`}>
                                    Home
                                </Link>
                            </div>

                            <div style={{ padding: '5px' }}>
                                <Link to={`/request`}>
                                    Requisições
                                </Link>
                            </div>

                        </div>
                    )}

                <ul className="navbar-nav flex-row align-items-center ms-auto">
                    {/* <!-- Place this tag where you want the button to render. --> */}
                    <li className="nav-item lh-1 me-3">
                        <span>{auth.user?.username}</span>
                    </li>

                    {/* <!-- User --> */}
                    <li className="nav-item navbar-dropdown dropdown-user dropdown">
                        <small className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <div className="avatar avatar-online">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtPIhccd0-_ZC1krWItWW00QqafoygfmvXJAbPSFji8w&s" alt="" className="w-px-40 h-auto rounded-circle" />
                            </div>
                        </small>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <small className="dropdown-item" >
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar avatar-online">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtPIhccd0-_ZC1krWItWW00QqafoygfmvXJAbPSFji8w&s" alt="" className="w-px-40 h-auto rounded-circle" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <span className="fw-semibold d-block">{auth.user?.name}</span>
                                            <small className="text-muted">{setRole(auth.user?.role!)}</small>
                                        </div>
                                    </div>
                                </small>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>

                            <li>
                                <Link className="dropdown-item" to={`/login`} onClick={auth.signout}>
                                    <i className="bx bx-power-off me-2"></i>
                                    <span className="align-middle">Log Out</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    {/* <!--/ User --> */}
                </ul>
            </div>
        </nav>
    )
}