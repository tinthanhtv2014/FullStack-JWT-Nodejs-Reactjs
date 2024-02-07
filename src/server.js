import express from "express";
const bodyParser = require("body-parser");
// import connection from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initwebRoutes from "./routes/web";
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//test connection
// connection();
configViewEngine(app);
initwebRoutes(app);

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log("JWT Backend running in port " + PORT);
});
