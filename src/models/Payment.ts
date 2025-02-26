import {PaymentDetails} from "./PaymentDetails.ts";

export class Payment {
    paymentId: string;
    paymentDate: string;
    patientId: string;
    medicineItems: PaymentDetails[];

    constructor(paymentId: string, paymentDate: string,patientId: string, medicineItems: PaymentDetails[]) {
        this.paymentId = paymentId;
        this.paymentDate = paymentDate;
        this.patientId = patientId;
        this.medicineItems = medicineItems;
    }
}