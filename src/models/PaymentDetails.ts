export class PaymentDetails {
    paymentDetailsId: string;
    medicineId: string;
    getQty: number;
    price: number;
    totalPrice: number;

    constructor(paymentDetailsId: string, medicineId: string, getQty: number, price: number,totalPrice: number) {
        this.paymentDetailsId = paymentDetailsId;
        this.medicineId = medicineId;
        this.getQty = getQty;
        this.price = price;
        this.totalPrice = totalPrice;
    }
}