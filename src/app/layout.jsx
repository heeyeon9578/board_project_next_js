import Link from "next/link";
import './globals.css';
import LoginBtn from "./loginButton";
import LogoutBtn from "./logoutButton";
import { getServerSession } from "next-auth";
import {authOptions} from "../../pages/api/auth/[...nextauth]";
import Session from '../util/types';

export const metadata = {
  title:'create next app',
  description:"sdfs"
}


export default async function RootLayout({ children }) {

  let session = await getServerSession(authOptions);
  console.log(session);
  return (
    <html lang="en">
      <head />
      <body>
      <div className="navbar"> 
        <Link href="/" className="logo">Appleforum</Link> 
        {session? 
        (
          <>
          <span>{session.user.name}</span>
          <LogoutBtn></LogoutBtn>
          </>
        )

        :
        
        (
        
        <>
        <LoginBtn></LoginBtn>
        <Link href="/register">회원가입</Link> 
        </>
        


        )}
      
        <Link href="/list">List</Link> 
        <Link href="/write">Write</Link> 
      </div>  
        {children}
      </body>
    </html>
  )
}