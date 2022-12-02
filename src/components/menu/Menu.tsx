import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/auth/AuthContext"

export const Menu = () => {
    const auth = useContext(AuthContext);
    return (
        <aside
            className="layout-menu menu-vertical menu bg-menu-theme"
        >
            <div className="app-brand demo">
                <Link to={'/dashboard'} className="app-brand-link">
                    <span className="app-brand-logo demo">
                        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/076.png" width={40} alt="" />
                    </span>
                    <span className="display-5 demo menu-text ms-2">
                        Golem
                    </span>
                </Link>

            </div>

            <ul className="menu-inner py-1">
                <li className="menu-item">
                    <Link
                        to={`/dashboard`}
                        className="menu-link"
                    >
                        <i className="menu-icon tf-icons bx bx-home-circle"></i>
                        <div data-i18n="Analytics">Home</div>
                    </Link>
                </li>

                <li className="menu-header small text-uppercase">
                    <span className="menu-header-text">Contas</span>
                </li>
                <li className="menu-item">
                    <Link to={`/user`} className="menu-link">
                        <i className="menu-icon tf-icons bx bx-user"></i>
                        <div data-i18n="Layouts">Usuários</div>
                    </Link>
                </li>

                <li className="menu-header small text-uppercase">
                    <span className="menu-header-text">Inventário</span>
                </li>
                <li className="menu-item">
                    <Link
                        to={`/category`}
                        className="menu-link"
                    >
                        <i className="menu-icon tf-icons bx bx-category-alt"></i>
                        <div data-i18n="Account Settings">Categorias</div>
                    </Link>
                </li>
                <li className="menu-item">
                    <Link
                        to={`/material`}
                        className="menu-link"
                    >
                        <i className="menu-icon tf-icons bx bx-package"></i>
                        <div data-i18n="Authentications">Materiais</div>
                    </Link>
                </li>

                <li className="menu-header small text-uppercase">
                    <span className="menu-header-text">Requisitantes</span>
                </li>

                <li className="menu-item">
                    <Link
                        to={`/request`}
                        className="menu-link"
                    >
                        <i className="menu-icon tf-icons bx bx-alarm-exclamation"></i>
                        <div data-i18n="Basic">Requisições</div>
                    </Link>
                </li>

                <li className="menu-header small text-uppercase">
                    <span className="menu-header-text">Ação</span>
                </li>

                <li className="menu-item">
                    <Link to={`/login`} className="menu-link" onClick={auth.signout}>
                        <i className="menu-icon tf-icons bx bx-log-out"></i>
                        <div data-i18n="Tables">Sair</div>
                    </Link>
                </li>
            </ul>
        </aside>
    )
}