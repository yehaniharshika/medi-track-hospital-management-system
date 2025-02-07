import {PaymentDetails} from "./PaymentDetails.ts";

export class Payment {
    paymentId: string;
    paymentDate: string;
    patientId: string;
    items: PaymentDetails[];

    constructor(paymentId: string, paymentDate: string,patientId: string, items: PaymentDetails[]) {
        this.paymentId = paymentId;
        this.paymentDate = paymentDate;
        this.patientId = patientId;
        this.items = items;
    }
}