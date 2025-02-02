export class Doctor {
    doctorId: string;
    doctorName: string;
    specialty: string;
    doctorImg: string | null;
    gender: string;
    contactNumber: string;
    email: string;

    constructor(doctorId: string, doctorName: string, specialty: string, doctorImg: string | null, gender: string, contactNumber: string, email: string) {
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.specialty = specialty;
        this.doctorImg = doctorImg;
        this.gender = gender;
        this.contactNumber = contactNumber;
        this.email = email;
    }

}