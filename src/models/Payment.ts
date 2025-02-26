import {PaymentDetails} from "./PaymentDetails.ts";

export class Payment {
    paymentId: string;
    paymentDate: string;
    patientId: string;
    medicines: PaymentDetails[];

    constructor(paymentId: string, paymentDate: string,patientId: string, medicines: PaymentDetails[]) {
        this.paymentId = paymentId;
        this.paymentDate = paymentDate;
        this.patientId = patientId;
        this.medicines = medicines;
    }
}