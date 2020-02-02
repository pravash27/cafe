import { Unit } from './unit.model';
import { Category } from './category.model';

export interface Product {
    id?: number;
    category_id?: number;
    category?: Category;
    unit?: Unit;
    name: string;
    unit_id?: number;
    rate?: number;
    discount?: number;
    image?: string;
    status?: number;
    loginid?: number;
    createdate?: Date;
    updatedate?: Date;
}
