import dotenv from 'dotenv'
import IRequest from "../interfaces/IRequest";
dotenv.config()
import jwt from 'jsonwebtoken'
import IResponse from "../interfaces/IResponse";
import {NextFunction} from "express";
import {getRepository, Repository} from "typeorm";
import UserEntity from "../entities/user.entity";
const User = require("../entities/user.entity");

const protect = async (req:IRequest, res:IResponse, next:NextFunction) => {
  let userRepo:Repository<UserEntity> = getRepository(User)
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      // @ts-ignore
      jwt.verify(token, process.env.JWT_SECRET, async (e, decoded) => {
        if (e)
          return res.status(500).json({
            message: "Internal server error...",
          });

        // @ts-ignore
        const indangamuntu = decoded.indangamuntu;
        // get user with the same ID
        const user = await userRepo.findOne(indangamuntu)
        if (!user)
          return res.status(403).json({
            message: "Not authorised!",
          });
        req.user = {
          id: user.id,
          amazina: user.username,
          role: user.role,
          intara: user.province,
          akarere: user.district,
          umurenge: user.sector,
          akagari: user.village,
          umudugudu: user.cell,
          telephone: user.phoneNumber,
          indangamuntu: user.nationalId,
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

const role = (...roles:string[]) => {
  return (req:IRequest, res:IResponse, next:NextFunction) => {
    if (roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Not authorised to perform this action",
      });
    } else {
      next();
    }
  };
};

module.exports = { protect, role };
