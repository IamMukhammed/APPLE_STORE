import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Error";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs";
import { shapeIntoMongooseObjectId } from "../libs/config";

class MemberService {
    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel;
    }
    
    /** SPA */

    public async login(input: LoginInput): Promise<Member> {
        const member = await this.memberModel
            .findOne(
                { memberNick: input.memberNick, 
                    memberStatus: { $ne: MemberStatus.DELETE }, },
                { memberNick: 1, memberPassword: 1, memberStatus: 1 },
        ).exec();
        if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
        else if(member.memberStatus === MemberStatus.BLOCK) {
            throw new Errors(HttpCode.FORBIDDEN, Message.BLOCKED_USER);
        }

        const isMatch = await bcrypt.compare(
            input.memberPassword,
            member.memberPassword
        );
        
        if(!isMatch) {
            throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
        }

        return await this.memberModel.findById(member._id).lean().exec();
    }

    public async getMemberDetail(member: Member): Promise<Member> {
        const memberId = shapeIntoMongooseObjectId(member._id);
        const result = await this.memberModel
        .findOne({ _id: memberId, memberStatus: MemberStatus.ACTIVE })
        .exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        return result;
    }

    public async updateMember(member: Member, input: MemberUpdateInput): Promise<Member> {
        const memberId = shapeIntoMongooseObjectId(member._id);
        const result = await this.memberModel
            .findByIdAndUpdate({_id: memberId}, input, {new: true})
            .exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.UPDATE_FAILED);

        return result;
    }

    /** SSR */

    public async signup(input: MemberInput): Promise<Member> {
        const salt = await bcrypt.genSalt(); // hashing qilishni amalga oshirish  salt qilish yani tuzlash orqali
        input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

        try {
            const result = await this.memberModel.create(input);
            result.memberPassword = "";
            return result.toJSON();
        }   catch (err) {
            console.log("Error, model:signup", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
        }
    }

    public async getUsers(): Promise<Member[]> {
        const result = await this.memberModel
            .find({ memberType: MemberType.USER })
            .exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        
        return result;
    }

    public async updateChosenUser( input: MemberUpdateInput ): Promise<Member> {
        input._id = shapeIntoMongooseObjectId( input._id);
        const result = await this.memberModel
            .findByIdAndUpdate({ _id: input._id }, input, { new: true })
            .exec();
        if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
        
        return result;
    }
}




export default MemberService;

// Pascal standartlari asosida quramiz.

/* Promise => agar method async method bo'lmasa
    unda biz 'Promise' ni ishlatmaymiz. 'Promise'  faqatgina 
    async da ishlatiladi xolos.
*/