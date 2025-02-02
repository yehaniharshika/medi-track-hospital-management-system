import {Navigation} from "../components/Navigation.tsx";
import {Container, Modal} from "react-bootstrap";
import {Col, Form, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {motion} from "framer-motion";
import {useState} from "react";

const DoctorSection = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, setImage: (value: string | null) => void) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className="flex overflow-hidden bg-emerald-200">
                <Navigation/>
                <div className="flex-1 p-5">
                    <Container fluid>
                        <Row className="align-items-center mb-3">
                            <Col md={12}>
                                <motion.div
                                    className="bg-teal-900 p-3 rounded top-50"
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    <Container fluid>
                                        <Row className="align-items-center">
                                            <motion.h1
                                                className="font-bold text-2xl text-neutral-100"
                                                style={{ fontFamily: "'Ubuntu', sans-serif" }}
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{
                                                    delay: 0.2,
                                                    duration: 0.6,
                                                    ease: "easeOut",
                                                }}
                                            >
                                                Crops Management
                                            </motion.h1>
                                        </Row>
                                    </Container>
                                </motion.div>
                            </Col>
                        </Row>
                        <br/>
                        <Button variant="primary" onClick={handleShow} className="h-1/5 max-w-40 font-bold"
                                style={{fontFamily: "'Ubuntu', sans-serif"}}>
                            + Add Crop
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Crop
                                    Details Form</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="bg-blue-300">
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Crop
                                            Code</Form.Label>
                                        <Form.Control className="border-2 border-slate-700"
                                                      style={{fontFamily: "'Ubuntu', sans-serif"}} type="text"
                                                      value={cropCode} onChange={e => setCropCode(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Crop
                                            Common
                                            Name</Form.Label>
                                        <Form.Control className="border-2 border-zinc-700"
                                                      style={{fontFamily: "'Ubuntu', sans-serif"}} type="text"
                                                      value={cropCommonName}
                                                      onChange={e => setCropCommonName(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Crop
                                            Scientific Name</Form.Label>
                                        <Form.Control placeholder="Enter crop Scientific name"
                                                      className="border-2 border-zinc-700"
                                                      style={{fontFamily: "'Ubuntu', sans-serif"}} type="text"
                                                      value={cropScientificName}
                                                      onChange={e => setCropScientificName(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>
                                            Crop Image
                                        </Form.Label>
                                        <div className="image-box">
                                            {cropImage ? (
                                                <img src={cropImage} alt="Crop Image 1"/>
                                            ) : (
                                                <div className="text-center text-muted font-bold"
                                                     style={{fontFamily: "'Ubuntu', sans-serif"}}>No Image
                                                    Selected</div>
                                            )}
                                        </div>
                                        <Button className="choose-image-btn" as="label">
                                            Choose Image
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, setCropImage)}
                                                hidden
                                            />
                                        </Button>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Crop
                                            Category</Form.Label>
                                        <Form.Control placeholder="Enter category(e.g. Cereal)"
                                                      className="border-2 border-zinc-700"
                                                      style={{fontFamily: "'Ubuntu', sans-serif"}} type="text"
                                                      value={cropCategory}
                                                      onChange={e => setCropCategory(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Crop
                                            Season</Form.Label>
                                        <Form.Control placeholder="Enter crop season"
                                                      className="border-2 border-zinc-700"
                                                      style={{fontFamily: "'Ubuntu', sans-serif"}} type="text"
                                                      value={season} onChange={e => setSeason(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{ fontFamily: "'Ubuntu', sans-serif" }}>
                                            Field Code
                                        </Form.Label>
                                        <Form.Select className="border-2 border-slate-700" aria-label="Default select example" value={fieldCode} onChange={(e) => setFieldCode(e.target.value)}>
                                            <option value="">Select Field Code</option>
                                            {fieldCodes.map((code) => (
                                                <option key={code} value={code}>
                                                    {code}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="font-bold" variant="primary" onClick={handleAddCrop}>Save</Button>
                                <Button className="font-bold" variant="success" onClick={handleUpdateCrop}>Update</Button>
                                <Button className="font-bold" variant="danger" onClick={handleDeleteCrop}>Delete</Button>
                                <Button className="font-bold" variant="secondary" onClick={handleClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                        <br/><br/>
                        <div className="overflow-x-auto overflow-y-auto table-container">
                            <Table striped bordered hover responsive className="custom-table">
                                <thead>
                                <tr>
                                    <th>Crop Code</th>
                                    <th>Crop Common Name</th>
                                    <th>Crop Scientific Name</th>
                                    <th>Crop Image</th>
                                    <th>Crop Category</th>
                                    <th>Season</th>
                                    <th>Field Code</th>
                                </tr>
                                </thead>
                                <tbody>
                                {crops.map((crop, index) => (
                                    <tr key={index}>
                                        <td>{crop.cropCode}</td>
                                        <td>{crop.cropCommonName}</td>
                                        <td>{crop.cropScientificName}</td>
                                        <td><img src={crop.cropImage || ''} alt="Crop Image" className="img-preview"/></td>
                                        <td>{crop.cropCategory}</td>
                                        <td>{crop.season}</td>
                                        <td>{crop.fieldCode}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default DoctorSection;
