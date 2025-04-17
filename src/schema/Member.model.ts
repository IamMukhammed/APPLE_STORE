import mongoose, { Schema } from "mongoose";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";

// Schema first & Code first & Code based
// Scheme based
const memberSchema = new Schema({
    memberType: {
        type: String,
        enum: MemberType,
        default: MemberType.USER
    },

    memberStatus: {
        type: String,
        enum: MemberStatus,
        default: MemberStatus.ACTIVE
    },

    memberName: {
        type: String,
        index: { unique: true, sparse: true },
        required: true
    },

    memberPhone: {
        type: String,
        index: { unique: true, sparse: true },
        required: true
    },

    memberPassword: {
        type: String,
        select: false,
        required: true,
    },

    memberAddress: {
        type: String,
    },

    memberDesc: {
        type: String,
    },

    memberImage: {
        type: String,
    },

    memberPoints: {
        type: Number,
        default: 0,
    }
},
    { timestamps: true}  /* updatedAt, createdAt */ 
);

export default mongoose.model('Member', memberSchema);

// enum qiymatlar => aniq belgilangan qiymatlarni qabul qilish maqsadida ishlatiladigan type hisoblanadi