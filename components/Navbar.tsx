import Image from "next/image";

export default function Navbar() {
    return (
        <section className="px-2 py-4">
            <Image src="/logo.png" width={50} height={50} alt="turtle-todo" />
        </section>
    )
}
