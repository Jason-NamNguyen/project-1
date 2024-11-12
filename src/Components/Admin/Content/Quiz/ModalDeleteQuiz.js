import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../Services/apiService';
import { toast } from 'react-toastify';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, quizDelete } = props;
    const handleClose = () => {
        setShow(false);
    }
    const handleSubmitDeleteUser = async () => {
        let data = await deleteQuiz(quizDelete.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            await props.fetchAllQuizByAdmin()
            handleClose();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete Quiz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete
                    <b> {quizDelete && quizDelete.name ? quizDelete.name : ""}</b>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="secondary" onClick={() => handleSubmitDeleteUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;