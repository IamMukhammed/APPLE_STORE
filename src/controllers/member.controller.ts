import MemberService from "../models/Member.service";
import { T, test } from "../libs/types/common";
import express, {Request, Response} from "express";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors from "../libs/Error";
import AuthService from "../models/Auth.service";

const memberService = new MemberService();
const authService = new AuthService();

// React loihamiz uchun

const memberController: T = {};

memberController.signup = async (req: Request, res: Response) => {
    try {
        console.log("signup");
        const input: MemberInput = req.body,
            result: Member = await memberService.signup(input);
            const token = await authService.createToken(result);    // TODO: Tokens authentication
            console.log("token:", token);
        
        res.json({ member: result });
    } catch (err) {
        console.log("Error, signup:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
        // res.json({ });
    }
};

memberController.login = async (req: Request, res: Response) => {
    try {
        console.log("login");
        const input: LoginInput = req.body,
            result = await memberService.login(input),
            token = await authService.createToken(result);   // TODO: Tokens authentication
            console.log("token =>", token);



        res.json({ member: result });
    } catch (err) {
        console.log("Error, login:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
        // res.json({ });
    }
};

export default memberController;