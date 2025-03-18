import { Navigation } from "../components/Navigation.tsx";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { User } from "../models/User.ts";
import './style/setting.css';

interface SettingSectionProps {
    user?: User;
}

const SettingSection: React.FC<SettingSectionProps> = ({ user }) => {
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    return (
        <div className="flex overflow-hidden bg-emerald-200">
            <Navigation />
            <div className="flex-1 p-5" style={{ backgroundColor: "#cec4ff" }}>
                <Container fluid>
                    <Row className="align-items-center mb-3">
                        <Col md={12}>
                            <motion.div
                                className="p-3 rounded top-50"
                                style={{ backgroundColor: "#8854d0" }}
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <motion.h4 className="font-bold text-2xl text-white">Settings</motion.h4>
                            </motion.div>
                        </Col>
                    </Row>

                    <Col md={9} className="p-4">
                        <Card>
                            <Card.Body>
                                <h5 className="mt-4" style={{fontFamily: "'Montserrat', serif",color: "darkblue",fontWeight: "bold"}}>General Information</h5>
                                <p style={{fontFamily: "'Montserrat', serif" , fontSize: "15px"}}>Manage your personal details and profile picture.</p>

                                {/* Profile Picture Section */}
                                <div className="profile-container">
                                    <div className="profile-wrapper">
                                        <img
                                            src={profileImage || "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"}  // Use local default image
                                            alt="Profile"
                                            className="profile-image"
                                        />
                                        <label htmlFor="profileUpload" className="profile-upload-btn">
                                            <FaCamera size={16} />
                                            <input
                                                type="file"
                                                id="profileUpload"
                                                className="d-none"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                        </label>
                                    </div>

                                    {user ? (
                                        <>
                                            <h6 className="mt-3">{user.name}</h6>
                                            <p className="text-muted">{user.username} - {user.role}</p>
                                        </>
                                    ) : (
                                        <p className="text-muted" style={{marginTop:"15px",color:"darkred"}}>User data not available</p>
                                    )}
                                </div>

                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label style={{fontFamily: "'Montserrat', serif",fontSize:"14px",fontWeight:"500"}}>Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter name" style={{fontFamily: "'Montserrat', serif",fontSize:"14px"}}/>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label style={{fontFamily: "'Montserrat', serif",fontSize:"14px",fontWeight:"500"}}>Email Address</Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" style={{fontFamily: "'Montserrat', serif",fontSize:"14px"}}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label style={{fontFamily: "'Montserrat', serif",fontSize:"14px",fontWeight:"500"}}>Gender</Form.Label>
                                                <Form.Select style={{fontFamily: "'Montserrat', serif",fontSize:"14px"}}>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                    <option>Other</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label style={{fontFamily: "'Montserrat', serif",fontSize:"14px",fontWeight:"500"}}>Phone Number</Form.Label>
                                                <Form.Control type="text" placeholder="Enter phone number" style={{fontFamily: "'Montserrat', serif",fontSize:"14px"}}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <div className="d-flex justify-content-end">
                                        <Button variant="secondary" className="me-2" style={{fontFamily: "'Montserrat', serif",fontSize:"14px",fontWeight:"bold"}}>Cancel</Button>
                                        <Button variant="primary" style={{fontFamily: "'Montserrat', serif",fontSize:"14px",fontWeight:"bold"}}>Save Changes</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Container>
            </div>
        </div>
    );
};

export default SettingSection;
