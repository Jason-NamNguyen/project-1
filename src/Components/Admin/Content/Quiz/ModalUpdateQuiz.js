import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BiPlusCircle } from "react-icons/bi";
import { toast } from 'react-toastify';
import _ from 'lodash';
import { putUpdateQuiz } from '../../../../Services/apiService';
const ModalUpdateQuiz = (props) => {
    const { show, setShow, quizUpdate, setQuizUpdate } = props
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [quizImg, setQuizImg] = useState('')
    const [previewImg, setPreviewImg] = useState('')

    const handleClose = () => {
        setShow(false)
        props.resetQuizUpdate()
        setName('')
        setDescription('')
        setDifficulty('')
        setQuizImg('')
    }
    const handleSubmitUpdateQuiz = async () => {
        let data = await putUpdateQuiz(quizUpdate.id, description, name, difficulty, quizImg)
        if (data && data.EC === 0) {
            console.log('Check Fetch Update Quiz', data)
            toast.success(data.EM);
            handleClose();
            await props.fetchAllQuizByAdmin()
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    const handleUploadImg = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImg(URL.createObjectURL(event.target.files[0]))
            setQuizImg(event.target.files[0]);
        }
    }

    useEffect(() => {
        console.log(quizUpdate)
        if (!_.isEmpty(quizUpdate)) {
            if (quizUpdate.image) {
                setPreviewImg(`data:image/jpeg;base64,${quizUpdate.image}`);
            }
            setName(quizUpdate.name)
            setDescription(quizUpdate.description)
            setDifficulty(quizUpdate.difficulty)
        }
    }, [quizUpdate])

    return (
        <>
            <Modal show={show} onHide={handleClose} size='lg' backdrop='static' className='modal-update-quiz'>
                <Modal.Header closeButton>
                    <Modal.Title>Update Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="namequiz"
                                    placeholder="Enter Name Quiz"
                                    value={name}
                                    disabled
                                />
                            </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Group as={Col} >
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Quiz Description"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Difficulty</Form.Label>
                                <Form.Select defaultValue={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                                    <option>EASY</option>
                                    <option>MEDIUM</option>
                                    <option>HARD</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label className='img-quiz-upload'>
                                    <BiPlusCircle /> Upload Quiz Image
                                </Form.Label>
                                <Form.Control type="file" hidden onChange={(event) => handleUploadImg(event)} />
                            </Form.Group>
                            {previewImg === "" ?
                                <div></div>
                                :
                                <Form.Group className="mb-3 img-preview">
                                    <img src={previewImg} alt='/avt-preview' />
                                </Form.Group>

                            }
                        </Row>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
export default ModalUpdateQuiz;