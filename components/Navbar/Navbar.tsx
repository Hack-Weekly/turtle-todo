'use client'

import { supabase_client } from "@/db/supabase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const {data}= await supabase_client.auth.getUser();

            setIsAuth(data.user?.aud === "authenticated")
        }

        fetchData();
    }, []) 

    return (
        <section className="flex flex-col items-center h-screen w-3/12 p-4 border-r-2 border-gray-800 sticky top-0">
            <div className="flex items-center">
                <Image src="/logo.png" width={50} height={50} alt="turtle-todo" className="" />
                <h3 className="text-2xl font-semibold ml-2 text-[#994BFF]">Turtle Todos</h3>
            </div>
            {isAuth === false && (
                <Link href="/login" className="flex items-center mt-8 rounded-md border-2 border-transparent hover:border-[#994bff75] w-full">
                    <Image src="/user.png" width={50} height={50} alt="turtle-todo" className="p-3" />
                    <h3 className="text-lg m-2">Login/Signup</h3>
                </Link>
            )}
            <div>
                <button className="flex items-center mt-8 rounded-md border-2 border-transparent hover:border-[#994bff75] w-full" onClick={async () => {
                    const {error} = await supabase_client.auth.signOut();
                    if(error) {
                        toast.error(error.message);
                        return;
                    }
                    router.push('/login') 
                }}>Logout</button>
            </div> 
        </section >
    )
}
