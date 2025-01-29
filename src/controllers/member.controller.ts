import MemberService from "../models/Member.service";
import { T, test } from "../libs/types/common";
import express, {NextFunction, Request, response, Response} from "express";
import { ExtendedRequest, LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Error";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";

const memberService = new MemberService();
const authService = new AuthService();

// React loihamiz uchun

const memberController: T = {};

/* SIGN UP page */

memberController.signup = async (req: Request, res: Response) => {
    try {
        console.log("signup");
        const input: MemberInput = req.body,
            result: Member = await memberService.signup(input);
            const token = await authService.createToken(result);    // TODO: Tokens authentication
            console.log("token:", token);

            res.cookie(
                "accessToken", token, {
                    maxAge: AUTH_TIMER * 3600 * 1000, 
                    httpOnly: false
                }
            );

        res.status(HttpCode.CREATED).json({ member: result, accessToken: token });
    } catch (err) {
        console.log("Error, signup:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
        // res.json({ });
    }
};



/* LOG IN page */

memberController.login = async (req: Request, res: Response) => {
    try {
        console.log("login");
        const input: LoginInput = req.body,
            result = await memberService.login(input),
            token = await authService.createToken(result);   // TODO: Tokens authentication
            console.log("token =>", token);

            res.cookie(
                "accessToken", token, {
                    maxAge: AUTH_TIMER * 3600 * 1000, 
                    httpOnly: false
                }
            );

        res.status(HttpCode.OK).json({ member: result, accessToken: token });
    } catch (err) {
        console.log("Error, login:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};



/* LOGOUT page */

memberController.logout = ( req: ExtendedRequest, res: Response ) => {
    try {

        console.log("logout");
        
        res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });
        res.status(HttpCode.OK).json({ logout: true });
    } catch (err) {
        console.log("Error, login:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};



/* GET MEMBER DETAILS page */

memberController.getMemberDetail = async ( req: ExtendedRequest, res: Response ) => {
    try {

        console.log("getMemberDetail");

        const result = await memberService.getMemberDetail( req.member );
        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, getMemberDetail:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};



/* UPDATE MEMBER DETAILS page */

memberController.updateMember = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log("updateMember");
        const input: MemberUpdateInput = req.body;
        if (req.file) input.memberImage = req.file.path;

        const result = await memberService.updateMember(req.member, input);

        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, updateMember:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};


/* GET TOP-USERS page */

memberController.getTopUsers = async (req: Request, res: Response) => {
    try {
        console.log("getTopUsers");

       const result = await memberService.getTopUsers();

       res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, getTopUsers:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}


/* Midleware mantiqlarimiz hisolanadi */

memberController.verifyAuth = async (
    req: ExtendedRequest, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const token = req.cookies["accessToken"];
        if (token) req.member = await authService.checkAuth(token);

        if (!req.member) 
            throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);

        next();
    } catch (err) {
        console.log("Error, verifyAuth:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

memberController.retrieveAuth = async (
    req: ExtendedRequest, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const token = req.cookies["accessToken"];
        if (token) req.member = await authService.checkAuth(token);
        
        next();
    } catch (err) {
        console.log("Error, retrieveAuth:", err);
        next();
    }
};

export default memberController;