import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Error";
import { T } from "../libs/types/common";
import ProductService from "../models/Product.service";
import { ProductInput, ProductInquiry } from "../libs/types/product";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { ProductCategory } from "../libs/enums/product.enum";

const productService = new ProductService();

const productController: T = {};

/* SPA */
/* GET PRODUCTS */
productController.getProducts = async (
    req: Request, 
    res: Response
) => {
    try {
        console.log("getProducts API chaqirildi!");
        console.log("Query params:", req.query);

        const { page, limit, order, productCategory, search, productCountInStock } = req.query;

        const inquiry: ProductInquiry = {
            order: String(order),
            page: Number(page),
            limit: Number(limit),
            search: "",
            productCategory: ProductCategory.SMARTPHONE,
            countInStock: 0
        };

        if (productCategory) {
            inquiry.productCategory = productCategory as ProductCategory;
        }
        if (search) {
            inquiry.search = String(search);
        }
        if (productCountInStock) {
            inquiry.countInStock = Number(productCountInStock);
        }

        console.log("Inquiry object:", inquiry);
        const result = await productService.getProducts(inquiry);
        
        console.log("API javobi:", result);
        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, getProducts:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};


/* GET PRODUCT */
productController.getProduct = async ( req: ExtendedRequest, res: Response ) => {
    try {
        
        console.log("getProduct");
        const { id } = req.params;

        const memberId = req.member?._id ?? null,
            result = await productService.getProduct(memberId, id);

        res.status( HttpCode.OK ).json(result);
    } catch (err) {
        console.log("Error, getProduct:", err);
        if ( err instanceof Errors ) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};


/* SSR */
/* GET ALL PRODUCTS */
productController.getAllProducts = async (req: Request, res: Response) => {
    try {
        console.log("getAllProducts");
        const data = await productService.getAllProducts();

        res.render("products", { products: data });
    } catch (err) {
        console.log("Error, getAllProducts:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};


/* CREATE NEW PRODUCT */
productController.createNewProduct = async (
    req: AdminRequest, 
    res: Response
) => {
    const body = JSON.parse(JSON.stringify(req.body));

    console.log("💡 Parsed Body:", body);
    console.log("✅ productCategory:", body.productCategory);
    console.log("✅ productStorage:", body.productStorage);

    try {
        console.log("createNewProduct");
        console.log("req.files:", req.files);
        console.log("req.body:", req.body);

        if (!req.files?.length) {
            throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);
        }

        const data: ProductInput = {
            ...body,
            productCategory: body.productCategory,
            productImages: req.files.map((ele: any) => ele.path.replace(/\\/g, "/"))
        };

        await productService.createNewProduct(data);

        res.send(
            `<script> alert("Successful creation"); window.location.replace('/admin/product/all'); </script>`
        );

    } catch (err) {
        console.log("Error, createNewProduct:", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script> alert("${message}"); window.location.replace('/admin/product/all'); </script>`
        );
    }
};


/* UPDATE CHOSEN PRODUCT */
productController.updateChosenProduct = async (req: Request, res: Response) => {
    try {
        console.log("updateChosenProduct");
        const id = req.params.id;

        const result = await productService.updateChosenProduct(id, req.body);
        
        res.status(HttpCode.OK).json({ data: result });
    } catch (err) {
        console.log("Error, updateChosenProduct:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

export default productController;