const bcrypt = require("bcryptjs");
const User = require("../../models/user.model");
const { sendOtp, generateToken } = require("../../utils/user.utils");
const Otp = require("../../models/otp.model");

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
    await sendOtp(telephone);

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
        "Urakoze kwiyandikishya muri Rangurura! Ubu ushobora kwinjiramo ugatanga ikibazo cyawe!",
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
      indangamuntu //this is must be stored on the fronted and used when making table or demanding difference services from the backend
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
    console.log(await bcrypt.compare(otp, existingOtp.otp) );
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

module.exports = { registerUser, loginUser, verifyOtp };
