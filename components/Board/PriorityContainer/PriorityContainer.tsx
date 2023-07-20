import PublicTodo from "../PublicTodo";

export default function PriorityContainer() {
    return (
        <div>
            <div className="mt-6 mb-2 text-lg font-semibold opacity-75">Priority</div>
            <div className="flex flex-wrap">
                <PublicTodo />
                <PublicTodo />
                <PublicTodo />
            </div>
        </div>
    )
}
