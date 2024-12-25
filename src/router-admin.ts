import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";
import router from "./router";

// Restaurant
routerAdmin.get("/", restaurantController.goHome);

routerAdmin
    .get("/login", restaurantController.getLogin)
    .post("/login", restaurantController.processLogin);

routerAdmin
    .get("/signup", restaurantController.getSignup)
    .post("/signup", restaurantController.processSignup);

routerAdmin.get("/logout", restaurantController.logout);
routerAdmin.get("/check-me", restaurantController.checkAuthSession);




// Product
// User

export default routerAdmin;

// get bizga page ni chqarib berish uchun xizmat qladi
// post bu malumotni ozgartirish uchun xizmat qladi