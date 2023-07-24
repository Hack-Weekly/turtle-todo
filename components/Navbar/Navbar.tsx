import Image from "next/image";

export default function Navbar() {
    return (
        <section className="flex flex-col items-center px-2 py-4">
            <Image src="/logo.png" width={50} height={50} alt="turtle-todo" className="mb-8" />
            <h1>Auth</h1>
        </section>
    )
}
