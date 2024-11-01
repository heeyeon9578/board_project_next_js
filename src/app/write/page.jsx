"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoginBtn from "../loginButton";
import InsertImg from "./insertImg";

export default function Write() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await fetch("/api/session");
                if (res.ok) {
                    const data = await res.json();
                    setSession(data);
                } else {
                    setSession(null);
                }
            } catch (error) {
                console.error("Failed to fetch session:", error);
                setSession(null);
            }
        };

        fetchSession();
    }, []);

    return (
        <div>
            <h4>글작성</h4>
            {session ? (
                <InsertImg />
            ) : (
                <>
                    <div>로그인 후 사용해주세요!</div>
                    <LoginBtn />
                </>
            )}
        </div>
    );
}
