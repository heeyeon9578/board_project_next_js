import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";
export default async function handler(req, res){
    if(req.method === "POST"){
        
        let session = await getServerSession(req, res, authOptions);
        req.body = JSON.parse(req.body);
        console.log(req.body);
        if(!session){
            return res.status(400).json(`로그인이 필요합니다.`);
        }
        console.log(`
            
            req.body.comment :${req.body.comment}
            
            `)
        let data = {
            content: req.body.comment,
            parentId:new ObjectId(req.body.parentId),
            author: session.user.email,
        }

        if(req.body.comment ===''){
            return res.status(500).json("내용을 입력하세요");
        }
       
        try{
            const db = (await connectDB).db("forum");
            let result = await db.collection('comment').insertOne(data);
            return res.status(200).json(data);
        }catch(error){
            return res.status(500).json(`${error}`);
        }
       
        
      

    }
   
}