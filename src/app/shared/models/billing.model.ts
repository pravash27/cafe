import { Customer } from "./customer.model";
import { Product } from "./product.model";
import { Table } from "./table.model";

export interface BillItem{
  id?:number;
  bill_id?:number;
  product_id?:number;
  product?: Product;
  product_name?:string;
  qty?:number;
  rate?:number;
  kot?:number;
  totalamount?:number;
  createdate?: Date;
  updatedate?: Date;
  isOrdered?:boolean;
}

export interface Billing{
  id?:number;
  bill_prefix?:string;
  bill_no?:string;
  customer_id?:number;
  bill_date?: Date,
  table_id?:number;
  bill_amount?:number;
  createdate?: Date;
  updatedate?: Date;
  customer?:Customer;
  table?: Table;
  billItems?: BillItem[];
  kot?:number;
}

export interface Payment{
  id?:number;
  bill_id?:number;
  customer_id?:number;
  customer?:Customer;
  paymentDate?:Date;
  billing?:Billing;
  paymentMode?:string;
  paidamount?:number;
  createdate?:Date;
  updateDate?:Date;
  mobileNo?:string;
  customer_name?:string;
  othercharge?:number;
  bill_amount?:number;
}

export interface Kot{
  kotNo?:number;
  kotItems?:BillItem[];
}
