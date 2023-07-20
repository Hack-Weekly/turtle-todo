import CommonContainer from './CommonContainer/CommonContainer'
import PriorityContainer from './PriorityContainer/PriorityContainer'

export default function Board() {
    return (
        <section className='p-8'>
            <h1 className='text-4xl font-semibold'>Public Board</h1>
            <PriorityContainer />
            <CommonContainer />
        </section>
    )
}
