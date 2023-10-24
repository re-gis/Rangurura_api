import 'bcryptjs'
import UserEntity from '../../entities/user.model'
import {generateToken, generateOtp} from '../../utils/user.utils'
import OtpEntity from '../../entities/otp.model'
import LeaderEntity from '../../entities/leaders.model'
import twilio from 'twilio'
const tw = twilio(process.env["SID "], process.env["AUTH_TOKEN "])
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const registerUser = async (req, res) => {
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
    const existingUser = await User.findOne({
      where: { indangamuntu: indangamuntu },
    });
    if (existingUser)
      return res.status(400).json({
        message:
          "Indangamuntu yawe isanzwe muri Rangurura yihindure wongere ugerageze cyangwa winjire.",
      });
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(ijambobanga, 10);

    // send message
    const otp = generateOtp();
    await twilio.messages.create({
      body: `Kode yawe yo muri Rangurura ni ${otp}`,
      to: telephone,
      from: "+12765985304",
    });

    // Save the otp
    const hashedOtp = await bcrypt.hash(otp, 10);
    const newOtp = new Otp({
      number: telephone,
      otp: hashedOtp,
    });

    await newOtp.save();

    // Create a new user
    const newUser = new User({
      amazina,
      intara,
      akarere,
      umurenge,
      akagari,
      umudugudu,
      telephone,
      ijambobanga: hashedPassword,
      indangamuntu,
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(200).json({
      message:
        "Urakoze kwiyandikisha muri Rangurura! Ubu ushobora kwinjiramo ugatanga ikibazo cyawe!",
    });
  } catch (error) {
    // Handle specific errors related to unique constraints (assuming you're using Sequelize)
    if (error.name === "SequelizeUniqueConstraintError") {
      if (error.fields.indangamuntu) {
        return res.status(400).json({
          error:
            "Indangamuntu yawe isanzwe muri Rangurura yihindure wongere ugerageze cyangwa winjire.",
        });
      }
      if (error.fields.telephone) {
        return res.status(400).json({
          error:
            "Telephone yawe isanzwe muri rangurura yihindure wongere ugerageze cyangwa winjire.",
        });
      }
      return res.status(500).json({ error: "Error related to the database" });
    }

    // Handle general errors
    console.error(error);
    return res.status(500).json({
      error: "Hari ibitagenda neza kuri Rangurura! Ongera ugerageze mukanya",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { indangamuntu, ijambobanga } = req.body;
    if (!indangamuntu || !ijambobanga)
      return res.status(400).json({
        message: "All credentials are required",
      });

    const user = await User.findOne({ where: { indangamuntu: indangamuntu } });
    if (!user || !(await bcrypt.compare(ijambobanga, user.ijambobanga)))
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
const verifyOtp = async (req, res) => {
  try {
    const { number, otp } = req.body;
    if (!number || !otp)
      return res.status(400).json({
        message: "All details are required!",
      });

    const existingOtp = await Otp.findOne({
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
    const user = await User.findOne({ where: { telephone: number } });
    user.verified = "true";
    user.save();

    await existingOtp.destroy();

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

const resendOtp = async (req, res) => {
  try {
    const { number } = req.body;
    if (!number)
      return res.status(400).json({
        message: "All details are required",
      });

    const newOtp = await sendOtp(number, async (e) => {
      if (e) {
        return res.status(500).json({ message: "An error occurred" });
      } else {
        const existingotp = await Otp.findOne({
          where: {
            number: number,
          },
        });

        if (existingotp) {
          await existingotp.update({ otp: newOtp });
          return res.status(201).json({
            message: "Otp resent",
          });
        } else {
          await Otp.create({
            otp: newOtpValue,
            number: number,
          });
          return res.status(201).json({
            message: "Otp resent",
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error...",
    });
  }
};

const resetPass = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error...",
    });
  }
};

const createALeader = async (req, res) => {
  try {
    if (!req.user)
      return res.status(403).json({
        message: "Login to continue",
      });
    const { indangamuntu, organizationLevel, location, category, role } =
      req.body;

    if (!indangamuntu || !organizationLevel || !location || !category || !role)
      return res.status(403).json({
        message: "All credentials are required!",
      });

    // find the leader if present update else create new one
    const eUser = await LeaderSchema.findOne({
      where: {
        indangamuntu: indangamuntu,
      },
    });

    if (eUser) {
      // update the current user
      const userToSave = new LeaderSchema({
        indangamuntu: indangamuntu,
        organizationLevel: organizationLevel,
        location: location,
        category: category,
        role: role,
      });

      if (await userToSave.save())
        return res.status(201).json({ message: "Leader saved successfully" });
      return res.status(500).json({
        mesage: "Error while saving the leader",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error...",
    });
  }
};
//this is to delete the account of the user
const destroyAccount = async (req, res) => {
  try {
    const { indangamuntu } = req.body;
    const sql = `DELETE FROM Users WHERE indangamuntu=${indangamuntu}`;

    // Use the mysqlConnection object to query the database
    pool.query(sql, (error, results, fields) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Send the query results as a JSON response
      res
        .status(200)
        .json({ message: "your account has been deleted successfully!" });
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "something went wrong! Please try again latter." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyOtp,
  resendOtp,
  resetPass,
  createALeader,
  destroyAccount,
};
