import express from "express";
require("dotenv").config();
import cors from "cors";
import initRouter from "./src/routes/index";
import connectDatabase from "./src/config/connectDatabase";
import generateCode from "./src/ultis/generateCode";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRouter(app);
connectDatabase();

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
  console.log(`Server is running on the port ${listener.address().port}`);
});
