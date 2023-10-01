require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const userRouter = require("./routes/userRouters/user.routes");
const questionRouter = require("./routes/questionRouters/question.routes");
const ideasRouter = require("./routes/ideaRouters/ideas.routes");
const eventRouter=require('./routes/eventRouter/event.routes');
const leaderRouter=require("./routes/leadersRoutes/leaders.routes");
const swaggerSpec=require("./utils/swagger");
const swaggerUi = require('swagger-ui-express')
// const { mysqlConnect } = require("./config/mysql");
const { pool } = require("./config/mysql");
const fileUpload = require("express-fileupload");
const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* FILE UPLOAD */
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

/* MYSQL Connect */
// mysqlConnect();
pool


/* ROUTES */
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/ideas", ideasRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/leaders", leaderRouter);


/* SWAGGER */
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
