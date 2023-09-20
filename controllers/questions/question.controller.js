const QuestionSchema=require("../../models/question.model"); 

//this is the logic to get the question of the user and save it in the database
const QuestionController=async(req,res)=>{
   
    //this is to get the input from the user
    const {category,proof,ikibazo}=req.body;
    if(!category || !ikibazo){
        return    res.status(400).json({message:"Vuga ikibazo cyawe  byibuze ushyireho nakategori yacyo ubundi wohereze!"});
       }
    try{
        const newPloblem=new QuestionSchema({
            category,
            ikibazo,
            proof,
        })
        //this is to save the problem 
        await newPloblem.save()
return res.status(200).json({message:"Ikibazo cyawe cyoherejwe kubashyinze kuugikurikirana Tegereza igihe gito uraza gusubizwa!"});
}catch(error){
    console.log(error);
    res.status().json({error:"Ntabwo ikibazo cyawe cyoherejwe ongera ugerageze mukanya"});
}
}
module.exports=QuestionController;


