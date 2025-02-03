import {Navigation} from "../components/Navigation.tsx";
import {Container, FormControl, InputGroup, Modal} from "react-bootstrap";
import {Col, Form, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {motion} from "framer-motion";
import {useState} from "react";
import "../pages/style/doctor.css";
import {MdSearch} from "react-icons/md";

const DoctorSection = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [doctorId, setDoctorId] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [doctorImg, setDoctorImg] = useState<string | null>(null);
    const [gender, setGender] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");


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
                <div className="flex-1 p-5" style={{backgroundColor: "#cec4ff"}}>
                    <Container fluid>
                        <Row className="align-items-center mb-3">
                            <Col md={12}>
                                <motion.div
                                    className="p-3 rounded top-50"
                                    style={{backgroundColor: "#8854d0"}}
                                    initial={{opacity: 0, y: -50}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.8, ease: "easeOut"}}
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    <Container fluid>
                                        <Row className="align-items-center">
                                            <motion.h4
                                                className="font-bold text-2xl text-neutral-100"
                                                style={{fontFamily: "'Ubuntu', sans-serif"}}
                                                initial={{scale: 0.8, opacity: 0}}
                                                animate={{scale: 1, opacity: 1}}
                                                transition={{
                                                    delay: 0.2,
                                                    duration: 0.6,
                                                    ease: "easeOut",
                                                }}
                                            >
                                                Crops Management
                                            </motion.h4>
                                        </Row>
                                    </Container>
                                </motion.div>
                            </Col>
                        </Row>
                        <br/>
                        <div className="flex justify-between items-center mb-4">
                            {/* Add Doctor Button */}
                            <Button
                                variant="primary"
                                onClick={handleShow}
                                className="h-10 max-w-40 font-bold"
                                style={{fontFamily: "'Ubuntu', sans-serif"}}
                            >
                                + Add Doctor
                            </Button>

                            <div className="w-1/3">
                                <InputGroup>
                                    <FormControl
                                        className="border-2 border-black"
                                        style={{ fontFamily: "'Montserrat', serif" ,
                                            fontSize: "15px"}}
                                        placeholder="Search Doctor..."
                                    />
                                    <InputGroup.Text className="cursor-pointer border-2 border-black">
                                        <MdSearch/>
                                    </InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Doctor
                                    Details Form</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="bg-blue-300">
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Doctor ID</Form.Label>
                                        <Form.Control className="border-2 border-black" style={{fontFamily: "'Ubuntu', sans-serif"}} type="text"
                                                      value={doctorId} onChange={e => setDoctorId(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Full Name</Form.Label>
                                        <Form.Control className="border-2 border-black font-normal" style={{ fontFamily: "'Montserrat', serif" , fontSize: "15px",}}
                                            type="text"
                                            value={doctorName}
                                            placeholder="Enter full name"
                                            onChange={e => setDoctorName(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Specialty</Form.Label>
                                        <Form.Control placeholder="Enter specialty"
                                                      className="border-2 border-black"
                                                      style={{ fontFamily: "'Montserrat', serif" ,
                                                          fontSize: "15px"}} type="text"
                                                      value={specialty}
                                                      onChange={e => setSpecialty(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Image</Form.Label>
                                        <div className="image-box">
                                            {doctorImg ? (
                                                <img src={doctorImg} alt="Crop Image 1"/>
                                            ) : (
                                                <div className="text-center text-muted font-bold" style={{ fontFamily: "'Montserrat', serif" , fontSize: "15px"}}>No Image Selected</div>
                                            )}
                                        </div>
                                        <Button className="choose-image-btn" as="label">Choose Image
                                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setDoctorImg)} hidden/>
                                        </Button>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="gender">
                                        <Form.Label className="font-bold"
                                                    style={{ fontFamily: "'Montserrat', serif" ,
                                                        fontSize: "15px"}}>Gender</Form.Label>
                                        <Form.Select  className="border-2 border-black" style={{ fontFamily: "'Montserrat', serif" ,
                                            fontSize: "15px"}} value={gender}
                                                     onChange={e => setGender(e.target.value)}>
                                            <option value="" selected>Select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Crop
                                            Category</Form.Label>
                                        <Form.Control placeholder="Enter Contact Number"
                                                      className="border-2 border-black"
                                                      style={{ fontFamily: "'Montserrat', serif" ,
                                                          fontSize: "15px"}} type="text"
                                                      value={contactNumber}
                                                      onChange={e => setContactNumber(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Crop
                                            Season</Form.Label>
                                        <Form.Control placeholder="Enter Email"
                                                      className="border-2 border-black"
                                                      style={{ fontFamily: "'Montserrat', serif" ,
                                                          fontSize: "15px"}} type="text"
                                                      value={email} onChange={e => setEmail(e.target.value)}/>
                                    </Form.Group>

                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="font-bold" variant="primary">Save</Button>
                                <Button className="font-bold" variant="success">Update</Button>
                                <Button className="font-bold" variant="danger">Delete</Button>
                                <Button className="font-bold" variant="secondary">Close</Button>
                            </Modal.Footer>
                        </Modal>
                        <br/>
                        <div className="overflow-x-auto overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-md">
                            <div className="overflow-x-auto">
                                <Table striped bordered hover responsive
                                       className="w-full text-center border border-gray-300" >
                                    <thead className="bg-red-500 text-white">
                                    <tr className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>
                                        <th className="px-4 py-2 border">Doctor ID</th>
                                        <th className="px-4 py-2 border">Full Name</th>
                                        <th className="px-4 py-2 border">specialty</th>
                                        <th className="px-4 py-2 border">Profile pic</th>
                                        <th className="px-4 py-2 border">Gender</th>
                                        <th className="px-4 py-2 border">Phone</th>
                                        <th className="px-4 py-2 border">Email</th>
                                        <th className="px-4 py-2 border">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody style={{ fontFamily: "'Montserrat', serif" ,
                                        fontSize: "14px",fontWeight: "400"}}>
                                    <tr className="hover:bg-blue-100 transition-all">
                                        <td className="px-4 py-2 border">D001</td>
                                        <td className="px-4 py-2 border">Dr. John Doe</td>
                                        <td className="px-4 py-2 border">123456789V</td>
                                        <td className="px-4 py-2 border">johndoe@example.com</td>
                                        <td className="px-4 py-2 border">+94 77 123 4567</td>
                                        <td className="px-4 py-2 border">+94 77 123 4567</td>
                                        <td className="px-4 py-2 border">+94 77 123 4567</td>
                                        <td className="px-4 py-2 border flex justify-center gap-2">
                                            <button
                                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700">
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default DoctorSection;
