import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Error";
import { MemberType } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs";

class MemberService {
    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel;
    }
    
    /** SPA */

    

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

    public async login(input: LoginInput): Promise<Member> {
        // TODO: Consider member status later
        const member = await this.memberModel
            .findOne(
                { memberNick: input.memberNick },       
                { memberNick: 1, memberPassword: 1 },
        ).exec();
        if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

        const isMatch = await bcrypt.compare(
            input.memberPassword,
            member.memberPassword
        );
        
        if(!isMatch) {
            throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
        }

        return await this.memberModel.findById(member._id).lean().exec();
    }

    public async getUsers(): Promise<Member[]> {
        const result = await this.memberModel
            .find({ memberType: MemberType.USER })
            .exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        
        return result;
    }
}




export default MemberService;

// Pascal standartlari asosida quramiz.

/* Promise => agar method async method bo'lmasa
    unda biz 'Promise' ni ishlatmaymiz. 'Promise'  faqatgina 
    async da ishlatiladi xolos.
*/