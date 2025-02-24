/* Architectural pattern: MVC, DI, MVP. Backend ning suyagi
    hisoblanib backend dagi malumotlar oqimini tartibga 
    soladigan  bir vosita ya'ni arxitekturasi
1. MVC => MODEL VIEW CONTROLLER
2. DI  => DEPENDECY INJECTION
3. MVP => MINIMUM VIABLE PRODUCT
*/

/* Design patter: Middleware, Decorate.  Malum bir bolaklarini
    yechishda hisoblanadigan qismi.
*/


// import moment from "moment";  // const moment = require('moment');

import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

mongoose
.connect(process.env.MONGO_URL as string, {})
.then((data) => {
    console.log("MongoDB connection succeed");
    const PORT = process.env.PORT ?? 3001;
    app.listen(PORT, function () {
        console.info(`The server is running successsfully on port: ${PORT}`);
        console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    });
})
.catch((err) => console.log("ERROR on connection MongoDB", err));

// console.log("PORT:", process.env.PORT);
// console.log("MONGO_URL:", process.env.MONGO_URL);

