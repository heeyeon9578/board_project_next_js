import { connectDB } from "@/util/database";
import Post from "../../src/util/types";

export default async function handler(req, res){
    if(req.method === "GET"){
        const db = (await connectDB).db("forum");
        let result: Post[] = await db.collection('post').find().toArray();
  
        console.log(result);
        return res.status(200).json(result);
    }
   
}