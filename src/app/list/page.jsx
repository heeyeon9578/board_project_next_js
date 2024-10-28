import { connectDB } from "@/util/database";
import ListItem from "./ListItem";
import Post from "../../util/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
export const dynamic = "force-dynamic";

export default async function List() {
  // 데이터베이스 연결 및 데이터 가져오기
  const db = (await connectDB).db("forum");
  let result = await db.collection('post').find().toArray();
  let session = await getServerSession(authOptions);
  
  // _id 값을 문자열로 변환
  const postsWithStringId = result.map((post) => ({
    ...post,
    _id: post._id.toString() // ObjectId를 문자열로 변환
  }));

  // ListItem에 변환된 데이터를 전달
  return (
    <ListItem result={postsWithStringId} session={session}></ListItem>
  );
}
