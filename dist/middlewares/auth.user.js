"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.role = exports.protect = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const user_entity_1 = __importDefault(require("../entities/user.entity"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let userRepo = (0, typeorm_1.getRepository)(user_entity_1.default);
    let token;
    try {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
            // @ts-ignore
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (e, decoded) => __awaiter(void 0, void 0, void 0, function* () {
                if (e)
                    return res.status(500).json({
                        message: "Internal server error...",
                    });
                // @ts-ignore
                const indangamuntu = decoded.indangamuntu;
                // get user with the same ID
                const user = yield userRepo.findOne({ where: { nationalId: indangamuntu } });
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
            }));
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Internal server error...",
        });
    }
    if (!token)
        return res.status(403).json({
            message: "Not authorised!",
        });
});
exports.protect = protect;
const role = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Not authorised to perform this action",
            });
        }
        else {
            next();
        }
    };
};
exports.role = role;
module.exports = { protect: exports.protect, role: exports.role };
