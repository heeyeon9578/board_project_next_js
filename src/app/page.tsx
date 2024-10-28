import {connectDB} from "@/util/database";
export const revalidate = 60;

export default async function Home() {

  const db = (await connectDB).db("forum");
  let result = await db.collection('post').find().toArray();


  return (
    <div>
      <h4>오늘도 개발 공부 힘내자!</h4>
    </div>
  );
}
