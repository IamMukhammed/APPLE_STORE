import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin"
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";

// 1 - Entrance
const app = express();
console.log("__dirname:", __dirname);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan(MORGAN_FORMAT)); // Midleware design pattern  // lips ni ichidan morgan_formatni chaqirdik
// app.use(morgan(`:method :url :response-time [:status]`));

// 2 - Sessions

// 3 - Views
app.set('views', path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 4 - Routers
// BSSR => Backend Server Site Rendering //  SSR => Server Site Rendering // EJS
app.use("/admin", routerAdmin);  // SSR: EJS
app.use("/", router);  // Middleware Design Pattern // SPA: React

export default app;    // module.exports mantigi bn birxil