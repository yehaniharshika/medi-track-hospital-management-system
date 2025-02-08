import { Navigation } from "../components/Navigation.tsx";
import {Container, Col, Form, Row, Button, Table} from "react-bootstrap";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/Store.ts";
import "../pages/style/doctor.css";

const PaymentSection = () => {
    const [paymentId, setPaymentId] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [totalPrice, setTotalPrice] = useState<number>(0); // Removed duplicate declaration
    const [getQty, setGetQty] = useState<number>(0);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
    const [paymentMedicines, setPaymentMedicines] = useState<any[]>([]);

    const dispatch = useDispatch<AppDispatch>();

    const patients = useSelector((state: RootState) => state.patients.patients);
    const medicines = useSelector((state: RootState) => state.medicines.medicines);

    function handleQuantityChange() {

    }

    function handleRemoveItem(medicineId) {

    }

    function calculateTotalBalance() {

    }

    return (
        <>
            <div className="flex overflow-hidden bg-emerald-200">
                <Navigation />
                <div className="flex-1 p-5" style={{ backgroundColor: "#cec4ff" }}>
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
                                                style={{
                                                    fontFamily: "'Ubuntu', sans-serif",
                                                    fontWeight: "bold",
                                                }}
                                                initial={{scale: 0.8, opacity: 0}}
                                                animate={{scale: 1, opacity: 1}}
                                                transition={{
                                                    delay: 0.2,
                                                    duration: 0.6,
                                                    ease: "easeOut",
                                                }}
                                            >
                                                Payment Management
                                            </motion.h4>
                                        </Row>
                                    </Container>
                                </motion.div>
                            </Col>
                        </Row>
                        <br/>

                        <Container>
                            <Row className="justify-content-center">
                                <Col md={6}>
                                    <Form className="p-4 border rounded bg-white shadow">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="font-bold"
                                                        style={{fontFamily: "'Ubuntu', sans-serif"}}>
                                                Payment Id
                                            </Form.Label>
                                            <Form.Control
                                                className="border-2 border-black"
                                                style={{fontFamily: "'Ubuntu', sans-serif"}}
                                                type="text"
                                                value={paymentId}
                                                onChange={(e) => setPaymentId(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="font-bold"
                                                        style={{fontFamily: "'Ubuntu', sans-serif"}}>
                                                Payment Date
                                            </Form.Label>
                                            <Form.Control
                                                className="border-2 border-black font-normal"
                                                style={{fontFamily: "'Montserrat', serif", fontSize: "15px"}}
                                                type="date"
                                                value={paymentDate}
                                                onChange={(e) => setPaymentDate(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="font-bold"
                                                        style={{fontFamily: "'Ubuntu', sans-serif"}}>
                                                Select Patient
                                            </Form.Label>
                                            <Form.Select
                                                style={{fontFamily: "'Montserrat', serif", fontSize: "15px"}}
                                                className="border-2 border-black"
                                                aria-label="Default select example"
                                                value={selectedPatient}
                                                onChange={(e) => setSelectedPatient(e.target.value)}
                                            >
                                                <option value="">Select Patient Id</option>
                                                {patients.map((patient: any) => (
                                                    <option key={patient.id} value={patient.id}>
                                                        {patient.id}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="font-bold"
                                                        style={{fontFamily: "'Ubuntu', sans-serif"}}>
                                                Patient Full Name
                                            </Form.Label>
                                            <Form.Control
                                                className="border-2 border-black"
                                                style={{fontFamily: "'Ubuntu', sans-serif"}}
                                                type="text"
                                                value={selectedPatient?.name || ""}
                                                readOnly
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="font-bold"
                                                        style={{fontFamily: "'Ubuntu', sans-serif"}}>
                                                Select Medicine
                                            </Form.Label>
                                            <Form.Select
                                                style={{fontFamily: "'Montserrat', serif", fontSize: "15px"}}
                                                className="border-2 border-black"
                                                aria-label="Default select example"
                                                value={selectedPatient}
                                                onChange={(e) => selectedMedicine(e.target.value)}
                                            >
                                                <option value="">Select Medicine ID</option>
                                                {medicines.map((medicine: any) => (
                                                    <option key={medicine.medicineId} value={medicine.medicineId}>
                                                        {medicine.medicineId}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form className="p-4 border rounded bg-white shadow">
                                        {selectedMedicine && (
                                            <div className="mt-4 p-4 border rounded bg-gray-100">
                                                <label className="block text-sm font-bold">Item Name</label>
                                                <input
                                                    type="text"
                                                    value={selectedMedicine.medicineName}
                                                    className="border p-2 rounded w-full"
                                                    disabled
                                                />

                                                <label className="block text-sm font-bold mt-2">Price</label>
                                                <input type="text" value={selectedMedicine.unit_price}
                                                       className="border p-2 rounded w-full"
                                                       disabled
                                                />

                                                <label className="block text-sm font-bold mt-2">Stock</label>
                                                <input type="text" value={selectedMedicine.quantity_in_stock}
                                                       className="border p-2 rounded w-full" disabled/>

                                                <label className="block text-sm font-bold mt-2">Get Quantity</label>
                                                <input
                                                    type="number"
                                                    value={getQty}
                                                    min="0"
                                                    max={selectedMedicine.quantity_in_stock}
                                                    onChange={handleQuantityChange}
                                                    className="border p-2 rounded w-full"
                                                />

                                                <label className="block text-sm font-bold mt-2">Total Price</label>
                                                <input type="text" value={totalPrice}
                                                       className="border p-2 rounded w-full" disabled/>

                                                <Button
                                                    style={{
                                                        fontFamily: "'Montserrat', serif",
                                                        fontSize: "15px",
                                                        fontWeight: "600",
                                                    }} className="font-bold" variant="success">
                                                    Add To Cart
                                                </Button>
                                            </div>
                                        )}
                                    </Form>
                                </Col>
                            </Row>
                        </Container>

                        <div className="overflow-x-auto overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-md">
                            <div className="overflow-x-auto">
                                <Table striped bordered hover responsive
                                       className="w-full text-center border border-gray-300">
                                    <thead className="bg-red-500 text-white">
                                    <tr className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>
                                        <th className="px-4 py-2 border">Medicine Name</th>
                                        <th className="px-4 py-2 border">Unit Price</th>
                                        <th className="px-4 py-2 border">Quantity</th>
                                        <th className="px-4 py-2 border">Total</th>
                                        <th className="px-4 py-2 border">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody style={{
                                        fontFamily: "'Montserrat', serif",
                                        fontSize: "14px",
                                        fontWeight: "400"
                                    }}>
                                    {paymentMedicines.map((paymentMedicine) => (
                                        <tr key={paymentMedicine.medicineId}>
                                            <td className="border px-4 py-2">{paymentMedicine.medicineName}</td>
                                            <td className="border px-4 py-2">${Number(paymentMedicine.unit_price).toFixed(2)}</td>
                                            <td className="border px-4 py-2">{paymentMedicine.quantity_in_stock}</td>
                                            <td className="border px-4 py-2">${paymentMedicine.totalPrice ? paymentMedicine.totalPrice.toFixed(2) : "0.00"}</td>
                                            <td className="border px-4 py-2 text-center">
                                                <Button
                                                    onClick={() => handleRemoveItem(paymentMedicine.medicineId)}
                                                    className="bg-red-500 text-white p-2 rounded-lg"
                                                >
                                                    Remove
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                                <div className="mt-4 font-bold text-xl">
                                    Total Balance:
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default PaymentSection;
