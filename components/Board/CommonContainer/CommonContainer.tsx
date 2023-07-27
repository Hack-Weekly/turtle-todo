import Categories from "./Categories";

export default function CommonContainer() {
    return (
        <div className="flex">
            <Categories category="Priority" />
            <Categories category="Ongoing" />
            <Categories category="Completed" />
        </div>
    )
}
