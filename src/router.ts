import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";

// router.get('/', memberController.goHome);
// router.get('/login', memberController.getLogin);
// router.get('/singup', memberController.getSignup);

router.post("/login", memberController.login);
router.post("/signup", memberController.signup);

export default router;