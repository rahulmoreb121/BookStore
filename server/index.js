import express from "express";

const app = express();

app.get('/',(req,res,next)=>{
    return res.send("Hello")
})

app.listen(3000,()=>{
    console.log("running on port 3000");
})