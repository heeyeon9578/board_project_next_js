export default function Login(){
    return (
      <div>
        <h4>로그인</h4>
        <form action="/api/auth" method="POST">
          <input name="title" placeholder="아이디"></input>
          <input name="content"  placeholder="비밀번호"></input>
          <button type="submit">버튼</button>
        </form>
      </div>
    )
  }