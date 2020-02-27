const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const register = require("./routes/register");
const login = require("./routes/login");
const user = require("./routes/userDetail");
const item = require("./routes/item");
const dbConnect = require("./config/dbConfig");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

dbConnect();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/user", user);
app.use("/api/items", item);

app.listen(port, () => {
  console.log(`App is being served on port : ${port}`);
});
