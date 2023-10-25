// //this is the logic about the leader
// const LeaderSchema = require("../../entities/leaders.model");
//
// const leaderController = async (req, res) => {
//   //this is to get the input from the user
//   const { indangamuntu, organizationLevel, location, category, role } =
//     req.body;
//
//   if (!indangamuntu || !organizationLevel || !location || !category || !role) {
//     return res.status(400).json({ message: "All credentials are required!" });
//   }
//
//   try {
//     const newEvent = await new LeaderSchema({
//       indangamuntu,
//       organizationLevel,
//       location,
//       category,
//       role,
//     });
//
//     //this is to save the problem to the db
//     await newEvent.save();
//     return res
//       .status(200)
//       .json({
//         msg: "Murakoze gutanga inshingano igisigaye nukuzishyira mubikorwa!",
//       });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ msg: "something went wrong please try again later" });
//     console.log(error);
//   }
// };
//
// //this is to export the eventcontroller
// module.exports = leaderController;
