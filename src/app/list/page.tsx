import { connectDB } from "@/util/database";
import ListItem from "./ListItem";
import Post from "../../../src/util/types";

export const dynamic = "force-dynamic";

export default async function List() {
  // 데이터베이스 연결 및 데이터 가져오기
  const db = (await connectDB).db("forum");
  let result = await db.collection('post').find().toArray();

  // _id 값을 문자열로 변환
  const postsWithStringId = result.map((post) => ({
    ...post,
    _id: post._id.toString() // ObjectId를 문자열로 변환
  }));

  // ListItem에 변환된 데이터를 전달
  return (
    <ListItem result={postsWithStringId}></ListItem>
  );
}
