const { cloudinary } = require("../../config/cloudinary");
const QuestionSchema = require("../../models/question.model");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { v4: uuidv4 } = require("uuid");

//this is the logic to get the question of the user and save it in the database
const createQuestion = async (req, res) => {
  if (!req.user) {
    return res.status(403).json({ message: "Login to continue" });
  }
  const indangamuntu = req.user.indangamuntu;
  //this is to get the input from the user
  const { category, ikibazo, urwego } = req.body;
  if (!category || !ikibazo || !urwego) {
    return res.status(400).json({
      message:
        "Vuga ikibazo cyawe  byibuze ushyireho urwego na kategori yacyo ubundi wohereze!",
    });
  }
  try {
    if (req.files) {
      const proof = req.files.proof;
      const id = uuidv4();
      const ext = proof.name.split(".")[proof.name.length - 1];
      proof.name = `Question${id}${req.user.amazina}.${ext}`;
      let proofData = await cloudinary.uploader.upload(proof.tempFilePath);
      if (!proofData) {
        return res.status(500).json({
          message: "Error while uploading the proof",
        });
      }

      const newPloblem = new QuestionSchema({
        category,
        ikibazo,
        proof: proofData.secure_url, //this is to store the link from cloud
        urwego,
        indangamuntu, //this is for the loged user
        cloudinaryId: proofData.public_id,
      });

      //this is to save the problem
      await newPloblem.save();
      return res.status(200).json({
        message:
          "Ikibazo cyawe cyoherejwe kubashinzwe kugikurikirana Tegereza igihe gito uraza gusubizwa!",
      });
    } else {
      const newPloblem = new QuestionSchema({
        category,
        ikibazo,
        urwego,
        indangamuntu, //this is for the loged user
      });

      //this is to save the problem
      await newPloblem.save();
      return res.status(200).json({
        message:
          "Ikibazo cyawe cyoherejwe kubashinzwe kugikurikirana Tegereza igihe gito uraza gusubizwa!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Ntabwo ikibazo cyawe cyoherejwe ongera ugerageze mukanya",
    });
  }
};
module.exports = { createQuestion };
