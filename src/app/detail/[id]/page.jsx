import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

// `params`는 컴포넌트의 속성으로 제공되므로 비동기 함수로 설정
export default async function Detail({ params }) {
  const postId = params.id;

  // MongoDB ObjectId 유효성 검사
  if (!ObjectId.isValid(postId)) {
    return (
      <div>
        <h4>잘못된 게시물 ID입니다.</h4>
      </div>
    );
  }

  try {
    // 데이터베이스 연결 및 데이터 가져오기
    const db = (await connectDB).db("forum");
    const result = await db.collection("post").findOne({ _id: new ObjectId(postId) });

    if (!result) {
      return (
        <div>
          <h4>게시물을 찾을 수 없습니다.</h4>
        </div>
      );
    }

    // JSX 반환
    return (
      <div>
        <h4>상세페이지</h4>
        <h4>{result.title}</h4>
        <p>{result.content}</p>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return (
      <div>
        <h4>오류가 발생했습니다.</h4>
      </div>
    );
  }
}
