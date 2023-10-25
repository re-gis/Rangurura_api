import bcrypt from 'bcryptjs';
import User from '../../entities/user.model';
import { generateToken, generateOtp } from '../../utils/user.utils';
import Otp from '../../entities/otp.model';
import Leader from '../../entities/leaders.model';
import twilio from 'twilio';
const tw = twilio(process.env.SID, process.env.AUTH_TOKEN);
import dotenv from 'dotenv';
import path from 'path';
import UserEntity from "../../entities/user.model";
import {getRepository, Repository} from "typeorm";
import IRequest from "../../interfaces/IRequest";
import IResponse from "../../interfaces/IResponse";

dotenv.config();

export const registerUser = async (req: IRequest, res:IResponse) => {
  const {
    amazina,
    intara,
    akarere,
    umurenge,
    akagari,
    umudugudu,
    telephone,
    ijambobanga, // Password in Kinyarwanda
    indangamuntu,
    kwemezaIjambobanga, // Password confirmation in Kinyarwanda
  } = req.body;
  if (
      !amazina ||
      !intara ||
      !akarere ||
      !akagari ||
      !umudugudu ||
      !telephone ||
      !ijambobanga ||
      !indangamuntu ||
      !kwemezaIjambobanga ||
      !umurenge
  )
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
    let userRepo: Repository<User> = getRepository(User);
    let otpRepo: Repository<Otp> = getRepository(Otp);
    const eUser = await userRepo.findOne(indangamuntu)
    if (eUser) {
      return res.status(400).json({
        message: "Indangamuntu yawe isanzwe muri Rangurura yihindure wongere ugerageze cyangwa winjire."
      })
    }
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(ijambobanga, 10);

    // send message
    const otp = generateOtp();
    await tw.messages.create({
      body: `Kode yawe yo muri Rangurura ni ${otp}`,
      to: telephone,
      from: "+12765985304",
    });

    // Save the otp
    const hashedOtp = await bcrypt.hash(otp, 10);

    // check if it exists
    const eOtp = await otpRepo.findOne(telephone)
    if (eOtp) {
      return res.status(400).json({message: 'Otp have been sent, verify to continue!'})
    }
    const newOtp = new Otp(telephone, hashedOtp)
    if (!await otpRepo.save(newOtp)) {
      return res.status(500).json({message: "Error while saving the OTP"})
    }

    // Create a new user
    const newUser = userRepo.create({
      username: amazina,
      province: intara,
      district: akarere,
      sector: umurenge,
      cell: akagari,
      village: umudugudu,
      phoneNumber: telephone,
      password: hashedPassword,
      nationalId: indangamuntu
    })


    try {
      await userRepo.save(newUser);
      return res.status(200).json({
        message: "Urakoze kwiyandikisha muri Rangurura! Ubu ushobora kwinjiramo ugatanga ikibazo cyawe!",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error...", error: err });
    }


  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error...", error: error})
  }
}
//
// const loginUser = async (req, res) => {
//   try {
//     const { indangamuntu, ijambobanga } = req.body;
//     if (!indangamuntu || !ijambobanga)
//       return res.status(400).json({
//         message: "All credentials are required",
//       });
//
//     const user = await User.findOne({ where: { indangamuntu: indangamuntu } });
//     if (!user || !(await bcrypt.compare(ijambobanga, user.ijambobanga)))
//       return res.status(400).json({
//         message: "shyiramo indangamuntu na password bitarimo ikosa!",
//       });
//
//     return res.status(200).json({
//       message: "User logged in successfully",
//       token: generateToken(user),
//       indangamuntu, //this is must be stored on the fronted and used when making table or demanding difference services from the backend
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Internal server error...",
//     });
//   }
// };
//
// // verify otp
// const verifyOtp = async (req, res) => {
//   try {
//     const { number, otp } = req.body;
//     if (!number || !otp)
//       return res.status(400).json({
//         message: "All details are required!",
//       });
//
//     const existingOtp = await Otp.findOne({
//       where: {
//         number: number,
//       },
//     });
//
//     if (!existingOtp)
//       return res.status(400).json({
//         message: "Invalid or expired code",
//       });
//
//     // verify otp
//     console.log(await bcrypt.compare(otp, existingOtp.otp));
//     const validOtp = await bcrypt.compare(otp, existingOtp.otp);
//     if (!validOtp)
//       return res.status(400).json({
//         message: "Invalid code",
//       });
//
//     // Update profile to verified = true
//     const user = await User.findOne({ where: { telephone: number } });
//     user.verified = "true";
//     user.save();
//
//     await existingOtp.destroy();
//
//     return res.status(200).json({
//       message: "Account verified successfully....",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       mesage: "Internal server error...",
//     });
//   }
// };
//
// const resendOtp = async (req, res) => {
//   try {
//     const { number } = req.body;
//     if (!number)
//       return res.status(400).json({
//         message: "All details are required",
//       });
//
//     const newOtp = await sendOtp(number, async (e) => {
//       if (e) {
//         return res.status(500).json({ message: "An error occurred" });
//       } else {
//         const existingotp = await Otp.findOne({
//           where: {
//             number: number,
//           },
//         });
//
//         if (existingotp) {
//           await existingotp.update({ otp: newOtp });
//           return res.status(201).json({
//             message: "Otp resent",
//           });
//         } else {
//           await Otp.create({
//             otp: newOtpValue,
//             number: number,
//           });
//           return res.status(201).json({
//             message: "Otp resent",
//           });
//         }
//       }
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       message: "Internal server error...",
//     });
//   }
// };
//
// const resetPass = async (req, res) => {
//   try {
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       message: "Internal server error...",
//     });
//   }
// };
//
// const createALeader = async (req, res) => {
//   try {
//     if (!req.user)
//       return res.status(403).json({
//         message: "Login to continue",
//       });
//     const { indangamuntu, organizationLevel, location, category, role } =
//       req.body;
//
//     if (!indangamuntu || !organizationLevel || !location || !category || !role)
//       return res.status(403).json({
//         message: "All credentials are required!",
//       });
//
//     // find the leader if present update else create new one
//     const eUser = await LeaderSchema.findOne({
//       where: {
//         indangamuntu: indangamuntu,
//       },
//     });
//
//     if (eUser) {
//       // update the current user
//       const userToSave = new LeaderSchema({
//         indangamuntu: indangamuntu,
//         organizationLevel: organizationLevel,
//         location: location,
//         category: category,
//         role: role,
//       });
//
//       if (await userToSave.save())
//         return res.status(201).json({ message: "Leader saved successfully" });
//       return res.status(500).json({
//         mesage: "Error while saving the leader",
//       });
//     }
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       message: "Internal server error...",
//     });
//   }
// };
// //this is to delete the account of the user
// const destroyAccount = async (req, res) => {
//   try {
//     const { indangamuntu } = req.body;
//     const sql = `DELETE FROM Users WHERE indangamuntu=${indangamuntu}`;
//
//     // Use the mysqlConnection object to query the database
//     pool.query(sql, (error, results, fields) => {
//       if (error) {
//         console.error("Error executing SQL query:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//       }
//
//       // Send the query results as a JSON response
//       res
//         .status(200)
//         .json({ message: "your account has been deleted successfully!" });
//     });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ error: "something went wrong! Please try again latter." });
//   }
// };

