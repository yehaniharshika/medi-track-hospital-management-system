export class Nurse {
    nurseId: string;
    nurseName: string;
    nurseImg: string | null;
    gender: string;
    contactNumber: string;
    qualification: string;
    email: string;
    departmentId: string;

    constructor(nurseId: string, nurseName: string, nurseImg: string | null, gender: string, contactNumber: string, qualification:string, email: string,departmentId:string) {
        this.nurseId = nurseId;
        this.nurseName = nurseName;
        this.nurseImg = nurseImg;
        this.gender = gender;
        this.contactNumber = contactNumber;
        this.qualification = qualification;
        this.email = email;
        this.departmentId = departmentId;
    }
}
