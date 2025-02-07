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
import {Medicine} from "../models/Medicine.ts";
import {addMedicine, deleteMedicine, updateMedicine} from "../reducers/MedicineSlice.ts";


const MedicineSection = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [medicineId, setMedicineId] = useState("");
    const [medicineName, setMedicineName] = useState("");
    const [brand, setBrand] = useState("");
    const [medicineImg, setMedicineImg] = useState<string | null>(null);
    const [dosage_form, setDosage_form] = useState("");
    const [unit_price, setUnit_price] = useState("");
    const [quantity_in_stock, setQuantity_in_stock] = useState("");
    const [expiry_date,setExpiry_date] = useState("");


    const dispatch = useDispatch();

    const medicines = useSelector((state : RootState) => state.medicines.medicines);

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

    const handleEditMedicine = (medicine: Medicine) => {
        setMedicineId(medicine.medicineId);
        setMedicineName(medicine.medicineName);
        setBrand(medicine.brand);
        setMedicineImg(medicine.medicineImg);
        setDosage_form(medicine.dosage_form);
        setUnit_price(medicine.unit_price);
        setQuantity_in_stock(medicine.quantity_in_stock);
        setExpiry_date(medicine.expiry_date);
        setShow(true);
    };

    const resetForm = () => {
        setMedicineId('');
        setMedicineName('');
        setBrand('');
        setMedicineImg('');
        setDosage_form('');
        setUnit_price('');
        setQuantity_in_stock('');
        setExpiry_date('');
    };


    const handleAddMedicine = () => {
        dispatch(
            addMedicine({medicineId,medicineName,brand,medicineImg,dosage_form,unit_price,quantity_in_stock,expiry_date})
        );
        resetForm();
        handleClose();
    }


    const handleUpdateMedicine = () => {
        dispatch(updateMedicine({medicineId,medicineName,brand,medicineImg,dosage_form,unit_price,quantity_in_stock,expiry_date})
        );
        resetForm();
        handleClose();
    }

    const handleDeleteMedicine = (event: React.MouseEvent<HTMLButtonElement>, medicineId: string) => {
        event.stopPropagation();
        if (window.confirm("Are you sure you want to delete this Appointment?")) {
            dispatch(deleteMedicine(medicineId));
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
                                                Medicine Management
                                            </motion.h4>
                                        </Row>
                                    </Container>
                                </motion.div>
                            </Col>
                        </Row>
                        <br/>
                        <div className="flex justify-between items-center mb-4">
                            <Button
                                variant="primary"
                                onClick={handleShow}
                                className="h-10 max-w-40 font-bold"
                                style={{fontFamily: "'Ubuntu', sans-serif"}}
                            >
                                + Add Medicine
                            </Button>

                            <div className="w-1/3">
                                <InputGroup>
                                    <FormControl
                                        className="border-2 border-black"
                                        style={{ fontFamily: "'Montserrat', serif" ,
                                            fontSize: "15px"}}
                                        placeholder="Search Medicine..."
                                    />
                                    <InputGroup.Text className="cursor-pointer border-2 border-black">
                                        <MdSearch/>
                                    </InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Medicine
                                    Details Form</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="bg-blue-300">
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Medicine ID</Form.Label>
                                        <Form.Control className="border-2 border-black" style={{fontFamily: "'Ubuntu', sans-serif"}} type="text"
                                                      value={medicineId} onChange={e => setMedicineId(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Medicine Name</Form.Label>
                                        <Form.Control className="border-2 border-black font-normal" style={{ fontFamily: "'Montserrat', serif" , fontSize: "15px",}}
                                                      type="text"
                                                      value={medicineName}
                                                      placeholder="Enter medicine name"
                                                      onChange={e => setMedicineName(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Brand</Form.Label>
                                        <Form.Control className="border-2 border-black font-normal" style={{ fontFamily: "'Montserrat', serif" , fontSize: "15px",}}
                                                      type="text"
                                                      value={brand}
                                                      placeholder="Enter medicine brand"
                                                      onChange={e => setBrand(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Image</Form.Label>
                                        <div className="image-box">
                                            {medicineImg ? (
                                                <img src={medicineImg} alt="Medicine Image"/>
                                            ) : (
                                                <div className="text-center text-muted font-bold" style={{ fontFamily: "'Montserrat', serif" , fontSize: "15px"}}>No Image Selected</div>
                                            )}
                                        </div>
                                        <Button className="choose-image-btn" as="label">Choose Image
                                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setMedicineImg)} hidden/>
                                        </Button>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="dosage_form">
                                        <Form.Label className="font-bold" style={{ fontFamily: "'Montserrat', serif" , fontSize: "15px"}}>Dosage Form</Form.Label>
                                        <Form.Select className="border-2 border-black"
                                                     style={{fontFamily: "'Montserrat', serif", fontSize: "15px"}}
                                                     value={dosage_form} onChange={e => setDosage_form(e.target.value)}>
                                            <option value="">Select dosage form</option>
                                            <option value="Tablet">Tablet</option>
                                            <option value="Capsule">Capsule</option>
                                            <option value="Syrup">Syrup</option>
                                            <option value="Injection">Injection</option>
                                            <option value="Injection">Inhaler</option>
                                            <option value="Gel">Gel</option>
                                            <option value="Cream">Cream</option>
                                            <option value="Eye drops">Eye drops</option>
                                            <option value="Eye ointment">Eye ointment</option>
                                            <option value="Ear drops">Ear drops </option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Unit Price</Form.Label>
                                        <Form.Control placeholder="Enter Unit Price"
                                                      className="border-2 border-black"
                                                      style={{ fontFamily: "'Montserrat', serif" ,
                                                          fontSize: "15px"}} type="num"
                                                      value={unit_price}
                                                      onChange={e => setUnit_price(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>quantity in stock</Form.Label>
                                        <Form.Control placeholder="Enter Email"
                                                      className="border-2 border-black"
                                                      style={{ fontFamily: "'Montserrat', serif" ,
                                                          fontSize: "15px"}} type="num"
                                                      value={quantity_in_stock} onChange={e => setQuantity_in_stock(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Expiry Date</Form.Label>
                                        <Form.Control className="border-2 border-black font-normal" style={{ fontFamily: "'Montserrat', serif" ,
                                            fontSize: "15px"}}  type="date" value={expiry_date} onChange={e => setExpiry_date(e.target.value)}/>
                                    </Form.Group>
                                    <br/>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button style={{ fontFamily: "'Montserrat', serif" ,
                                    fontSize: "15px" , fontWeight: "600"}} className="font-bold" variant="primary" onClick={handleAddMedicine}>Save</Button>
                                <Button  style={{ fontFamily: "'Montserrat', serif" ,
                                    fontSize: "15px" , fontWeight: "600"}} className="font-bold" variant="success" onClick={handleUpdateMedicine}>Update</Button>
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
                                        <th className="px-4 py-2 border">Medicine ID</th>
                                        <th className="px-4 py-2 border">Name</th>
                                        <th className="px-4 py-2 border">Brand</th>
                                        <th className="px-4 py-2 border">Image</th>
                                        <th className="px-4 py-2 border">Dosage form</th>
                                        <th className="px-4 py-2 border">Unit Price</th>
                                        <th className="px-4 py-2 border">Stock</th>
                                        <th className="px-4 py-2 border">Expiry Date</th>
                                        <th className="px-4 py-2 border">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody style={{ fontFamily: "'Montserrat', serif" ,
                                        fontSize: "14px",fontWeight: "400"}}>
                                    {medicines.map((medicine) => (
                                        <tr key={medicine.medicineId} onClick={() => handleEditMedicine(medicine)}
                                            className="hover:bg-blue-100 transition-all">
                                            <td className="px-4 py-2 border">{medicine.medicineId}</td>
                                            <td className="px-4 py-2 border">{medicine.medicineName}</td>
                                            <td className="px-4 py-2 border">{medicine.brand}</td>
                                            <td className="px-4 py-2 border">
                                                <img src={medicine.medicineImg || ''} alt="Doctor Image"
                                                     className="w-[60px] h-[60px] object-cover rounded-full"/>
                                            </td>
                                            <td className="px-4 py-2 border">{medicine.dosage_form}</td>
                                            <td className="px-4 py-2 border">{medicine.unit_price}</td>
                                            <td className="px-4 py-2 border">{medicine.quantity_in_stock}</td>
                                            <td className="px-4 py-2 border">{medicine.expiry_date}</td>
                                            <td className="px-4 py-2 border flex justify-center gap-2 h-[80px]">
                                                <button
                                                    className="bg-red-500 text-white px-3 h-[40px] py-1 rounded-md hover:bg-red-700"
                                                    onClick={(event) => handleDeleteMedicine(event, medicine.medicineId)}>Delete
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

export default MedicineSection;
