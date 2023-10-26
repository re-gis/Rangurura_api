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
exports.destroyAccount = exports.resendOtp = exports.verifyOtp = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_entity_1 = __importDefault(require("../../entities/user.entity"));
const user_utils_1 = require("../../utils/user.utils");
const otp_entity_1 = __importDefault(require("../../entities/otp.entity"));
const twilio_1 = __importDefault(require("twilio"));
const tw = (0, twilio_1.default)(process.env.SID, process.env.AUTH_TOKEN);
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
dotenv_1.default.config();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { amazina, intara, akarere, umurenge, akagari, umudugudu, telephone, ijambobanga, // Password in Kinyarwanda
    indangamuntu, kwemezaIjambobanga, // Password confirmation in Kinyarwanda
    role } = req.body;
    if (!amazina ||
        !intara ||
        !akarere ||
        !akagari ||
        !umudugudu ||
        !telephone ||
        !ijambobanga ||
        !indangamuntu ||
        !kwemezaIjambobanga ||
        !umurenge)
        return res.status(400).json({
            message: "All credentials are required",
        });
    // Check if passwords match
    if (ijambobanga !== kwemezaIjambobanga) {
        return res.status(400).json({
            message: "Ijambobanga wemeje rigomba kuba risa niryo wanditse mbere!",
        });
    }
    try {
        let userRepo = (0, typeorm_1.getRepository)(user_entity_1.default);
        let otpRepo = (0, typeorm_1.getRepository)(otp_entity_1.default);
        const eUser = yield userRepo.findOne({
            where: { nationalId: indangamuntu }
        });
        if (eUser) {
            return res.status(400).json({
                message: "Indangamuntu yawe isanzwe muri Rangurura yihindure wongere ugerageze cyangwa winjire."
            });
        }
        // Hash the password before saving to the database
        const hashedPassword = yield bcryptjs_1.default.hash(ijambobanga, 10);
        // send message
        const otp = (0, user_utils_1.generateOtp)();
        console.log(otp);
        yield tw.messages.create({
            body: `Kode yawe yo muri Rangurura ni ${otp}`,
            to: telephone,
            from: "+12765985304",
        });
        // Save the otp
        const hashedOtp = yield bcryptjs_1.default.hash(otp, 10);
        // check if it exists
        const eOtp = yield otpRepo.findOne({ where: { number: telephone } });
        if (eOtp) {
            return res.status(400).json({ message: 'Otp have been sent, verify to continue!' });
        }
        const newOtp = new otp_entity_1.default(telephone, hashedOtp);
        if (!(yield otpRepo.save(newOtp))) {
            return res.status(500).json({ message: "Error while saving the OTP" });
        }
        if (!role) {
            role = "UMUTURAGE";
        }
        let image = `https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1`;
        const newUser = new user_entity_1.default(amazina, umurenge, hashedPassword, indangamuntu, telephone, umudugudu, akagari, akarere, intara, role, false, image);
        if (!(yield userRepo.save(newUser))) {
            return res.status(401).json({ message: "Error while saving the user" });
        }
        return res.status(200).json({
            message: "Urakoze kwiyandikisha muri Rangurura! Ubu ushobora kwinjiramo ugatanga ikibazo cyawe!",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error...", error: error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = (0, typeorm_1.getRepository)(user_entity_1.default);
    try {
        const { indangamuntu, ijambobanga } = req.body;
        if (!indangamuntu || !ijambobanga)
            return res.status(400).json({
                message: "All credentials are required",
            });
        const user = yield userRepo.findOne({ where: { nationalId: indangamuntu } });
        if (!user || !(yield bcryptjs_1.default.compare(ijambobanga, user.password)))
            return res.status(400).json({
                message: "shyiramo indangamuntu na password bitarimo ikosa!",
            });
        return res.status(200).json({
            message: "User logged in successfully",
            token: (0, user_utils_1.generateToken)(user),
            indangamuntu, //this is must be stored on the fronted and used when making table or demanding difference services from the backend
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error...",
        });
    }
});
exports.loginUser = loginUser;
// verify otp
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let otpRepo = (0, typeorm_1.getRepository)(otp_entity_1.default);
    let userRepo = (0, typeorm_1.getRepository)(user_entity_1.default);
    try {
        const { number, otp } = req.body;
        if (!number || !otp)
            return res.status(400).json({
                message: "All details are required!",
            });
        const existingOtp = yield otpRepo.findOne({
            where: {
                number: number,
            },
        });
        if (!existingOtp)
            return res.status(400).json({
                message: "Invalid or expired code",
            });
        // verify otp
        console.log(yield bcryptjs_1.default.compare(otp, existingOtp.otp));
        const validOtp = yield bcryptjs_1.default.compare(otp, existingOtp.otp);
        if (!validOtp)
            return res.status(400).json({
                message: "Invalid code",
            });
        // Update profile to verified = true
        const user = yield userRepo.findOne({ where: { phoneNumber: number } });
        if (!user) {
            return res.status(401).json({
                message: "No user found!"
            });
        }
        user.verified = true;
        yield userRepo.save(user);
        otpRepo.delete(existingOtp);
        return res.status(200).json({
            message: "Account verified successfully....",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            mesage: "Internal server error...",
        });
    }
});
exports.verifyOtp = verifyOtp;
const resendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const otpRepo = (0, typeorm_1.getRepository)(otp_entity_1.default);
    try {
        const { number } = req.body;
        if (!number)
            return res.status(400).json({
                message: "All details are required",
            });
        // first delete the existing otp
        const eOtp = yield otpRepo.findOne({ where: { number: number } });
        if (!eOtp) {
            return res.status(401).json({ message: "No otp found!" });
        }
        if (!(yield otpRepo.delete(eOtp))) {
            return res.status(500).json({ message: "Error while deleting the otp..." });
        }
        const otp = (0, user_utils_1.generateOtp)();
        yield tw.messages.create({
            body: `Kode yawe yo muri Rangurura ni ${otp}`,
            to: number,
            from: "+12765985304",
        });
        const hashedOtp = yield bcryptjs_1.default.hash(otp, 10);
        const newOtp = new otp_entity_1.default(number, hashedOtp);
        yield otpRepo.save(newOtp);
        return res.status(200).json({ message: `Code resent to ${number}...` });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Internal server error...",
        });
    }
});
exports.resendOtp = resendOtp;
// const resetPass = async (req, res) => {
//   try {
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       message: "Internal server error...",
//     });
//   }
// };
//this is to delete the account of the user
const destroyAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = (0, typeorm_1.getRepository)(user_entity_1.default);
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(401).json({ message: "Password is required!" });
        }
        const user = req.user;
        if (!user) {
            return res.status(403).json({ mesage: "Login to continue..." });
        }
        const eUser = yield userRepo.findOne({ where: { nationalId: user.nationalId } });
        if (!eUser) {
            return res.status(404).json({ message: "No user found!" });
        }
        // check password
        if (!(yield bcryptjs_1.default.compare(password, eUser.password))) {
            return res.status(401).json({ message: "Confirm password to continue!" });
        }
        // delete the user account
        yield userRepo.delete(eUser);
        return res.status(200).json({ message: "User account deleted successfully!" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: "something went wrong! Please try again latter." });
    }
});
exports.destroyAccount = destroyAccount;
