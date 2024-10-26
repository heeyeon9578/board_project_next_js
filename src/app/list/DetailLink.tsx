'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function DetailLink(){
    let router = useRouter();
    let a = usePathname();
    let b = useSearchParams();
    
    return(
        <button onClick={()=>{router.push(`/detail/123`)}}>버튼</button>
    )
}