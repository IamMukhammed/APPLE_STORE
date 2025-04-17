import mongoose, { Schema } from "mongoose";
import { ProductColor } from "../libs/enums/product.enum";
import { ProductStorage } from "../libs/enums/product.enum";
import { ProductCategory } from "../libs/enums/product.enum";
import { ProductStatus } from "../libs/enums/product.enum";

const productSchema = new Schema(
    {
        productStatus: {
            type: String,
            enum: ProductStatus,
            default: ProductStatus.AVAILABLE,
        },
        
        productCategory: {
            type: String,
            enum: ProductCategory,
            required: true,
        },

        productName: {
            type: String,
            required: true,
        },
        
        productPrice: {
            type: String,
            required: true,
        },

        productLeftCount: {
            type: Number,
            required: true,
        },

        productStorage: {
            type: String,
            enum: ProductStorage,
            // enum: ["64GB", "128GB", "256GB", "512GB", "1T", "2T"],
            // default: ProductStorage.GB_64,
            required: true,
        },

        productColor: {
            type: [String],
            enum: ProductColor,
            // default: ProductColor.WHITE,
            required: true,
        },

        productDesc: {
            type: String,
        },

        productImages: {
            type: [String],
            default: [],
        },

        productView: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true } //updateAt, createAt
);

productSchema.index(
    { productName: 1, productStorage: 1, },
    { unique: true }
);
export default mongoose.model("Product", productSchema);