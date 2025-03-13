import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/AuthSlice";
import { AppDispatch } from "../store/Store.ts";
import { Navigation } from "../components/Navigation.tsx";
import { Container, Modal, Button } from "react-bootstrap";

const Logout = () => {
    const [show, setShow] = useState(true); // Control modal visibility
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = async () => {
        await dispatch(logoutUser());
        setShow(false);
        navigate("/login");
    };

    const handleClose = () => {
        setShow(false);
        navigate(-1); // Close modal and go back
    };

    return (
        <>
            <div className="flex overflow-hidden bg-emerald-200">
                <Navigation />
                <div className="flex-1 p-5" style={{ backgroundColor: "#cec4ff" }}>
                    <Container fluid>
                        {/* Logout Confirmation Modal */}
                        <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm Logout</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ fontFamily: "'Montserrat', serif", fontSize: "15px",fontWeight: "550" }}>
                                Are you sure you want to log out?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button  style={{ fontFamily: "'Montserrat', serif", fontSize: "15px",fontWeight: "550" }}variant="secondary" onClick={handleClose}>
                                    No
                                </Button>
                                <Button  style={{ fontFamily: "'Montserrat', serif", fontSize: "15px",fontWeight: "550" }}variant="danger" onClick={handleLogout}>
                                    Yes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default Logout;
