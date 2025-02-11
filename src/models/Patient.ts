export class Patient {
    patientId : string;
    patientName : string;
    age: string;
    patientImg : string | null;
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    gender:string;
    contactNumber:string;
    blood_type : string;
    chronic_diseases :string;
    last_visit_date :string;

    constructor(patientId:string,patientName:string,age:string,patientImg:string|null,addressLine1:string,addressLine2:string,postalCode:string,gender:string,contactNumber:string,blood_type:string,chronic_diseases:string,last_visit_date:string) {
        this.patientId = patientId;
        this.patientName = patientName;
        this.patientImg = patientImg;
        this.age = age;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.postalCode = postalCode;
        this.gender = gender;
        this.contactNumber = contactNumber;
        this.blood_type = blood_type;
        this.chronic_diseases = chronic_diseases;
        this.last_visit_date = last_visit_date;
    }


}