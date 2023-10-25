"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
//
// //this is the logic to get the question of the user and save it in the database
// const createQuestion = async (req:IRequest, res:IResponse) => {
//   if (!req.user) {
//     return res.status(403).json({ message: "Login to continue" });
//   }
//   const indangamuntu = req.user.indangamuntu;
//   //this is to get the input from the user
//   const { category, ikibazo, urwego, status } = req.body;
//   if (!category || !ikibazo || !urwego) {
//     return res.status(400).json({
//       message:
//         "Vuga ikibazo cyawe  byibuze ushyireho urwego na kategori yacyo ubundi wohereze!",
//     });
//   }
//   try {
//     if (req.files) {
//       const proof = req.files.proof;
//       const id = uuidv4();
//       const ext = proof.name.split(".")[proof.name.length - 1];
//       proof.name = `Question${id}${req.user.amazina}.${ext}`;
//       let proofData = await cloudinary.uploader.upload(proof.tempFilePath);
//       if (!proofData) {
//         return res.status(500).json({
//           message: "Error while uploading the proof",
//         });
//       }
//
//       const newPloblem = new QuestionSchema({
//         category,
//         ikibazo,
//         proof: proofData.secure_url, //this is to store the link from cloud
//         urwego,
//         indangamuntu, //this is for the loged user
//         cloudinaryId: proofData.public_id,
//         status,
//       });
//
//       //this is to save the problem
//       await newPloblem.save();
//       return res.status(200).json({
//         message:
//           "Ikibazo cyawe cyoherejwe kubashinzwe kugikurikirana Tegereza igihe gito uraza gusubizwa!",
//       });
//     } else {
//       const newPloblem = new QuestionSchema({
//         category,
//         ikibazo,
//         urwego,
//         indangamuntu, //this is for the loged user
//       });
//
//       //this is to save the problem
//       await newPloblem.save();
//       return res.status(200).json({
//         message:
//           "Ikibazo cyawe cyoherejwe kubashinzwe kugikurikirana Tegereza igihe gito uraza gusubizwa!",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       error: "Ntabwo ikibazo cyawe cyoherejwe ongera ugerageze mukanya",
//     });
//   }
// };
//
// const getYourQns = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(403).json({
//         message: "Login to continue",
//       });
//     }
//
//     // get qns
//     const myQns = await QuestionSchema.findAll({
//       where: { indangamuntu: req.user.indangamuntu },
//     });
//
//     if (myQns.length == 0)
//       return res.status(404).json({
//         message: "No questions found!",
//       });
//
//     return res.status(200).json({
//       data: myQns,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Internal server error...",
//     });
//   }
// };
//
// // get qns of your place
// const getPeoplesQns = async (req, res) => {
//   try {
//     if (!req.user)
//       return res.status(403).json({
//         message: "Login to continue...",
//       });
//
//     // get qns according to the level
//     // const qns = await QuestionSchema.findAll({
//     //   where: {
//     //     urwego: req.user.
//     //   }
//     // })
//   } catch (e) {
//     return res.status(500).json({
//       message: "Internal server error...",
//     });
//   }
// };
//
// const rejectQuestion = async (req, res) => {
//   try {
//     if (!req.user)
//       return res.status(403).json({
//         message: "Login to continue",
//       });
//
//     const { id } = req.params;
//     // find the question
//     const qn = await QuestionSchema.findOne({
//       where: {
//         id: id,
//       },
//     });
//
//     if (!qn)
//       return res.status(404).json({ message: `Question ${id} not found!` });
//
//     // reject it
//     qn.status = "REJECTED";
//     qn.save();
//     return res.status(201).json({
//       message: `Question ${id} rejected`,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error..." });
//   }
// };
//
// module.exports = { createQuestion, getYourQns, getPeoplesQns, rejectQuestion };
