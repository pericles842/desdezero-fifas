export  interface PaymentMethods{
    id: number;
    name: string;
    url: string; 
    active:boolean
    details:PaymentMethodsDetails
}

export interface PaymentMethodsDetails{
    description:string;
    bank:string;
    holder:string; //titualar
    account:string;
    phone:string
}