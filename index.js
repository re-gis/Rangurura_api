const bodyParser = require("body-parser");
const express = require("express");
const userRouter = require("./routes/userRouters/user.routes");
const questionRouter = require("./routes/questionRouters/question.routes");
const ideasRouter = require("./routes/ideaRouters/ideas.routes");
const { mysqlConnect } = require("./config/mysql");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* MYSQL Connect */
mysqlConnect()

/* ROUTES */
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/ideas", ideasRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
