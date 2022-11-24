import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { Menu } from "../../components/menu/Menu"
import { MenuHorizontal } from "../../components/menu/MenuHorizontal"
import { AuthContext } from "../../context/auth/AuthContext"

export const Home = () => {
    const auth = useContext(AuthContext);

    return (
        <div className="layout-wrapper layout-content-navbar">
            {(auth.user?.role !== 3) ?
                (
                    <div className="layout-container">
                        <Menu />
                        <div className='layout-page'>
                            <div className='container-xxl'>
                                <MenuHorizontal />
                                <br />
                                <br />
                                <Outlet />
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <div className="layout-container">
                        <br /><br />
                        <div className='container-xxl'>
                            <MenuHorizontal />
                            <Outlet />
                        </div>
                    </div>
                )}


        </div>
    )
}