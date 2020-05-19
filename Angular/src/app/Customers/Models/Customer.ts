

export class Customer
{
    constructor(
        public Name:string = '',
        public Email:string = '',
        public Pwd:string = '',
        public DOB:Date = null,
        public WalletBalance:number = null,
        public ResidingAddress :string = '',
        public PhoneNo :number = null
    ){}
}

