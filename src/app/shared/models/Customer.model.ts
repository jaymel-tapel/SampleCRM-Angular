export class Customer {
    id?:string;
    lastName: string;
    firstName: string;
    email: string;
    birthday: Date;
    phone?: string;
    address?: string
    custCode?: string

    constructor(lastName: string, firstName: string, email: string, birthday: Date, phone: string | null, address: string | null) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.birthday = birthday;
    }
}