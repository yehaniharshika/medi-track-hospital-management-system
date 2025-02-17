export class Medicine {
    medicineId: string;
    medicineName: string;
    brand: string;
    medicineImg: string | null;
    dosage_form: string;
    unit_price: string;
    quantity_in_stock: number;
    expiry_date: string;

    constructor(medicineId: string, medicineName: string,brand: string, medicineImg: string|null,dosage_form: string, unit_price: string, quantity_in_stock: number,expiry_date: string) {
        this.medicineId = medicineId;
        this.medicineName = medicineName;
        this.brand = brand;
        this.medicineImg = medicineImg;
        this.dosage_form = dosage_form;
        this.unit_price = unit_price;
        this.quantity_in_stock = quantity_in_stock;
        this.expiry_date = expiry_date;
    }

}