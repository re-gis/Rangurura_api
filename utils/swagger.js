const swaggerJSDoc = require("swagger-jsdoc");
const user = require("../routes/leadersRoutes/leaders.routes");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rangurura",
      version: "1.0.0",
      description: "This is the swagger documentation of rangurura",
    },
  },
  apis: ["../routes/userRouters/user.routes.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
