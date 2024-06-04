import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';

const TableUserPaginate = (props) => {

    const { listUsers, pageCount, currentPage } = props;

    const handlePageClick = (event) => {
        props.fetchListUserWithPaginate(event.selected + 1)
        props.setCurrentPage(event.selected + 1)
        console.log(`User requested page number ${event.selected}`);
    }


    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                        return (
                            <tr key={`table-user-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button
                                        className='btn btn-secondary'
                                        onClick={() => props.handleClickBtnView(item)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className='btn btn-warning mx-3'
                                        onClick={() => props.handleClickBtnUpdate(item)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => props.handleClickBtnDelete(item)}
                                    >
                                        Delete</button>
                                </td>
                            </tr>
                        )
                    }
                    )
                    }
                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={4}>Not Found Data</td>
                        </tr>
                    }
                </tbody>
            </Table>
            <ReactPaginate className='pagination d-flex justify-content-center'
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
            />
        </>
    );
}
export default TableUserPaginate;