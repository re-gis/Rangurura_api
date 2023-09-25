//this is the the logic to get the events
const EventSchema=require("../../models/event.model");
const displayEventToLeader=async(req,res)=>{
if(!req.user){
return    res.status(403).json({msg:"login then continue"});
}
try{
    const indangamuntu=req.user.indangamuntu;
const events=await EventSchema.findAll({indangamuntu});
return res.status(200).json(events)
   }catch(error){
console.log(error)
res.status(500).json({error:"something went wrong please try again later!"})
   }
   
}
module.exports=EventSchema;