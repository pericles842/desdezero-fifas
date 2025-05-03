import { TemplateRef } from "@angular/core";

export interface PaymentMethods {
    id: number;
    name: string;
    url: string;
    active: boolean
    details: PaymentMethodsDetails
}

export interface PaymentMethodsDetails {
    description: string;
    bank: string;
    holder: string; //titualar
    account: string;
    phone: string
}


export interface CategoryPay {
    id: number,
    name: string,
    key_template?: TemplateRef<any>,
    key:string,
    active: boolean
}