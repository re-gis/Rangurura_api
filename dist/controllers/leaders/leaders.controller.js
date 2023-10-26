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
exports.createALeader = void 0;
const typeorm_1 = require("typeorm");
const leaders_entity_1 = __importDefault(require("../../entities/leaders.entity"));
const user_entity_1 = __importDefault(require("../../entities/user.entity"));
const createALeader = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leaderRepo = (0, typeorm_1.getRepository)(leaders_entity_1.default);
    const userRepo = (0, typeorm_1.getRepository)(user_entity_1.default);
    try {
        if (!req.user)
            return res.status(403).json({
                message: "Login to continue",
            });
        const { indangamuntu, organizationLevel, location, category, role } = req.body;
        if (!indangamuntu || !organizationLevel || !location || !category || !role)
            return res.status(403).json({
                message: "All credentials are required!",
            });
        // find the leader if present update else create new one
        const eUser = yield userRepo.findOne({
            where: {
                nationalId: indangamuntu,
            },
        });
        if (eUser) {
            // check if he already exists
            const eUser = yield leaderRepo.findOne({ where: { nationalId: indangamuntu } });
            if (eUser) {
                return res.status(401).json({ message: "Leader already exists!" });
            }
            // update the current user
            const userToSave = new leaders_entity_1.default(role, category, location, organizationLevel, indangamuntu);
            if (yield leaderRepo.save(userToSave))
                return res.status(201).json({ message: "Leader saved successfully" });
            return res.status(500).json({
                mesage: "Error while saving the leader",
            });
        }
        else {
            return res.status(401).json({ message: "Leader must be a user!" });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Internal server error...",
        });
    }
});
exports.createALeader = createALeader;
