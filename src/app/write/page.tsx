export default function Write(){
    return (
      <div>
        <h4>글작성</h4>
        <form action="/api/post/new" method="POST">
          <input name="title" placeholder="글 제목 입력하세요"></input>
          <input name="content"  placeholder="글 내용 입력하세요"></input>
          <button type="submit">버튼</button>
        </form>
      </div>
    )
  }