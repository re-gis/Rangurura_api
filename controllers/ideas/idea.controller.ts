const IdeaSchema = require("../../entities/idea.model");

//this is the logic to get the suggestion of the user and save it in the database
const IdeaController = async (req, res) => {
  //this is to get the input from the user
  const { category, igitekerezo, urwego, indangamuntu } = req.body;
  if (!category || !igitekerezo || !urwego) {
    return res
      .status(400)
      .json({
        message:
          "Vuga igitekerezo cyawe  byibuze ushyireho urwego nakategori yacyo ubundi wohereze!",
      });
  }
  try {
    const newIdea = await new IdeaSchema({
      indangamuntu, //this is for the logged or verified user
      category,
      igitekerezo,
      urwego,
    });
    //this is to save the problem
    await newIdea.save();
    return res
      .status(200)
      .json({ message: "Urakoze gutanga umusanzu wo kubaka igihugu cyawe!" });
  } catch (error) {
    console.log(error);
    res
      .status()
      .json({
        error: "Ntabwo igitekerezo cyawe cyoherejwe ongera ugerageze mukanya",
      });
  }
};
module.exports = IdeaController;
