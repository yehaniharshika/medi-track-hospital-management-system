export class MedicalReport {
    medicalReportId: string;
    patientId: string;
    patientName: string;
    testResults: string;
    reportDate: string;
    notes: string;

    constructor(medicalReportId: string, patientId: string, patientName: string, testResults: string, reportDate: string, notes: string) {
        this.medicalReportId = medicalReportId;
        this.patientId = patientId;
        this.patientName = patientName;
        this.testResults = testResults;
        this.reportDate = reportDate;
        this.notes = notes;
    }
}