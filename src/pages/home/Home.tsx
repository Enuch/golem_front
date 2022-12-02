import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Footer } from "../../components/footer/Footer"
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
                            <ToastContainer />
                            <MenuHorizontal />
                            <div className='container-xxl flex-grow-1 container-p-y'>
                                <Outlet />
                            </div>
                            <Footer />
                        </div>
                    </div>
                )
                :
                (
                    <div className="layout-container">
                        <div className='content-wrapper'>
                            <div className='container-xxl flex-grow-1 container-p-y'>
                                <ToastContainer />
                                <MenuHorizontal />
                                <br />
                                <Outlet />
                            </div>
                            <Footer />
                        </div>
                    </div>
                )}


        </div>
    )
}