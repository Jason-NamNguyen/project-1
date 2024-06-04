import ModalCreateUser from "./ModalCreateUser";
import { useEffect, useState } from 'react';
import { getUserWithPaginate } from '../../../Services/apiService';
import { Button } from "react-bootstrap";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
const ManageUsers = () => {
    const LIMIT_USER = 5;
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [showCreateUser, setShowCreateUser] = useState(false)
    const [showUpdateUser, setShowUpdateUser] = useState(false)
    const [showViewUser, setShowViewUser] = useState(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})
    const [viewData, setViewData] = useState({})
    const [listUsers, setListUsers] = useState([])
    const [dataDelete, setDataDelete] = useState([])
    const handleShowCreateUser = () => {
        setShowCreateUser(true);
    }
    const handleClickBtnUpdate = (user) => {
        setShowUpdateUser(true)
        setDataUpdate(user)
    }
    const handleClickBtnView = (user) => {
        setShowViewUser(true)
        setViewData(user)
    }

    const handleClickBtnDelete = (user) => {
        setShowConfirmDelete(true)
        setDataDelete(user)
    }

    const resetViewData = () => {
        setViewData({})
    }

    const resetUpdateData = () => {
        setDataUpdate({})
    }
    //ComponentDidMount
    useEffect(() => {
        // fetchListUserWithPaginate()
        fetchListUserWithPaginate(1)
    }, []);

    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER)
        if (res.EC === 0) {
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }

    return (
        <div className="manage-user-container">
            <div className="title">
                <Button variant="primary" onClick={handleShowCreateUser}>
                    Add New User
                </Button>
                <div>
                    <ModalCreateUser
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        show={showCreateUser}
                        setShow={setShowCreateUser}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <h3>Manage Users</h3>
            </div>
            <div className="manage-user-content">
                <div className="user-list">
                    {/* <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
            <ModalUpdateUser
                show={showUpdateUser}
                setShow={setShowUpdateUser}
                dataUpdate={dataUpdate}
                fetchListUserWithPaginate={fetchListUserWithPaginate}
                resetUpdateData={resetUpdateData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ModalViewUser
                show={showViewUser}
                setShow={setShowViewUser}
                viewData={viewData}
                resetViewData={resetViewData}
            />
            <ModalDeleteUser
                show={showConfirmDelete}
                setShow={setShowConfirmDelete}
                dataDelete={dataDelete}
                fetchListUserWithPaginate={fetchListUserWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}
export default ManageUsers;