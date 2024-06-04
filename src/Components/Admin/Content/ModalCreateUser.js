import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ManageUsers.scss';
import { BiPlusCircle } from "react-icons/bi";
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../Services/apiService';
const ModalCreateUser = (props) => {
    const { show } = props;
    const handleClose = () => {
        props.setShow(false);
        setPreviewImg("");
        setEmail("");
        setUsername("");
        setPassword("");
        setRole("USER");
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImg, setPreviewImg] = useState("");

    const handleUploadImg = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImg(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0]);
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitCreateUser = async () => {

        //Validate
        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            toast.error("Invalid Email");
            // toast.success();
            // toast.info();
            return;
        }
        if (!password) {
            toast.error("Invalid Password")
            return;
        }

        let data = await postCreateNewUser(email, password, username, role, image);
        if (data && data.EC === 0) {
            toast.success("Create a new user succeed");
            handleClose();
            props.setCurrentPage(1)
            await props.fetchListUserWithPaginate(1)

        }
        else {
            toast.error(data.EM)

        }
    }
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Add New User
            </Button> */}

            <Modal show={show} onHide={handleClose} size='lg' backdrop='static' className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
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
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
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
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Role</Form.Label>
                                <Form.Select defaultValue="USER" onChange={(event) => setRole(event.target.value)}>
                                    <option>ADMIN</option>
                                    <option>USER</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label className='img-upload'>
                                <BiPlusCircle /> Upload Your Avatar
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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalCreateUser;