import logoImg from "@/public/logo.svg";
import Image from 'next/image'

export default function Logo_Big() {
    return (
        <div className="flex mb-12 md:mb-0 md:w-8/12 lg:w-5/12">
            <Image
                src={logoImg}
                width={100}
                height={100}
                className="w-full"
                alt="some image"
            />
        </div>
    )
}
