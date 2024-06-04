import SidebarComponent from "./Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SidebarComponent collapsed={collapsed} />
            </div>

            <div className="admin-content">
                <div className="admin-header">
                    <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
                        Sidebar
                    </button>
                </div>
                <div className="admin-main">

                    <Outlet />
                </div>
            </div>

        </div>
    )
}
export default Admin