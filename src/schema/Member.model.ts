import mongoose, {Schema} from "mongoose";
import { memberStatus, memberType } from "../libs/enums/member.enum";

// Schema first & Code first & Code based
// Scheme based
const memberSchema = new Schema({
    memberType: {
        type: String,
        enum: memberType,
        default: memberType.USER
    },

    memberStatus: {
        type: String,
        enum: memberStatus,
        default: memberStatus.ACTIVE
    },

    memberNick: {
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
    { timestamps: true }  /* updatedAt, createdAt */ 
);

export default mongoose.model('Member', memberSchema);

// enum qiymatlar => aniq belgilangan qiymatlarni qabul qilish maqsadida ishlatiladigan type hisoblanadi