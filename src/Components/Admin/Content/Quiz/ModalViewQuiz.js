import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import _ from 'lodash';
const ModalViewQuiz = (props) => {
    const { show, setShow, viewData, setViewData } = props;
    const [quizName, setQuizName] = useState("")
    const [quizDescription, setQuizDescription] = useState("")
    const [quizDifficulty, setQuizDifficulty] = useState("EASY")
    const [quizImg, setQuizImg] = useState("")
    const handleClose = () => {
        setShow(false)
    }

    useEffect(() => {
        if (!_.isEmpty(viewData)) {
            if (viewData.image) {
                setQuizImg(`data:image/jpeg;base64,${viewData.image}`);
            }
            setQuizName(viewData.name)
            setQuizDescription(viewData.description);
            setQuizDifficulty(viewData.difficulty);
        }
    }, [viewData])

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop='static' className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Quiz Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="quizname"
                                    value={quizName}
                                    disabled
                                    onChange={(event) => setQuizName(event.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="quizname"
                                    value={quizDescription}
                                    disabled
                                    onChange={(event) => setQuizDescription(event.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Difficulty</Form.Label>
                                <Form.Control
                                    type="quizname"
                                    value={quizDifficulty}
                                    disabled
                                    onChange={(event) => setQuizDifficulty(event.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label className='img-view'>
                                    User Avatar
                                </Form.Label>
                            </Form.Group>
                            {quizImg === "" ?
                                <div> No Picture</div>
                                :
                                <Form.Group className="mb-3 img-preview">
                                    <img src={quizImg} alt='/avt-preview' />
                                </Form.Group>

                            }
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalViewQuiz