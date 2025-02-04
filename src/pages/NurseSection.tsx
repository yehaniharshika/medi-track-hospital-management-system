import {Navigation} from "../components/Navigation.tsx";
import {Container, FormControl, InputGroup, Modal} from "react-bootstrap";
import {Col, Form, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {motion} from "framer-motion";
import {useState} from "react";
import "../pages/style/doctor.css";
import {MdSearch} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import {Nurse} from "../models/Nurse.ts";
import {addNurse, deleteNurse, updateNurse} from "../reducers/NurseSlice.ts";

const NurseSection = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [nurseId, setNurseId] = useState("");
    const [nurseName, setNurseName] = useState("");
    const [nurseImg, setNurseImg] = useState<string | null>(null);
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [qualification, setQualification] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const nurses = useSelector((state: RootState) => state.nurses.nurses);
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

    const handleEditNurse = (nurse: Nurse) => {
        setNurseId(nurse.nurseId);
        setNurseName(nurse.nurseName);
        setNurseImg(nurse.nurseImg);
        setDob(nurse.dob);
        setGender(nurse.gender);
        setContactNumber(nurse.contactNumber);
        setQualification(nurse.qualification);
        setEmail(nurse.email);
        setShow(true);
    };

    const resetForm = () => {
        setNurseId('');
        setNurseName('');
        setDob('');
        setNurseImg(null);
        setGender('');
        setContactNumber('');
        setQualification('');
        setEmail('');
    };


    const handleAddNurse = () => {
        dispatch(
            addNurse({nurseId, nurseName, nurseImg, dob, gender, contactNumber, qualification, email})
        );
        resetForm();
        handleClose();
    }


    const handleUpdateNurse = () => {
        dispatch(updateNurse({nurseId, nurseName, nurseImg, dob, gender, contactNumber, qualification, email})
        );
        resetForm();
        handleClose();
    }


    const handleDeleteNurse = (event: React.MouseEvent<HTMLButtonElement>, nurseId: string) => {
        event.stopPropagation();
        if (window.confirm("Are you sure you want to delete this Nurse?")) {
            dispatch(deleteNurse(nurseId));
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
                                                style={{fontFamily: "'Ubuntu', sans-serif",
                                                    fontWeight: "bold"}}
                                                initial={{scale: 0.8, opacity: 0}}
                                                animate={{scale: 1, opacity: 1}}
                                                transition={{
                                                    delay: 0.2,
                                                    duration: 0.6,
                                                    ease: "easeOut",
                                                }}
                                            >
                                                Nurse Management
                                            </motion.h4>
                                        </Row>
                                    </Container>
                                </motion.div>
                            </Col>
                        </Row>
                        <br/>
                        <div className="flex justify-between items-center mb-4">

                            <Button variant="primary" onClick={handleShow} className="h-10 max-w-40 font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>
                                + Add Nurse
                            </Button>

                            <div className="w-1/3">
                                <InputGroup>
                                    <FormControl className="border-2 border-black" style={{ fontFamily: "'Montserrat', serif" , fontSize: "15px"}} placeholder="Search Nurse..."/>
                                    <InputGroup.Text className="cursor-pointer border-2 border-black">
                                        <MdSearch/>
                                    </InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Nurse Details Form</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="bg-blue-300">
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Nurse ID</Form.Label>
                                        <Form.Control className="border-2 border-black" style={{fontFamily: "'Ubuntu', sans-serif"}} type="text"
                                                      value={nurseId} onChange={e => setNurseId(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Full Name</Form.Label>
                                        <Form.Control className="border-2 border-black font-normal" style={{ fontFamily: "'Montserrat', serif" , fontSize: "15px",}} type="text" value={nurseName} placeholder="Enter full name" onChange={e => setNurseName(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Date Of Birth</Form.Label>
                                        <Form.Control className="border-2 border-black font-normal" style={{ fontFamily: "'Montserrat', serif" ,
                                            fontSize: "15px"}}  type="date" value={dob} onChange={e => setDob(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Image</Form.Label>
                                        <div className="image-box">
                                            {nurseImg ? (
                                                <img src={nurseImg} alt="Crop Image 1"/>
                                            ) : (
                                                <div className="text-center text-muted font-bold" style={{ fontFamily: "'Montserrat', serif" , fontSize: "15px"}}>No Image Selected</div>
                                            )}
                                        </div>
                                        <Button className="choose-image-btn" as="label">Choose Image
                                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNurseImg)} hidden/>
                                        </Button>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="gender">
                                        <Form.Label className="font-bold" style={{ fontFamily: "'Montserrat', serif" , fontSize: "15px"}}>Gender</Form.Label>
                                        <Form.Select className="border-2 border-black" style={{fontFamily: "'Montserrat', serif", fontSize: "15px"}} value={gender} onChange={e => setGender(e.target.value)}>
                                            <option value="">Select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Contact Number
                                        </Form.Label>
                                        <Form.Control placeholder="Enter Contact Number" className="border-2 border-black" style={{ fontFamily: "'Montserrat', serif" , fontSize: "15px"}} type="text" value={contactNumber}
                                                      onChange={e => setContactNumber(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="gender">
                                        <Form.Label className="font-bold" style={{ fontFamily: "'Montserrat', serif" , fontSize: "15px"}}>Qualification</Form.Label>
                                        <Form.Select className="border-2 border-black" style={{fontFamily: "'Montserrat', serif", fontSize: "15px"}} value={qualification} onChange={e => setQualification(e.target.value)}>
                                            <option value="">Select qualification</option>
                                            <option value="Diploma in Nursing">Diploma in Nursing</option>
                                            <option value="Associate Degree in Nursing (ADN)">Associate Degree in Nursing (ADN)</option>
                                            <option value="Bachelor of Science in Nursing (BSc Nursing)">Bachelor of Science in Nursing (BSc Nursing)</option>
                                            <option value="Master of Science in Nursing (MSc Nursing)">Master of Science in Nursing (MSc Nursing)</option>
                                            <option value="Doctor of Nursing Practice (DNP)">Doctor of Nursing Practice (DNP)</option>
                                            <option value="Registered Nurse (RN) Certification">Registered Nurse (RN) Certification</option>
                                            <option value="Advanced Practice Registered Nurse (APRN)">Advanced Practice Registered Nurse (APRN)</option>
                                            <option value="PhD in Nursing">PhD in Nursing</option>
                                            <option value="Licensed Practical Nurse (LPN)">Licensed Practical Nurse (LPN)</option>
                                            <option value="Critical Care Nursing Certification (CCRN)">Critical Care Nursing Certification (CCRN)</option>
                                            <option value="Geriatric Nursing Certification (GNC)">Geriatric Nursing Certification (GNC)</option>
                                            <option value="Pediatric Nursing Certification (CPN)">Pediatric Nursing Certification (CPN)</option>
                                            <option value="Postgraduate Diploma in Nursing">Postgraduate Diploma in Nursing</option>
                                            <option value="Other">Other</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>
                                            Email</Form.Label>
                                        <Form.Control placeholder="Enter Email"
                                                      className="border-2 border-black"
                                                      style={{ fontFamily: "'Montserrat', serif" ,
                                                          fontSize: "15px"}} type="text"
                                                      value={email} onChange={e => setEmail(e.target.value)}/>
                                    </Form.Group>

                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button style={{ fontFamily: "'Montserrat', serif" ,
                                    fontSize: "15px" , fontWeight: "600"}} className="font-bold" variant="primary" onClick={handleAddNurse}>Save</Button>
                                <Button  style={{ fontFamily: "'Montserrat', serif" ,
                                    fontSize: "15px" , fontWeight: "600"}} className="font-bold" variant="success" onClick={handleUpdateNurse}>Update</Button>
                                <Button  style={{ fontFamily: "'Montserrat', serif" ,
                                    fontSize: "15px" , fontWeight: "600"}} className="font-bold" variant="secondary" onClick={handleClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                        <br/>
                        <div className="overflow-x-auto overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-md">
                            <div className="overflow-x-auto">
                                <Table striped bordered hover responsive
                                       className="w-full text-center border border-gray-300" >
                                    <thead className="bg-red-500 text-white">
                                    <tr className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>
                                        <th className="px-4 py-2 border">Nurse ID</th>
                                        <th className="px-4 py-2 border">Full Name</th>
                                        <th className="px-4 py-2 border">Profile pic</th>
                                        <th className="px-4 py-2 border">DOB</th>
                                        <th className="px-4 py-2 border">Gender</th>
                                        <th className="px-4 py-2 border">Phone</th>
                                        <th className="px-4 py-2 border">Qualification</th>
                                        <th className="px-4 py-2 border">Email</th>
                                        <th className="px-4 py-2 border">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody style={{ fontFamily: "'Montserrat', serif" , fontSize: "14px",fontWeight: "400"}}>
                                    {nurses.map((nurse) => (
                                        <tr key={nurse.nurseId} onClick={() => handleEditNurse(nurse)}
                                            className="hover:bg-blue-100 transition-all">
                                            <td className="px-4 py-2 border">{nurse.nurseId}</td>
                                            <td className="px-4 py-2 border">{nurse.nurseName}</td>
                                            <td className="px-4 py-2 border">
                                                <img src={nurse.nurseImg || ''} alt="nurse Image"
                                                     className="w-[60px] h-[60px] object-cover rounded-full"/>
                                            </td>
                                            <td className="px-4 py-2 border">{nurse.dob}</td>
                                            <td className="px-4 py-2 border">{nurse.gender}</td>
                                            <td className="px-4 py-2 border">{nurse.contactNumber}</td>
                                            <td className="px-4 py-2 border">{nurse.qualification}</td>
                                            <td className="px-4 py-2 border">{nurse.email}</td>
                                            <td className="px-4 py-2 border flex justify-center gap-2 h-[80px]">
                                                <button
                                                    className="bg-red-500 text-white px-3 h-[40px] py-1 rounded-md hover:bg-red-700"
                                                    onClick={(event) => handleDeleteNurse(event, nurse.nurseId)}>Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
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

export default NurseSection;
