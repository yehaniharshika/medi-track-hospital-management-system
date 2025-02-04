export class Nurse {
    nurseId: string;
    nurseName: string;
    nurseImg: string | null;
    dob: string;
    gender: string;
    contactNumber: string;
    qualification: string;
    email: string;

    constructor(nurseId: string, nurseName: string, nurseImg: string | null,dob: string, gender: string, contactNumber: string, qualification:string, email: string) {
        this.nurseId = nurseId;
        this.nurseName = nurseName;
        this.nurseImg = nurseImg;
        this.dob = dob;
        this.gender = gender;
        this.contactNumber = contactNumber;
        this.qualification = qualification;
        this.email = email;
    }
}
