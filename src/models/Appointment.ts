export class Appointment {
    appointmentCode: string;
    appointmentDate: string;
    appointmentTime: string;
    patientId: string;
    doctorId: string;
    appointmentType: string;
    appointmentStatus: string;

    constructor(appointmentCode: string, appointmentDate: string, appointmentTime: string, patientId: string, doctorId: string, appointmentType: string, appointmentStatus: string) {
        this.appointmentCode = appointmentCode;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.appointmentType = appointmentType;
        this.appointmentStatus = appointmentStatus;
    }

}