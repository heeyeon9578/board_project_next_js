'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function DetailLink(){
    let router = useRouter();
    let a = usePathname();
    let b = useSearchParams();
    
    return(
        <button >버튼</button>
    )
}