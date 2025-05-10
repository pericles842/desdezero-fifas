import { TemplateRef } from "@angular/core";
import { TypePay } from "../models/pay_method";

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
    key:TypePay,
    active: boolean
}