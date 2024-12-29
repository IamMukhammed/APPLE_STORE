import mongoose, { Schema } from "mongoose";
import productController from "../controllers/product.controller";
import { ProductVolume } from "../libs/enums/product.enum";
import { ProductSize } from "../libs/enums/product.enum";
import { ProductCollection } from "../libs/enums/product.enum";
import { ProductStatus } from "../libs/enums/product.enum";

const productSchema = new Schema(
    {
        ProductStatus: {
            type: String,
            enum: ProductStatus,
            default: ProductStatus.PAUSE,
        },
        
        ProductCollection: {
            type: String,
            enum: ProductCollection,
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

        productSize: {
            type: String,
            enum: ProductSize,
            default: ProductSize.NORMAL,
        },

        ProductVolume: {
            type: Number,
            enum: ProductVolume,
            default: ProductVolume.ONE,
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
    { productName: 1, productSize: 1, },
    { unique: true }
);
export default mongoose.model("Product", productSchema);