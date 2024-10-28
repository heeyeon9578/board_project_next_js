import {connectDB} from "@/util/database";
export const revalidate = 60;

export default async function Home() {

  const db = (await connectDB).db("forum");
  let result = await db.collection('post').find().toArray();


  return (
    <div>
        <h4>404</h4>
      <h4>페이지가 존재하지 않습니다.</h4>
    </div>
  );
}
