"use strict";
/* Architectural pattern: MVC, DI, MVP. Backend ning suyagi
    hisoblanib backend dagi malumotlar oqimini tartibga
    soladigan  bir vosita ya'ni arxitekturasi
1. MVC => MODEL VIEW CONTROLLER
2. DI  => DEPENDECY INJECTION
3. MVP => MINIMUM VIABLE PRODUCT
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Design patter: Middleware, Decorate.  Malum bir bolaklarini
    yechishda hisoblanadigan qismi.
*/
// import moment from "moment";  // const moment = require('moment');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
mongoose_1.default
    .connect(process.env.MONGO_URL, {})
    .then((data) => {
    console.log("MongoDB connection succeed");
    const PORT = process.env.PORT ?? 3003;
    app_1.default.listen(PORT, function () {
        console.info(`The server is running successsfully on port: ${PORT}`);
        console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    });
})
    .catch((err) => console.log("ERROR on connection MongoDB", err));
// console.log("PORT:", process.env.PORT);
// console.log("MONGO_URL:", process.env.MONGO_URL);
