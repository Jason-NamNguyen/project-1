import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import bgsidebar from '../../Assets/img/bg1.jpeg'
import { NavLink, Link } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from "react-icons/md";
const SidebarComponent = (props) => {
    const { collapsed } = props;
    return (
        <>
            <Sidebar collapsed={collapsed} collapsedWidth='0' transitionDuration={500} image={bgsidebar}>
                <NavLink to="/" className='navbar-brand'>Bơ Bánh Bao</NavLink>
                <Menu>
                    <MenuItem icon={<MdOutlineSpaceDashboard />} component={<Link to="/admin" />}>Dashboard</MenuItem>
                    <MenuItem component={<Link to="/admin/manage-users" />}>Users</MenuItem>
                    <MenuItem component={<Link to="/admin/manage-admin" />}>Admin</MenuItem>
                    <MenuItem component={<Link to="/admin/products" />}>Products</MenuItem>
                    <MenuItem>Reports </MenuItem>
                </Menu>
            </Sidebar>
        </>
    )
}
export default SidebarComponent;