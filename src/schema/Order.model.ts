import mongoose, { Schema } from "mongoose";
import { Orderstatus } from "../libs/enums/order.enum";

const orderSchema = new Schema(
    {
        orderTotal: {
            type: Number, 
            required: true,
        },

        orderDelivery: {
            type: Number,
            required: true,
        },

        orderStatus: {
            type: String,
            enum: Orderstatus.PAUSE,
        },

        memberId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Member",
        },
    }, 
    { timestamps: true, collection: "orderItems" }
);

export default mongoose.model("Order", orderSchema);