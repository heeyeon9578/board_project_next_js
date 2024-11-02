import Link from "next/link";

import './globals.css';
import LoginBtn from "./loginButton";
import LogoutBtn from "./logoutButton";
import { getServerSession } from "next-auth";
import {authOptions} from "../../pages/api/auth/[...nextauth]";
import Session from '../util/types';

import DarkModeBtn from './darkmodebtn';
import { cookies } from "next/headers";

export const metadata = {
  title:'create next app',
  description:"sdfs"
}


export default async function RootLayout({ children }) {

  let session = await getServerSession(authOptions);
  const themeCookie = cookies().get("theme")?.value || "light";
  const isDarkMode = themeCookie === "dark";
  return (
    <html lang="en">
      <head />
      <body className={isDarkMode ? "dark" : "light"}>
      <div className="navbar"> 
        <Link href="/" className="logo">방명록</Link> 
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
        <DarkModeBtn mode={isDarkMode}></DarkModeBtn>
      </div>  
        {children}
      </body>
    </html>
  )
}