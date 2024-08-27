
import { createClient } from "redis";
const client = createClient();


async function processSubmission(submission:string)
{
    const {pid , code , language } = JSON.parse(submission);
    console.log(`Processing submission from problemid ${pid}`)
    console.log(`Processing submission from Code ${code}`)
    console.log(`Processing submission from language ${language}`)

    await new Promise(resolve=> setTimeout(resolve,1000));
    console.log(`Finished processing submission for problemid ${pid}`)

}


async function startWorker (){
    try{
        await client.connect();
        console.log("Woker Connected")
        while (true){
            try{
                const submission = await client.brPop("problems",0);
                //@ts-ignore
                await processSubmission(submission.element);
            }
            catch(error){
                console.log("Error Processing Submission")
            }
        }
    }
    catch(e){
        console.log("Failed to connect to Redis")
    }
}

startWorker();