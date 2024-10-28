'use client';
import { useEffect, useState, useRef } from "react";
export default function Comment(props){
    let [comment, setComment] = useState('');
    const parentId = props.parentId;
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(true);
    const commentsEndRef = useRef(null);
    // 스크롤을 끝으로 이동시키는 함수
    const scrollToBottom = () => {
        commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(()=>{

        
        fetch(`/api/comment/list?parentId=${parentId}`)
        .then(r=> r.json())
        .then((result)=>{
            console.log(result)
            setData(result);
            setLoading(false);
            
        })
        
    },[]);
    return(
        <div>
            <div>댓글</div>
            <input  value={comment}   onChange={(e)=>{setComment(e.target.value)}}></input>
            <button onClick={()=>{
               
                fetch('/api/comment/new', {
                    method: 'POST',
                     body:JSON.stringify({
                        comment: comment,
                        parentId: parentId
                     })
                }).then(r=> r.json()).then((result)=>{
                    console.log(result);
                    setData([...data, result])
                    setComment('');
                    scrollToBottom();  // 댓글 로드 후 스크롤 이동
                })
            }}>댓글전송</button>
            
            {!loading&& data.length>0 && data.map((x,i)=>{
                return(
                    <p key = {i} >{x.content}</p>
                    
                )
                
            })}
             {/* 이 요소로 스크롤이 이동함 */}
             <div ref={commentsEndRef} />
         </div>
    )
}