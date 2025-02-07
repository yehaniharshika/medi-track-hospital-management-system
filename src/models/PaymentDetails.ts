export class PaymentDetails {
    paymentDetailsId: string;
    medicineId: string;
    getQty: number;
    price: number;
    totalPrice: number;
    discount: number;
    balance: number;

    constructor(paymentDetailsId: string, medicineId: string, getQty: number, price: number,totalPrice: number,discount: number,balance: number ) {
        this.paymentDetailsId = paymentDetailsId;
        this.medicineId = medicineId;
        this.getQty = getQty;
        this.price = price;
        this.totalPrice = totalPrice;
        this.discount = discount;
        this.balance = balance;
    }
}