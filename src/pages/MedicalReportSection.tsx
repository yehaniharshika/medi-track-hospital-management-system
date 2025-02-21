import {Navigation} from "../components/Navigation.tsx";
import {Container, FormControl, InputGroup, Modal} from "react-bootstrap";
import {Col, Form, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import "../pages/style/doctor.css";
import {MdSearch} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/Store.ts";
import {MedicalReport} from "../models/ MedicalReport.ts";
import {deleteMedicalReport, getMedicalReports, saveMedicalReport, updateMedicalReport} from "../reducers/MedicalReportSlice.ts";


const MedicalReportSection = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [medicalReportId, setMedicalReportId] = useState("");
    const [patientId, setPatientId] = useState("");
    const [patientIds, setPatientIds] = useState<string[]>([]);
    const [doctorId, setDoctorId] = useState("");
    const [doctorIds, setDoctorIds] = useState<string[]>([]);
    const [patientName, setPatientName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [testResults, setTestResults] = useState("");
    const [reportDate, setReportDate] = useState("");
    const [notes, setNotes] = useState("");

    const dispatch = useDispatch<AppDispatch>();


    const patients = useSelector((state: RootState) => state.patients);
    const doctors = useSelector((state: RootState) => state.doctors);
    const medicalReports = useSelector((state: RootState) => state.medicalReports);

    const generateNextMedicalReportId = (existingMedicalReports : MedicalReport[]) => {
        if (!existingMedicalReports || existingMedicalReports.length === 0) {
            return 'MR001';
        }

        const medicalReportIds = existingMedicalReports
            .map(mr => mr.medicalReportId ? Number(mr.medicalReportId.replace('MR', '')) : 0)
            .filter(num => !isNaN(num));

        if (medicalReportIds.length === 0) {
            return 'MR001';
        }

        const maxId = Math.max(...medicalReportIds);
        return `MR${String(maxId + 1).padStart(3, '0')}`;
    };

    useEffect(() => {
        const patientIdArray = patients.map((p) => p.patientId);
        setPatientIds(patientIdArray);
    }, [patients]);

    useEffect(() => {
        const selectedPatient = patients.find(p => p.patientId === patientId);
        setPatientName(selectedPatient ? selectedPatient.patientName  : '');
        setGender(selectedPatient ? selectedPatient.gender  : '');
        setAge(selectedPatient ? selectedPatient.age  : '');
    }, [patientId, patients]);

    useEffect(() => {
        const doctorIdArray = doctors.map((doc) => doc.doctorId);
        setDoctorIds(doctorIdArray);
    }, [doctors]);

    useEffect(() => {
        dispatch(getMedicalReports()).then((response) => {
            const nextMedicalReportId = generateNextMedicalReportId(response.payload);
            setMedicalReportId(nextMedicalReportId); //automatically set the generated ID
        });
    }, [dispatch]);


    const handleEditMedicalReport = (medicalReport: MedicalReport) => {
        setMedicalReportId(medicalReport.medicalReportId);
        setPatientId(medicalReport.patientId);
        setPatientName(medicalReport.patientName);
        setTestResults(medicalReport.testResults);
        setReportDate(medicalReport.reportDate);
        setNotes(medicalReport.notes);
        setShow(true);
    };

    const resetForm = () => {
        setMedicalReportId('');
        setPatientId('');
        setPatientName('');
        setTestResults('');
        setReportDate('');
        setNotes('');
    };


    const handleAddMedicalReport = () => {
        if (!medicalReportId || !reportDate || !testResults || !notes || !patientId || !doctorId) {
            alert("All fields are required!");
            return;
        }

        const newMedicalReport = {medicalReportId,reportDate,testResults,notes,patientId,patientName,doctorId};
        dispatch(saveMedicalReport(newMedicalReport)).then(() => {
            dispatch(getMedicalReports());
        });
        resetForm();
        setMedicalReportId(generateNextMedicalReportId(medicalReports))
        handleClose();
    }


    const handleUpdateMedicalReport = () => {
        if (!medicalReportId || !reportDate || !testResults || !notes || !patientId || !doctorId) {
            alert("All fields are required!");
            return;
        }

        const updatedMedicalReport = {medicalReportId,reportDate,testResults,notes,patientId,patientName,doctorId};
        dispatch(updateMedicalReport(updatedMedicalReport)).then(() => {
            dispatch(getMedicalReports());
        });
        resetForm();
        setMedicalReportId(generateNextMedicalReportId(medicalReports))
        handleClose();
    }


    const handleDeleteMedicalReport = (event: React.MouseEvent<HTMLButtonElement>, medicalReportId: string) => {
        event.stopPropagation();
        if (window.confirm("Are you sure you want to delete this Appointment?")) {
            dispatch(deleteMedicalReport(medicalReportId));
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
                                                Medical Report Management
                                            </motion.h4>
                                        </Row>
                                    </Container>
                                </motion.div>
                            </Col>
                        </Row>
                        <br/>
                        <div className="flex justify-between items-center mb-4">

                            <Button variant="primary" onClick={handleShow} className="h-10 max-w-40 font-bold" style={{ fontFamily: "'Montserrat', serif" , fontSize: "15px" ,fontWeight: "bold"}} >
                                + Medical Report
                            </Button>

                            <div className="w-1/3">
                                <InputGroup>
                                    <FormControl className="border-2 border-black" style={{ fontFamily: "'Montserrat', serif" , fontSize: "15px"}} placeholder="Search Medical Report..."/>
                                    <InputGroup.Text className="cursor-pointer border-2 border-black">
                                        <MdSearch/>
                                    </InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Medical Report Details Form</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="bg-blue-300">
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Report ID</Form.Label>
                                        <Form.Control className="border-2 border-black"
                                                      style={{fontFamily: "'Ubuntu', sans-serif"}} type="text"
                                                      value={medicalReportId}
                                                      onChange={e => setMedicalReportId(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Report Date</Form.Label>
                                        <Form.Control className="border-2 border-black font-normal" style={{
                                            fontFamily: "'Montserrat', serif",
                                            fontSize: "15px"
                                        }} type="date" value={reportDate}
                                                      onChange={e => setReportDate(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>
                                            Patient Id
                                        </Form.Label>
                                        <Form.Select style={{fontFamily: "'Montserrat', serif", fontSize: "15px"}} className="border-2 border-black" aria-label="Default select example" value={patientId} onChange={(e) => setPatientId(e.target.value)}>
                                            <option value="">Select Patient Id</option>
                                            {patientIds.map((pid) => (
                                                <option key={pid} value={pid}>
                                                    {pid}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <Form.Group controlId="staff-id">
                                                <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>patient Full Name</Form.Label>
                                                <Form.Control className="border-2 border-black" style={{fontFamily: "'Montserrat', serif", fontSize: "15px"}} type="text" value={patientName}/>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group controlId="firstName">
                                                <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Gender</Form.Label>
                                                <Form.Control className="border-2 border-black" style={{fontFamily: "'Montserrat', serif", fontSize: "15px"}} type="text" value={gender} readOnly/>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <Form.Group controlId="staff-id">
                                                <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Age</Form.Label>
                                                <Form.Control className="border-2 border-black" style={{fontFamily: "'Montserrat', serif", fontSize: "15px"}} type="text" value={age} readOnly/>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{ fontFamily: "'Ubuntu', sans-serif" }}>Test Results</Form.Label>
                                        <Form.Control as="textarea" rows={4} className="border-2 border-black" style={{fontFamily: "'Montserrat', serif", fontSize: "15px"}} value={testResults}
                                                      placeholder="Enter test results(Blood Pressure,Sugar Level,Cholesterol etc..)"
                                            onChange={e => setTestResults(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{ fontFamily: "'Ubuntu', sans-serif" }}>Notes</Form.Label>
                                        <Form.Control as="textarea" rows={3} className="border-2 border-black" style={{fontFamily: "'Montserrat', serif", fontSize: "15px"}}
                                            placeholder="Enter notes" value={notes}
                                            onChange={e => setNotes(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>
                                            Doctor ID
                                        </Form.Label>
                                        <Form.Select style={{fontFamily: "'Montserrat', serif", fontSize: "15px"}} className="border-2 border-black" aria-label="Default select example" value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
                                            <option value="">Select Doctor ID</option>
                                            {doctorIds.map((docId) => (
                                                <option key={docId} value={docId}>
                                                    {docId}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <Form.Group controlId="staff-id">
                                                <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Doctor Full Name</Form.Label>
                                                <Form.Control className="border-2 border-black" style={{fontFamily: "'Ubuntu', sans-serif"}} type="text"/>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group controlId="firstName">
                                                <Form.Label className="font-bold" style={{fontFamily: "'Ubuntu', sans-serif"}}>Specialty</Form.Label>
                                                <Form.Control className="border-2 border-black" style={{fontFamily: "'Ubuntu', sans-serif"}} type="text"/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <br/>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button style={{ fontFamily: "'Montserrat', serif" ,
                                    fontSize: "15px" , fontWeight: "600"}} className="font-bold" variant="primary" onClick={handleAddMedicalReport}>Save</Button>
                                <Button  style={{ fontFamily: "'Montserrat', serif" ,
                                    fontSize: "15px" , fontWeight: "600"}} className="font-bold" variant="success" onClick={handleUpdateMedicalReport}>Update</Button>
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
                                        <th className="px-4 py-2 border">Report ID</th>
                                        <th className="px-4 py-2 border">Patient ID</th>
                                        <th className="px-4 py-2 border">Report Date</th>
                                        <th className="px-4 py-2 border">Test Results</th>
                                        <th className="px-4 py-2 border">notes</th>
                                        <th className="px-4 py-2 border">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody style={{ fontFamily: "'Montserrat', serif" , fontSize: "14px",fontWeight: "400"}}>
                                    {medicalReports.map((medicalReport) => (
                                        <tr key={medicalReport.medicalReportId}
                                            onClick={() => handleEditMedicalReport(medicalReport)}
                                            className="hover:bg-blue-100 transition-all">
                                            <td className="px-4 py-2 border">{medicalReport.medicalReportId}</td>
                                            <td className="px-4 py-2 border">{medicalReport.patientId}</td>
                                            <td className="px-4 py-2 border">{medicalReport.reportDate}</td>
                                            <td className="px-4 py-2 border">{medicalReport.testResults}</td>
                                            <td className="px-4 py-2 border">{medicalReport.notes}</td>
                                            <td className="px-4 py-2 border flex justify-center gap-2 h-[80px]">
                                                <button
                                                    className="bg-red-500 text-white px-3 h-[40px] py-1 rounded-md hover:bg-red-700"
                                                    onClick={(event) => handleDeleteMedicalReport(event, medicalReport.medicalReportId)}>Delete
                                                </button>
                                                <button
                                                    className="bg-blue-500 text-white px-3 h-[40px] py-1 rounded-md hover:bg-red-700">Generate Report
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

export default MedicalReportSection;
