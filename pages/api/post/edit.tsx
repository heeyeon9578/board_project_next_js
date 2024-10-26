import { connectDB } from "@/util/database";
import Post from "../../../src/util/types";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
    if(req.method === "POST"){
        console.log(req.body);
        
  
        if(req.body.title ===''){
            return res.status(500).json("제목을 입력하세요");
        }else if(req.body.content ===''){
            return res.status(500).json("내용을 입력하세요");
        }

        let changeData = {title: req.body.title , content: req.body.content};
        try{
            const db = (await connectDB).db("forum");
            let result = await db.collection('post').updateOne({_id: new ObjectId(req.body._id.toString())},
                 { $set : changeData} );
            return res.redirect(302, '/list')
        }catch(error){
            return res.status(500).json(`${error}`);
        }
       
       
      

    }
   
}