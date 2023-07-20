const express=require("express")
const Quizdata=require("./mongo")
const cors=require("cors")
const app=express()
app.use(express.json())
const axios=require('axios')
app.use(express.urlencoded({extended:true}))
app.use(cors())

async function retrieveData() {
    try {
      // Perform a query to retrieve the posted data
      const entries = await Quizdata.find({});
  
      console.log('Posted values:');
      entries.forEach(entry => {
        console.log(entry);
      });
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }
  app.post("/quiz/submit",async(req,res)=>{
    
    const{hobby,group,percentile,subject,strength,weakness}=req.body
    try{
        const entry=new Quizdata({hobby,group,percentile,subject,strength,weakness})
        await entry.save();
        res.send("Form submitted successfully");
    }
    catch(error){
        console.error(error);
        res.status(500).send('An error occured');
    }
  })





 

app.listen(8000,()=>{
    console.log("port connected")
})