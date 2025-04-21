import { ObjectId } from "mongoose";
import { ProductStatus, ProductCategory, ProductStorage, ProductColor } from '../enums/product.enum';
  
export interface Product {
    _id: ObjectId;
    productName: string;
    productBrand: string;
    productCategory: ProductCategory;
    productPrice: number;
    productCountInStock: number;
    productLeftCount: number;
    productStatus: ProductStatus;
    productStorage: ProductStorage;
    productColor: ProductColor;
    productDesc?: string;
    productImages: string[];       // Mahsulot rasmlari
    productViews?: number;         // Optional
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductInquiry {
    search?: string;
    page?: number;
    limit?: number;
    order?: string;
    productCategory?: ProductCategory;
    productBrands?: string[];
    productSearch?: string;
    countInStock?: number;
}

export interface ProductInput {
    productStatus?: ProductStatus;
    productCategory: ProductCategory;
    productName: string;
    productPrice: number;
    productCountInStock: number;
    productLeftCount: number;
    productColor?: ProductColor;
    productStorage?: number;
    productDesc?: string;
    productImages?: string[];
    productViewa?: number;
}

export interface ProductUpdateInput {
    _id: ObjectId;
    productStatus?: ProductStatus;
    productCategory: ProductCategory;
    productName?: string;
    productPrice?: number;
    productCountInStock: number;
    productColor?: ProductColor;
    productStorag?: number;
    productDesc?: string;
    productImages?: string[];
    productViewa?: number;
}