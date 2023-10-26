import bcrypt from 'bcryptjs';
import User from '../../entities/user.entity';
import { generateToken, generateOtp } from '../../utils/user.utils';
import Otp from '../../entities/otp.entity';
import Leader from '../../entities/leaders.entity';
import twilio from 'twilio';
const tw = twilio(process.env.SID, process.env.AUTH_TOKEN);
import dotenv from 'dotenv';
import path from 'path';
import {getRepository, Repository} from "typeorm";
import IRequest from "../../interfaces/IRequest";
import IResponse from "../../interfaces/IResponse";

dotenv.config();

export const registerUser = async (req: IRequest, res:IResponse):Promise<IResponse> => {
  let {
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
      role
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
    const eUser = await userRepo.findOne({
      where: {nationalId: indangamuntu}
    })
    if (eUser) {
      return res.status(400).json({
        message: "Indangamuntu yawe isanzwe muri Rangurura yihindure wongere ugerageze cyangwa winjire."
      })
    }
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(ijambobanga, 10);

    // send message
    const otp = generateOtp();
    console.log(otp)
    await tw.messages.create({
      body: `Kode yawe yo muri Rangurura ni ${otp}`,
      to: telephone,
      from: "+12765985304",
    });

    // Save the otp
    const hashedOtp = await bcrypt.hash(otp, 10);

    // check if it exists
    const eOtp = await otpRepo.findOne({where: {number: telephone}})
    if (eOtp) {
      return res.status(400).json({message: 'Otp have been sent, verify to continue!'})
    }
    const newOtp = new Otp(telephone, hashedOtp)
    if (!await otpRepo.save(newOtp)) {
      return res.status(500).json({message: "Error while saving the OTP"})
    }

  if(!role) {
    role = "UMUTURAGE"
  }
    let image:string = `https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1`
    const newUser = new User(amazina, umurenge, hashedPassword, indangamuntu, telephone, umudugudu, akagari, akarere, intara, role, false, image )


      if(!await userRepo.save(newUser)) {
        return res.status(401).json({message: "Error while saving the user"})
      }
      return res.status(200).json({
        message: "Urakoze kwiyandikisha muri Rangurura! Ubu ushobora kwinjiramo ugatanga ikibazo cyawe!",
      });

  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error...", error: error})
  }
}

export const loginUser = async (req:IRequest, res:IResponse):Promise<IResponse> => {
  const userRepo:Repository<User> = getRepository(User)
  try {
    const { indangamuntu, ijambobanga } = req.body;
    if (!indangamuntu || !ijambobanga)
      return res.status(400).json({
        message: "All credentials are required",
      });

    const user = await userRepo.findOne({ where: { nationalId: indangamuntu } });
    if (!user || !(await bcrypt.compare(ijambobanga, user.password)))
      return res.status(400).json({
        message: "shyiramo indangamuntu na password bitarimo ikosa!",
      });

    return res.status(200).json({
      message: "User logged in successfully",
      token: generateToken(user),
      indangamuntu, //this is must be stored on the fronted and used when making table or demanding difference services from the backend
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error...",
    });
  }
};

// verify otp
export const verifyOtp = async (req:IRequest, res:IResponse):Promise<IResponse> => {
  let otpRepo:Repository<Otp> = getRepository(Otp)
  let userRepo:Repository<User> = getRepository(User)
  try {
    const { number, otp } = req.body;
    if (!number || !otp)
      return res.status(400).json({
        message: "All details are required!",
      });

    const existingOtp = await otpRepo.findOne({
      where: {
        number: number,
      },
    });

    if (!existingOtp)
      return res.status(400).json({
        message: "Invalid or expired code",
      });

    // verify otp
    console.log(await bcrypt.compare(otp, existingOtp.otp));
    const validOtp = await bcrypt.compare(otp, existingOtp.otp);
    if (!validOtp)
      return res.status(400).json({
        message: "Invalid code",
      });

    // Update profile to verified = true
    const user = await userRepo.findOne({ where: { phoneNumber: number } });
    if(!user) {
      return res.status(401).json({
        message:"No user found!"
      })
    }

    user.verified = true
    await userRepo.save(user)
    otpRepo.delete(existingOtp)

    return res.status(200).json({
      message: "Account verified successfully....",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mesage: "Internal server error...",
    });
  }
};

export const resendOtp = async (req:IRequest, res:IResponse):Promise<IResponse> => {
  const otpRepo:Repository<Otp> = getRepository(Otp)
  try {
    const { number } = req.body;
    if (!number)
      return res.status(400).json({
        message: "All details are required",
      });

    // first delete the existing otp
    const eOtp = await otpRepo.findOne({where:{number: number}})
    if(!eOtp) {
      return res.status(401).json({message:"No otp found!"})
    }

    if(!await otpRepo.delete(eOtp)) {
      return res.status(500).json({message: "Error while deleting the otp..."})
    }

    const otp = generateOtp();
    await tw.messages.create({
      body: `Kode yawe yo muri Rangurura ni ${otp}`,
      to: number,
      from: "+12765985304",
    });

    const hashedOtp = await bcrypt.hash(otp, 10)

    const newOtp:Otp = new Otp(number, hashedOtp)
    await otpRepo.save(newOtp)
    return res.status(200).json({message:`Code resent to ${number}...`})
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error...",
    });
  }
};

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
export const destroyAccount = async (req:IRequest, res:IResponse):Promise<IResponse> => {
  const userRepo:Repository<User> = getRepository(User)
  try {
    const {password} = req.body
    if(!password) {
      return res.status(401).json({message:"Password is required!"})
    }
    const user = req.user
    if(!user) {
      return res.status(403).json({mesage:"Login to continue..."})
    }



    const eUser = await userRepo.findOne({where:{nationalId:user.nationalId}})
    if(!eUser) {
      return res.status(404).json({message:"No user found!"})
    }

    // check password
    if(!(await bcrypt.compare(password, eUser.password))) {
      return res.status(401).json({message:"Confirm password to continue!"})
    }

    // delete the user account
    await userRepo.delete(eUser)
    return res.status(200).json({message:"User account deleted successfully!"})
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "something went wrong! Please try again latter." });
  }
};

