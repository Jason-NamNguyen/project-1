import { useEffect, useState } from "react"
import { getAllQuizByAdmin } from "../../../../Services/apiService"
import ModalViewQuiz from "./ModalViewQuiz"
import ModalUpdateQuiz from "./ModalUpdateQuiz"
import ModalDeleteQuiz from "./ModalDeleteQuiz"

const TableQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([])
    const [showViewQuiz, setShowViewQuiz] = useState(false)
    const [viewData, setViewData] = useState({})
    const [showUpdateQuiz, setShowUpdateQuiz] = useState(false)
    const [quizUpdate, setQuizUpdate] = useState({})
    const [showDeleteQuiz, setShowDeleteQuiz] = useState(false)
    const [quizDelete, setQuizDelete] = useState({})
    useEffect(() => {
        fetchAllQuizByAdmin()
    }, [])

    const fetchAllQuizByAdmin = async () => {
        let res = await getAllQuizByAdmin()
        setListQuiz(res.DT)
    }
    const handleClickBtnView = (user) => {
        setShowViewQuiz(true)
        setViewData(user)
    }
    const handleClickBtnUpdate = (user) => {
        setShowUpdateQuiz(true)
        setQuizUpdate(user)
    }
    const handleClickBtnDelete = (user) => {
        setShowDeleteQuiz(true)
        setQuizDelete(user)
    }
    const resetQuizUpdate = () => {
        setQuizUpdate({})
    }

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td>
                                    <button
                                        className='btn btn-secondary'
                                        onClick={() => handleClickBtnView(item)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className='btn btn-warning mx-3'
                                        onClick={() => handleClickBtnUpdate(item)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => handleClickBtnDelete(item)}
                                    >
                                        Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                    {listQuiz && listQuiz.length === 0 &&
                        <td>
                            <tr colSpan={4}>No Found Quiz List</tr>
                        </td>
                    }
                </tbody>
            </table>
            <ModalViewQuiz
                show={showViewQuiz}
                setShow={setShowViewQuiz}
                viewData={viewData}
                setViewData={setViewData}
            />
            <ModalUpdateQuiz
                show={showUpdateQuiz}
                setShow={setShowUpdateQuiz}
                quizUpdate={quizUpdate}
                setQuizUpdate={setQuizUpdate}
                fetchAllQuizByAdmin={fetchAllQuizByAdmin}
                resetQuizUpdate={resetQuizUpdate}
            />
            <ModalDeleteQuiz
                show={showDeleteQuiz}
                setShow={setShowDeleteQuiz}
                quizDelete={quizDelete}
                fetchAllQuizByAdmin={fetchAllQuizByAdmin}

            />
        </>
    )
}
export default TableQuiz