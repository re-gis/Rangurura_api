"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const user_routes_1 = require("./routes/userRouters/user.routes");
// import swaggerUi from 'swagger-ui-express'
(0, dotenv_1.config)();
// const userRouter = require("./routes/userRouters/user.routes");
// const questionRouter = require("./routes/questionRouters/question.routes");
// const ideasRouter = require("./routes/ideaRouters/ideas.routes");
// const eventRouter = require("./routes/eventRouter/event.routes");
// const leaderRouter = require("./routes/leadersRoutes/leaders.routes");
// const swaggerSpec = require("./utils/swagger");
// const swaggerUi = require("swagger-ui-express");
// const { index } = require("./algoria");
// const messageRouter=require("./routes/messagesRouter/messages.routes");
// const { mysqlConnect } = require("./config/mysql");
// const { pool } = require("./config/postgres");
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const typeorm_1 = require("typeorm");
const leaders_routes_1 = require("./routes/leadersRoutes/leaders.routes");
// createConnection().then(connection => {
//     console.log("Database connected successfully!")
// }).catch(error => {
//     console.log("Error while connecting to database: ", error)
// })
(0, typeorm_1.createConnection)().then(connection => {
    console.log("Database connected successfully!");
}).catch(error => {
    console.log("Error while connecting to database: ", error);
});
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
/* FILE UPLOAD */
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
/* ROUTES */
app.use("/api/v1/users", user_routes_1.userRouter);
// app.use("/api/v1/questions", questionRouter);
// app.use("/api/v1/ideas", ideasRouter);
// app.use("/api/v1/events", eventRouter);
app.use("/api/v1/leaders", leaders_routes_1.leaderRouter);
// app.use("/api/v1/message",messageRouter);
// app /* SWAGGER */.app
//   app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
// Search api
// app.get("/search", (req, res) => {
//   const query = req.query.query;
//   index.search(query, (err, cnt) => {
//     if (err)
//       return res.status(500).json({ message: "Internal server error..." });
//
//     return res.status(200).json({ data: cnt.hits });
//   });
// });
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});
