import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Post from "../../../util/types";




export default async function Edit({ params }) {

    const postId = params.id;

    // MongoDB ObjectId 유효성 검사
    if (!ObjectId.isValid(postId)) {
      return (
        <div>
          <h4>잘못된 게시물 ID입니다.</h4>
        </div>
      );
    }

    // 데이터베이스 연결 및 데이터 가져오기
    const db = (await connectDB).db("forum");
    const result = await db.collection('post').findOne({ _id: new ObjectId(postId.toString()) });

    

    if (!result) {
      return (
        <div>
          <h4>게시물을 찾을 수 없습니다.</h4>
        </div>
      );
    }

    return (
      <div className="p-20">
        <h4>수정페이지</h4>
        <form action="/api/post/edit" method="POST">
        <input name="_id"  style={{display:'none'}}  defaultValue={result._id.toString()} />
          <input name="title" placeholder="제목을 입력해주세요" defaultValue={result.title}/>
          <input name="content"  placeholder="내용을 입력해주세요"  defaultValue={result.content} />
          <button type="submit">전송</button>
        </form>
      </div>
    )
  } 
