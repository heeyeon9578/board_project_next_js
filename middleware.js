import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
    const session = await getToken({req:request});
//   console.log(request.nextUrl)  //유저가 요청중인 URL 출력해줌
//   console.log(request.cookies)  //유저가 보낸 쿠키 출력해줌
//   console.log(request.headers)  //유저의 headers 정보 출력해줌 
//   NextResponse.next()  //통과
//   NextResponse.redirect()  //다른페이지 이동
//   NextResponse.rewrite()  //다른페이지 이동

    // request.cookies.get('쿠키이름')  //출력
    // request.cookies.has('쿠키이름')  //존재확인
    // request.cookies.delete('쿠키이름')  //삭제

    // if(request.nextUrl.pathname==='/list'){
        
    //     console.log(`request.headers`,new Date(),request.headers.get('sec-ch-ua-platform')); //사파리는 불가, 현재 os 정보 출력
    //     return NextResponse.next(); 
    // }

    // if(request.nextUrl.pathname==='/write'){
        
    //     if(session===null){
    //         return NextResponse.redirect(`${process.env.BASE_URL}/api/auth/signin`); 
    //     }
        
    // }
} 