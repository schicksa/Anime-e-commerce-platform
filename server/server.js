const express = require("express");
const cors = require("cors")
const app = express();
const userRouter = require("./router/userRouter")
const config = require("./config/config")

app.use(cors());
app.use(express.json()) // can parse application/json
app.use(express.urlencoded({ extended: true })) // can parse application/x-www-form-urlencoded

app.use(userRouter);

app.listen(config.port);
