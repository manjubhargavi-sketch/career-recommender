const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/career")
.then(()=>{
  console.log("mongodb connected");
}).catch(()=>{
    console.log('failed');
})

const newShema=new mongoose.Schema({
    hobby:{
        type:String,
     
    },
    group:{
        type:String,
        
     
    },
    percentile:{
        type:String,
      
        
    },
    subject:{
        type:String,
       
     
      
    },
    strength:{
        type:String,
        

    },
    weakness:{
        type:String,
        
      
        
    }
});
const Quizdata=mongoose.model("Quizdata",newShema)
module.exports=Quizdata
