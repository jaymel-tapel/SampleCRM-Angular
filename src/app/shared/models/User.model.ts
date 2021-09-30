export class User {
    Id?: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Token: {
        Value: string,
        Expires: string
    };

    constructor(email:string, firstName:string, lastName:string) {
        this.Email = email;
        this.FirstName = firstName;
        this.LastName = lastName;
    }
}