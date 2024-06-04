import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ManageUsers.scss';
import _ from 'lodash';
const ModalViewUser = (props) => {
    const { show, viewData } = props;
    const handleClose = () => {
        props.setShow(false);
        setPreviewImg("");
        setEmail("");
        setUsername("");
        setRole("USER");
        props.resetViewData();
    }

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("USER");
    const [previewImg, setPreviewImg] = useState("");

    useEffect(() => {
        if (!_.isEmpty(viewData)) {
            if (viewData.image) {
                setPreviewImg(`data:image/jpeg;base64,${viewData.image}`);
            }
            setEmail(viewData.email)
            setUsername(viewData.username);
            setRole(viewData.role);
        }
    }, [viewData])

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop='static' className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="username"
                                    placeholder="Enter username"
                                    value={username}
                                    disabled
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </Form.Group>

                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    disabled
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    type="role"
                                    placeholder="Enter email"
                                    value={role}
                                    disabled
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label className='img-view'>
                                User Avatar
                            </Form.Label>
                        </Form.Group>
                        {previewImg === "" ?
                            <div> No Picture</div>
                            :
                            <Form.Group className="mb-3 img-preview">
                                <img src={previewImg} alt='/avt-preview' />
                            </Form.Group>

                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalViewUser;