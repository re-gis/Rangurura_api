require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERS,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

const User = sequelize.define("User", {
  amazina: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  intara: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  akarere: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  umurenge: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  akagari: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  umudugudu: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  indangamuntu: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  ijambobanga: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  verified: {
    type: DataTypes.STRING,
    defaultValue: false,
  },
});

// Sync the model with the database to create the table
sequelize
  .sync()
  .then(() => {
    console.log("Table created successfully.");
  })
  .catch((err) => {
    console.error("Error creating table:", err);
  });

module.exports = User;
