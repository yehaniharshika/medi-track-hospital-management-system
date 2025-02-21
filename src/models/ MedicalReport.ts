export class MedicalReport {
    medicalReportId: string;
    reportDate: string;
    testResults: string;
    notes: string;
    patientId: string;
    patientName: string;
    doctorId: string;

    constructor(medicalReportId: string, reportDate: string, testResults: string, notes: string,patientId: string, patientName: string, doctorId: string) {
        this.medicalReportId = medicalReportId;
        this.reportDate = reportDate;
        this.testResults = testResults;
        this.notes = notes;
        this.patientId = patientId;
        this.patientName = patientName;
        this.doctorId = doctorId;
    }
}