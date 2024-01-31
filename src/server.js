import express from "express";
const bodyParser = require("body-parser");

import configViewEngine from "./configs/viewEngine";
import initwebRoutes from "./routes/web";
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
initwebRoutes(app);

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log("JWT Backend running in port " + PORT);
});
