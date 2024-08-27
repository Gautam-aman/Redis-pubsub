import express from "express"
import { startSession } from "mongoose";
import { createClient } from "redis"

const app = express();
app.use(express.json());

const client = createClient();



app.post("/submit" , async(req,res)=>{
    const {pid , code , language }= req.body;
    try{
       await  client.lPush("submissions" , JSON.stringify({pid, code, language}));
    res.json ({
        message : "Submission Recieved"
    })
        console.error("Error submitting")
        res.status(500).json({
            message : "Error submitting"
        })
    }
    catch(e){

    }
})

async function startServer(){
    try{
        await client.connect();
        console.log("Connected to Redis")
        app.listen(3000,()=>{
            console.log("Server is Running on port 3000")
        })
    }
    catch(error) {
        console.log("Error connecting redis", error)

    }
}

startServer();