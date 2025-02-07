export class Department {
    departmentId: string;
    departmentName: string;
    departmentEmail: string;
    location: string;
    headOfDepartment: string;
    phoneNumber: string;

    constructor(departmentId: string, departmentName: string, departmentEmail: string, location: string, headOfDepartment: string,phoneNumber: string) {
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.departmentEmail = departmentEmail;
        this.location = location;
        this.headOfDepartment = headOfDepartment;
        this.phoneNumber = phoneNumber;
    }
}