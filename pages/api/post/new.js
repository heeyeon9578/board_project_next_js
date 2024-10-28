import { connectDB } from "@/util/database";
import Post from "../../../src/util/types";
import { getServerSession } from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import Session from '@/util/types';

export default async function handler(req, res){
    if(req.method === "POST"){
        
        
        let session = await getServerSession(req, res, authOptions);
        console.log(session.user.email);
        if(session){
            req.body.author = session.user.email;
        }
        if(req.body.title ===''){
            return res.status(500).json("제목을 입력하세요");
        }else if(req.body.content ===''){
            return res.status(500).json("내용을 입력하세요");
        }
       
        // let postData = 
        try{
            const db = (await connectDB).db("forum");
            let result = await db.collection('post').insertOne(req.body);
        }catch(error){
            return res.status(500).json(`${error}`);
        }
       
        return res.status(200).redirect(`/list`);
      

    }
   
}