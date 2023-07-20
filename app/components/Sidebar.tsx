import { PlusIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  return (
    <section className="h-screen w-[20rem] bg-[#000000] p-6">
      <h3 className="text-2xl font-semibold mt-6">Turtle Todos</h3>
      <div className="flex justify-between mt-10">
        <h6 className="text-gray-500 text-lg font-medium my-auto">
          Private Todos
        </h6>
        <button className="bg-gray-700 rounded-lg p-2">
          <PlusIcon className="h-5 w-5 font-medium" />
        </button>
      </div>
    </section>
  );
}
