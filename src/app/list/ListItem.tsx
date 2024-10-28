"use client";
import Link from "next/link"; // Next.js의 Link 컴포넌트를 사용
import Post from "../../../src/util/types";
import { useRouter } from "next/navigation";
export default function ListItem(props){
  const author = props.session?.user.email;
  const router = useRouter();
  const goToDetail = (id:string)=>{
    router.push(`/detail/${id}`);
  }
    // JSX 반환
  return (
    <div className="list-bg">
      {props.result.map((res, index) => (
        <div className="list-item" key={index} >
          <h4 onClick={()=>{goToDetail(res._id)}}>{res.title}</h4>
          <p onClick={()=>{goToDetail(res._id)}}>{res.content}</p>
         

          {res.author === author &&(
            <>
             <Link href={`/edit/${res._id}`}>🪄</Link> {/* Next.js의 Link는 href 사용 */}
             <span onClick={(e)=>{
            
              fetch(`/api/post/delete`, {
                  method:'DELETE',
                  body: res._id
              }).then((r)=>{
                 return r.json()
              }).then((r)=>{
                 console.log(r);
                 const target = e.target as HTMLElement;
                  target.parentElement!.style.opacity="0";
                  setTimeout(()=>{
                      target.parentElement!.style.display="none";
                  },1000)
              })
              // fetch(`/api/abc/123`)
            }}>🗑️</span>
            </>
          )}
         
        </div>
      ))}
    </div>
  );
}