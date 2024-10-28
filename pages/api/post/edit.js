import { connectDB } from "@/util/database";
import Post from "../../../src/util/types";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import {authOptions} from "../auth/[...nextauth]";

export default async function handler(req, res){
    if(req.method === "POST"){
        console.log(req.body);
        let session = await getServerSession(req, res, authOptions);
  
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

                 console.log(`${session.user.email}
                    
                    
                    
                    
                    
                    
                   
               
                    
                    
                    
                    ${req.body.author}
                    
                    
                    
                    `,req.body)
            if(session.user.email === req.body.author){
               return res.redirect(302, '/list')
            }else{
               res.status(500).json(`글 작성자와 글 수정자가 일치하지 않습니다.`);
            }
         
        }catch(error){
            return res.status(500).json(`${error}`);
        }
       
       
      

    }
   
}