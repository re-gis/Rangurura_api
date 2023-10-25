"use strict";
const swaggerJSDoc = require("swagger-jsdoc");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Rangurura",
            version: "1.0.0",
            description: "This is the swagger documentation of rangurura",
        },
    },
    apis: ["./routes/*/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
