import Image from "next/image";
import Link from "next/link";

export default function PublicTodo() {
    return (
        <div className="flex flex-col bg-black w-[15rem] h-[10rem] rounded-md ml-0 m-4 my-2 p-3 border-transparent border-2 cursor-grab hover:border-[#404040] hover:border-2">
            <Link href="/" className="text-[#994BFF] text-lg w-fit">Todo title</Link>
            <div className="mt-2 text-[#727272] text-md flex-grow">5 tasks</div>
            <div className="flex justify-end items-center w-full">
                <div className="mr-2 text-xs">20th July 2023</div>
                <Link href="/">
                    <Image src="/logo.png" width={25} height={25} alt="profile-pic" />
                </Link>
            </div>
        </div>
    )
}
