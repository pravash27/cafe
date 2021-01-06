import { Billing } from "./billing.model";

export interface Table{
    id?: number;
    name: string;
    status?: number;
    loginid?: number;
    billing?:Billing ;
    createdate?: Date;
    updatedate?: Date;
}
