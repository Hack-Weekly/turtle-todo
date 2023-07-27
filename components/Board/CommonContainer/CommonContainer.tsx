import Categories from "./Categories";

export default function CommonContainer() {
    return (
        <div className="flex mt-10">
            <Categories category="Priority" />
            <Categories category="Ongoing" />
            <Categories category="Completed" />
        </div>
    )
}
