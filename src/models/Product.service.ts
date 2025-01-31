import Errors, { HttpCode } from "../libs/Error";
// import { ProductCollection } from "./../../../../../..//src/libs/enums/product.enum";
import { Product, ProductInput, ProductInquiry, ProductUpdateInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { memoryStorage } from "multer";
import { Message } from "../libs/Error";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { ProductStatus } from "../libs/enums/product.enum";
import { T } from "../libs/types/common";
import { ObjectId } from "mongoose";
import ViewService from "./View.service";
import ViewModel from "../schema/View.model";
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
    public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
        console.log("inquiry:", inquiry);
        
        const match: T = {productStatus: ProductStatus.PROCESS};
        if (inquiry.productCollection) 
            match.productCollection = inquiry.productCollection;

        if (inquiry.search) {
            match.productName = {$regex: new RegExp(inquiry.search, "i")}; // "i" => flag hisoblanadi
        }
        
        const sort: T = inquiry.order === "productPrice" // dynamic key ni xosil qilib beradi
            ? { [inquiry.order]: 1 }        // pastdan yuqoriga
            : { [inquiry.order] : -1 };     // qolgan ihtiyoriy yuqoridan pastga

        
        const result = await  this.productModel
            .aggregate([
                {$match: match},
                {$sort: sort},
                {$skip: (inquiry.page * 1 -1) * inquiry.limit},    // 0
                {$limit: inquiry.limit * 1},                        // 3
            ])
            .exec();
        
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        return result;
    }

    public async getProduct( memberId: ObjectId | null, id: string ): Promise<Product> {
        const productId = shapeIntoMongooseObjectId(id);
        
        let result = await this.productModel
            .findOne({
                _id: productId, 
                productStatus: ProductStatus.PROCESS,
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
            
            // increase Traget View (Counts)
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
    public async getAllProducts(): Promise<Product[]> {
        const result = await this.productModel.find().exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        return result;
    }

    public async createNewProduct(input: ProductInput): Promise<Product> {
        try {
            return await this.productModel.create(input);
        } catch (err) {
            console.error("Error, model: createNewProduct:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

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
}

export default ProductService;