const express=require('express');
const app=express();


app.get('/',(req,res)=>{
    res.send({hi:'new build'});
});


const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log("Server has beeen start....")
})
