import express from "express";
const bodyParser = require("body-parser");
// import connection from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initwebRoutes from "./routes/web";
import initapiRoutes from "./routes/api";
require("dotenv").config();
import configCors from "./config/cors";
import cookieParser from "cookie-parser";
const app = express();

//config Cookies Parser
app.use(cookieParser());

configCors(app);
configViewEngine(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//test connection
// connection();

//configRoutes
initwebRoutes(app);
initapiRoutes(app);
const PORT = process.env.PORT || 8888;

app.use((req, res) => {
  return res.send("404 not found");
});

app.listen(PORT, () => {
  console.log("JWT Backend running in port " + PORT);
});
