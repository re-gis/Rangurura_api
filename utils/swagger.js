const swaggerJSDoc = require('swagger-jsdoc');
const user=require("../routes/leadersRoutes/leaders.routes")
const options={
    definition:{
        openapi:"3.0.0",
    info:{
title:"Rangurura",
version:"1.0.0",
description:"This is the swagger documentation of rangurura"
    },
},
apis:[
//these are api about the user 
    "../routes/userRouters/user.routes",
//these are api about question
"../routes/questionRouters/question.routes",

//these are api about ideas
"../routes/ideaRouters/ideas.routes",

//these are api about events
"../routes/eventRouter/event.routes",

//these are api about the leaders
"../routes/leadersRoutes/leaders.routes"
]


}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;



