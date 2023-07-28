import Link from 'next/link'
import CommonContainer from './CommonContainer/CommonContainer'

export default function Board() {
    return (
        <section className='w-screen p-8'>
            <div className="flex justify-between">
                <h1 className="text-4xl font-semibold">Public Board</h1>
                <Link
                    href="/note/new"
                    className="bg-[#994BFF] rounded-sm flex items-center text-sm font-semibold px-3 border-[#994BFF] border hover:text-[#994BFF] hover:bg-white">
                    Create new Note
                </Link>
            </div>
            <CommonContainer />
        </section>
    )
}
