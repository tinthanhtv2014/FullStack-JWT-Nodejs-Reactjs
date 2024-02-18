import express from "express";
const bodyParser = require("body-parser");
// import connection from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initwebRoutes from "./routes/web";
import initapiRoutes from "./routes/api";
require("dotenv").config();
import configCors from "./config/cors";
const app = express();

configCors(app);
configViewEngine(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//test connection
// connection();

initwebRoutes(app);
initapiRoutes(app);
const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log("JWT Backend running in port " + PORT);
});
