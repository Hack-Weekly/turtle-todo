'use client'
import { supabase } from "@/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({user}) {
    const router = useRouter()
    const signOutHandler=async()=>{
        await supabase.auth.signOut()
        router.replace('/login')
    }

    return (
        <section className="flex flex-col items-center h-screen w-3/12 p-4 border-r-2 border-gray-800 sticky top-0">
            <div className="flex items-center">
                <Image src="/logo.png" width={50} height={50} alt="turtle-todo" className="" />
                <h3 className="text-2xl font-semibold ml-2 text-[#994BFF]">Turtle Todos</h3>
            </div>
            <Image src="/user.png" width={50} height={50} alt="turtle-todo" className="p-3" />
            {user!==null?(<>
                <h3 className="text-lg m-2">{user?.email}</h3>
                <button onClick={signOutHandler}>Sign Out</button>
            </>):<Link href="/login" className="flex items-center mt-8 rounded-md border-2 border-transparent hover:border-[#994bff75] w-full">
                <h3 className="text-lg m-2">Login/Signup</h3>
            </Link>}
            
        </section >
    )
}
