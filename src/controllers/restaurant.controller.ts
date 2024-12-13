import { T, test } from "../libs/types/common";
import express, {Request, Response} from "express";
import MemberService from "../models/Member.service";

const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        // LOGIC
        // SERVICE MODEL
        // ...
        res.send("Home Page");
    } catch (err) {
        console.log("Error, goHome:", err);
    }
};

restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("Login Page");

        res.send("Login Page");
    } catch (err) {
        console.log("Error, getLogin:", err);
    }
};

restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("Signup Page");

        res.send("Signup Page");
    } catch (err) {
        console.log("Error, getSignup:", err);
    }
};

export default restaurantController;