"use client";
import Link from "next/link"; // Next.js의 Link 컴포넌트를 사용
import Post from "../../../src/util/types";
export default function ListItem(props){
    // JSX 반환
  return (
    <div className="list-bg">
      {props.result.map((res, index) => (
        <div className="list-item" key={index}>
          <h4>{res.title}</h4>
          <p>{res.content}</p>
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
        </div>
      ))}
    </div>
  );
}