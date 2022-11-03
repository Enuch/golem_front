import { Outlet } from "react-router-dom"
import { Menu } from "../../components/menu/Menu"

export const Home = () => {
    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <Menu />
                <div className='layout-page'>

                    <br /><br />
                    <div className='container-xxl'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}