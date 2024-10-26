import { connectDB } from "@/util/database";
import Post from "../../../src/util/types";

export default async function handler(req, res){
    if(req.method === "POST"){
        console.log(req.body);
        
  
        if(req.body.title ===''){
            return res.status(500).json("제목을 입력하세요");
        }else if(req.body.content ===''){
            return res.status(500).json("내용을 입력하세요");
        }


        try{
            const db = (await connectDB).db("forum");
            let result: Post[] = await db.collection('post').insertOne(req.body);
        }catch(error){
            return res.status(500).json(`${error}`);
        }
       
        return res.status(200).redirect(`/list`);
      

    }
   
}