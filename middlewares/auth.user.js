const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, async (e, decoded) => {
        if (e)
          return res.status(500).json({
            message: "Internal server error...",
          });

        const indangamuntu = decoded.indangamuntu;
        // get user with the same ID
        const user = await User.findOne({
          where: {
            indangamuntu: indangamuntu,
          },
        });

        if (!user)
          return res.status(403).json({
            message: "Not authorised!",
          });
        req.user = {
          id: user.id,
          amazina: user.amazina,
          role: user.role,
          intara: user.intara,
          akarere: user.akarere,
          umurenge: user.umurenge,
          akagari: user.akagari,
          umudugudu: user.umudugudu,
          telephone: user.telephone,
          indangamuntu: user.indangamuntu,
          imageUrl: user.imageUrl,
          verified: user.verified,
        };
        next();
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error...",
    });
  }

  if (!token)
    return res.status(403).json({
      message: "Not authorised!",
    });
};

module.exports = protect;
