const {createConnection} = require('typeorm')

createConnection().then(connection => {
  console.log("Database connected successfully!")
}).catch(error => {
  console.log("Error while connecting to database: ", error)
})