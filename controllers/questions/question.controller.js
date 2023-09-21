const QuestionSchema=require("../../models/question.model"); 
const cloudinary=require('cloudinary').v2;
const multer=require('multer');
const storage=multer.memoryStorage();
const upload=multer({storage:storage});

//this is configurations
cloudinary.config({ 
    cloud_name: 'dpkupfxan', 
    api_key: '784297293799544', 
    api_secret: '***************************' 
  });

//this is the logic to get the question of the user and save it in the database
const QuestionController=async(req,res)=>{

    //this is to get the input from the user
    const {category,proof,ikibazo,urwego,indangamuntu}=req.body;
    if(!category || !ikibazo || !urwego){
        return    res.status(400).json({message:"Vuga ikibazo cyawe  byibuze ushyireho urwego nakategori yacyo ubundi wohereze!"});
       }
    try{

        //this is to upload the proof as image or video or audio
        const uploadedFile = await cloudinary.uploader.upload(req.file.buffer.toString("base64"));
        const newPloblem=new QuestionSchema({
            category,
            ikibazo,
            proof:uploadedFile.secure_url,//this is to store the link from cloud
            urwego,
            indangamuntu  //this is for the loged user
        })


        //this is to save the problem 
        await newPloblem.save()
return res.status(200).json({message:"Ikibazo cyawe cyoherejwe kubashyinze kugikurikirana Tegereza igihe gito uraza gusubizwa!"});
}catch(error){
    console.log(error);
    res.status().json({error:"Ntabwo ikibazo cyawe cyoherejwe ongera ugerageze mukanya"});
}
}
module.exports=QuestionController;


