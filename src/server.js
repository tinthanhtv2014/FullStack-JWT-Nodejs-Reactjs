import express from "express";
const bodyParser = require("body-parser");
// import connection from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initwebRoutes from "./routes/web";
require("dotenv").config();

const app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});
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
