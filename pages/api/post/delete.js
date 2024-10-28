import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import {authOptions} from "../auth/[...nextauth]";


export default async function handler(req, res) {
  if (req.method === "DELETE") {

    

    try {
      let session = await getServerSession(req, res, authOptions);
      console.log(session.user.email);
      const db = (await connectDB).db("forum");
      
      // MongoDB ObjectId로 변환하여 삭제
      let result = await db.collection("post").deleteOne({ _id: new ObjectId(req.body.toString()) });


      if(session.user.email === result.author){
         // 삭제가 성공적일 경우 JSON 응답 반환
         if (result.deletedCount === 1 ) {
          return res.status(200).json({ message: "삭제 완료!" });
        } else {
          return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
        }
      }else{
        return res.status(500).json({ message: "현재 유저와 작성자 불일치" });
      }
     
    } catch (error) {
      return res.status(500).json({ message: "서버 에러입니다!" });
    }
  }
}
