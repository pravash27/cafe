export interface Product {
    product_id?: number;
    category_id?: number;
    category_name?: string;
    unit_name?: string;
    product_name: string;
    unit_id?: number;
    rate?: number;
    discount?: number;
    image?: string;
    status?: number;
    loginid?: number;
    createdate?: Date;
    updatedate?: Date;
}
