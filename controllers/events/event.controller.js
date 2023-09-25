//this is the logic about the events
const EventSchema=require('../../models/event.model');

const eventController=async(req,res)=>{
//this is to get the input from the user
const {eventName,
    organizationLevel,
    location,
     category,
    startDate,
     endDate,
     endTime,
     startTime,
     description}=req.body;   

    if( !eventName ||
        !organizationLevel||
        !location||
         category ||
        !startDate ||  
        !endDate ||        
         !endTime ||     
        !startTime ||
         !description){
        return    res.status(400).json({message:"Uzuza ibisabwa byose maze wohereze!"});
       }
      
    try{
        const newEvent=await new EventSchema({
            eventName,
            organizationLevel,
            location,
             category,
            startDate,
             endDate,
             endTime,
             startTime,
             description
        })
        
        console.log("the eventname is " + eventName)

//this is to save the problem to the db
await newEvent.save()
return res.status(200).json({msg:"Wamaze gutanga event yawe tegereza abo igenewe mu mwanya muto!"});
    }catch(error){
        res.status(500).json({msg:"something went wrong please try again later"});
        console.log(error);
    }
}

//this is to export the eventcontroller
module.exports=eventController;