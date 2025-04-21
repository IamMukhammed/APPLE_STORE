import Errors, { HttpCode } from "../libs/Error";
import { ProductCategory } from "../libs/enums/product.enum";
import { Product, ProductInput, ProductInquiry, ProductUpdateInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { memoryStorage } from "multer";
import { Message } from "../libs/Error";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { ProductStatus } from "../libs/enums/product.enum";
import { T } from "../libs/types/common";
import { ObjectId } from "mongoose";
import ViewService from "./View.service";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enum";

class ProductService {
    private readonly productModel;
    public viewService;

    constructor() {
        this.productModel = ProductModel;
        this.viewService = new ViewService();
    }

    /* SPA */
    /* GET PRODUCTS */
    public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
        const match: any = { productStatus: ProductStatus.AVAILABLE };
    
        // Faqat omborda borlar
        if (inquiry.countInStock === 1) {
            match.productLeftCount = { $gt: 0 };
        }
    
        // Search
        if (inquiry.search) {
            match.productName = { $regex: new RegExp(inquiry.search, "i") };
        }
    
        // Product category (ALL dan boshqa bo‘lsa)
        if (inquiry.productCategory) {
            match.productCategory = inquiry.productCategory;
        }
    
        // Pagination & Sort
        const page = inquiry.page ?? 1;
        const limit = inquiry.limit ?? 8;
        const sortField = inquiry.order ?? "createdAt";
    
        const sort: Record<string, 1 | -1 | { $meta: "textScore" }> =
            sortField === "productPrice"
                ? { [sortField]: 1 }  // Ascending
                : { [sortField]: -1 }; // Descending
    
        const result = await this.productModel.aggregate([
            { $match: match },
            { $sort: sort },
            { $skip: (page - 1) * limit },
            { $limit: limit },
        ]).exec();
    
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    
        return result;
    }


    /* GET PRODUCT */
    public async getProduct( 
        memberId: ObjectId | null, 
        id: string,
    ): Promise<Product> {
        const productId = shapeIntoMongooseObjectId(id);
        
        let result = await this.productModel
            .findOne({
                _id: productId, 
                productStatus: ProductStatus.AVAILABLE,
            })
            .exec();

        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        // TODO: If authenticated users => first => view log creation
        if (memberId) {
            // Check View Log Existence
            const input: ViewInput = {
                memberId: memberId,
                viewRefId: productId,
                viewGroup: ViewGroup.PRODUCT,
            };

            const existView = await this.viewService.checkViewExistence(input);
            console.log("exist:", !!existView);

            // Insert New View Log
            if (!existView) {
                console.log("PLANNING TO INSERT NEW VIEW");
                await this.viewService.insertMemberView(input);

            // increase Target View (Counts)
            result = await this.productModel
                .findByIdAndUpdate(
                    productId, 
                    { $inc: { productViews: +1 } }, 
                    { new: true }
                )
                .exec();
            }
        }

        return result;
    }



    /* SSR */
    /* GET ALL PRODUCTS */
    public async getAllProducts(): Promise<Product[]> {
        const result = await this.productModel.find().exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        return result;
    }


    /* CREATE NEW PRODUCT */
    // public async createNewProduct(input: ProductInput): Promise<Product> {
    //     try {
    //         const storageMap: Record<string, string> = {
    //             GB_32: "32GB",
    //             GB_64: "64GB",
    //             GB_128: "128GB",
    //             GB_256: "256GB",
    //             GB_512: "512GB",
    //             GB_1024: "1024GB",
    //             GB_2048: "2048GB",
    //         };
      
    //         const key = input.productStorage as unknown as keyof typeof storageMap;
      
    //         const sanitizedInput = {
    //             ...input,
    //             productStorage: storageMap[inp.productStorage] || input.productStorage
    //         };
      
    //         return await this.productModel.create(sanitizedInput);
      
    //     } catch (err: any) {
    //         console.error("Error, model: createNewProduct:", err);
    //         throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    //     }
    // }

    public async createNewProduct(input: ProductInput): Promise<Product> {
        try {
            const storageMap: Record<string, string> = {
                GB_32: "32GB",
                GB_64: "64GB",
                GB_128: "128GB",
                GB_256: "256GB",
                GB_512: "512GB",
                GB_1024: "1024GB",
                GB_2048: "2048GB",
                OTHER: "OTHER",
            };
    
            // ✅ TypeScript xatosini oldini olamiz
            const rawStorage = String(input.productStorage ?? "OTHER");
            const mappedStorage = storageMap[rawStorage] || "OTHER";
    
            const sanitizedInput = {
                ...input,
                productStorage: mappedStorage,
            };
    
            return await this.productModel.create(sanitizedInput);
    
        } catch (err: any) {
            console.error("Error, model: createNewProduct:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }


    /* UPDATE CHOSEN PRODUCT */
    public async updateChosenProduct(
        id: string,
        input: ProductUpdateInput
    ): Promise<Product> {
        // string => objectId
        id = shapeIntoMongooseObjectId(id);
        const result = await this.productModel
        .findOneAndUpdate({ _id: id }, input, { new: true })
        .exec();
        if(!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

        console.log("result:", result);
        return result;
    }
};

export default ProductService;