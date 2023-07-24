import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <section className="flex flex-col items-center h-screen p-4 border-r-2 border-gray-800">
            <div className="flex items-center">
                <Image src="/logo.png" width={50} height={50} alt="turtle-todo" className="" />
                <h3 className="text-2xl font-semibold ml-2 text-[#994BFF]">Turtle Todos</h3>
            </div>
            <Link href="/login" className="flex items-center mt-8 rounded-md border-2 border-transparent hover:border-[#994bff75] w-full">
                <Image src="/user.png" width={50} height={50} alt="turtle-todo" className="p-3" />
                <h3 className="text-lg m-2">Login/Signup</h3>
            </Link>
        </section >
    )
}
