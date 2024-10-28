import { getServerSession } from "next-auth";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";
import Link from 'next/link'
import LoginBtn from "../loginButton";
export default async function Write(){

  let session = await getServerSession(authOptions);
  
    return (
      <div>
        <h4>글작성</h4>
        {session ? (
          <form action="/api/post/new" method="POST">
            <input name="title" placeholder="글 제목 입력하세요"></input>
            <input name="content"  placeholder="글 내용 입력하세요"></input>
            <button type="submit">버튼</button>
          </form>
        ):(
          <>
            <div>로그인 후 사용해주세요!</div>
            <LoginBtn>
            </LoginBtn>
          </>
        )}
        
      </div>
    )
  }