import express from "express";
import configViewEngine from "./configs/viewEngine";
import initwebRoutes from "./routes/web";
require("dotenv").config();
const app = express();
configViewEngine(app);
initwebRoutes(app);

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log("JWT Backend running in port " + PORT);
});
