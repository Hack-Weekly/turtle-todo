import PublicTodo from "../PublicTodo";
import Categories from "./Categories";

export default function CommonContainer() {
    return (
        <div>
            <Categories />
            <div className="flex flex-wrap">
                <PublicTodo />
                <PublicTodo />
                <PublicTodo />
                <PublicTodo />
                <PublicTodo />
            </div>
        </div>
    )
}
