import MemberService from "../models/Member.service";
import { T, test } from "../libs/types/common";
import express, {Request, Response} from "express";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors from "../libs/Error";

const memberService = new MemberService();

// React loihamiz uchun

const memberController: T = {};

memberController.signup = async (req: Request, res: Response) => {
    try {
        console.log("signup");
        const input: MemberInput = req.body,
            result: Member = await memberService.signup(input);
            // TODO: Tokens authentication
        
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
            result = await memberService.login(input);
            // TODO: Tokens authentication

        res.json({ member: result });
    } catch (err) {
        console.log("Error, login:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
        // res.json({ });
    }
};

export default memberController;