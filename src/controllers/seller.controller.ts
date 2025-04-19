import {NextFunction, Request, Response} from "express";
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import { LoginInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Error";

const memberService = new MemberService();

const sellerController: T = {};

/* GO HOME */
sellerController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        res.render("home");         // send | render | redirect | json
    } catch (err) {
        console.log("Error, goHome:", err);
        res.redirect("/admin");
    }
};


/* GET SIGNUP */
sellerController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("Signup Page");
        res.render("signup");
    } catch (err) {
        console.log("Error, getSignup:", err);
        res.redirect("/admin");
    }
};


/* GET LOGIN */
sellerController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("Login Page");
        res.render("login");
    } catch (err) {
        console.log("Error, getLogin:", err);
        res.redirect("/admin");

    }
};


/* PROCESS SIGNUP */
sellerController.processSignup = async (
    req: AdminRequest,
    res: Response
) => {
    try {
        console.log("processSignup");
        console.log("req.body:", req.body);
        const file = req.file;
        console.log("file:", file);
        if ( !file ) 
            throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

        const newMember: MemberInput = req.body;
        newMember.memberImage = file?.path.replace(/\\/g, "/");
        newMember.memberType = MemberType.SELLER;
        const result = await memberService.signup(newMember);
        // TODO: Sessions authentication

        req.session.member = result;
        req.session.save(function () {
            res.redirect("/admin/product/all");
        });

    } catch (err) {
        console.log("Error, processSignup:", err);
        const message = 
            err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script> alert("${message}"): window.location.replace('/admin/signup') </script>`
        );
    }
};


/* PROCESS LOGIN */
sellerController.processLogin = async (
    req: AdminRequest,
    res: Response
) => {
    try {
        console.log("processLogin");
        console.log("body:", req.body);
        const input: LoginInput = req.body;
        const memberService = new MemberService();
        const result = await memberService.login(input);
        // TODO: Sessions authentication

        req.session.member = result;
        req.session.save(function () {
            res.redirect("/admin/product/all");
        });

    } catch (err) {
        console.log("Error, processLogin:", err);
        const message = 
            err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script> alert("${message}"); window.location.replace('/admin/login') </script>`
        );
    }
};


/* LOGOUT */
sellerController.logout = async (
    req: AdminRequest,
    res: Response
) => {
    try {
        console.log("logout");
        req.session.destroy(function() {
            res.redirect("/admin");
        });
    } catch (err) {
        console.log("Error, logout:", err);
        res.redirect("/admin");
    }
};


/* GET USERS */
sellerController.getUsers = async ( req: Request, res: Response ) => {
    try {
        console.log("getUsers");
        const result = await memberService.getUsers();
        console.log("result:", result);

        res.render("users", { users: result });
    } catch (err) {
        console.log("Error, getUsers:", err);
        res.redirect("/admin/login");
    }
};


/* UPDATE CHOSEN USER */
sellerController.updateChosenUser = async (req: Request, res: Response) => {
    try {
        console.log("updateChosenUser");
        const result = await memberService.updateChosenUser(req.body);

        res.status(HttpCode.OK).json({ data: result });
    } catch (err) {
        console.log("Error, updateChosenUser:", err);
        if ( err instanceof Errors ) res.status( err.code ).json( err );
        else res.status( Errors.standard.code ).json( Errors.standard );
    }
};


/* CHECK AUTH SESSION */
sellerController.checkAuthSession = async (
    req: AdminRequest,
    res: Response
) => {
    try {
        console.log("checkAuthSessio");
        if(req.session?.member)
            res.send(`<script> alert("${req.session.member.memberNick}") </script>`);
        else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}") </script>`);
    } catch (err) {
        console.log("Error, chechAuthSession:", err);
        res.send(err);
    }
};


/* VERIFY SELLER */
sellerController.verifySeller = (
    req: AdminRequest,
    res: Response,
    next: NextFunction
) => {
    if(req.session?.member?.memberType === MemberType.SELLER) {
            req.member = req.session.member;
            next();
    } else {
        const message = Message.NOT_AUTHENTICATED;
        res.send(
            `<script> alert("${message}"); window.location.replace('/admin/login'); </script>`
        );
    }
};



export default sellerController;