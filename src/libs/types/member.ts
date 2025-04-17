import { ObjectId } from "mongoose";
import { MemberStatus, MemberType } from "../enums/member.enum";
import { Request } from "express";
import { Session } from "express-session";
import MemberService from "../../models/Member.service";

export interface Member {
    _id: ObjectId;
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberName: string;
    memberPhone: number;
    memberPassword?: string;
    memberEmail: string;
    memberAddress?: string;
    memberDesc?: string;
    memberImage?: string;
    memberPoints: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface MemberInput {
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberName: string;
    memberPhone: number;
    memberPassword: string;
    memberEmail: string;
    memberAddress?: string;
    memberDesc?: string;
    memberImage?: string;
    memberPoints?: number;
}

export interface LoginInput {
    memberName: unknown;
    // memberName: string;
    // memberEmail: string;
    memberPhone: number;
    memberPassword: string;
}

export interface MemberUpdateInput {
    _id: ObjectId;
    memberStatus?: MemberService;
    memberName?: string;
    memberPhone?: number;
    memberPassword?: string;
    memberEmail?: string;
    memberImage?: string;
    memberAddress?: string;
    memberDesc?: string;
}

export interface ExtendedRequest extends Request {
    member: Member;
    file: Express.Multer.File;
    files: Express.Multer.File[];
}

export interface AdminRequest extends Request {
    member: Member;
    session: Session & { member: Member };
    file: Express.Multer.File;
    files: Express.Multer.File[];
}