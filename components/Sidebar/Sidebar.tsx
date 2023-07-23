import { Plus } from "lucide-react";
import { Button } from "../__shadcn/button";
import Note from "@/components/note/note";

const checklist = [
  {
    title: "Buy more coffee filters",
    checked: false,
  },
  {
    title: "Cancel Disney+",
    checked: false,
  },
  {
    title: "Donate to Unica",
    checked: false,
  },
];
export default function Sidebar() {
  return (
    <section className="w-[20rem] bg-[#000000] p-6 h-full">
      <h3 className="text-2xl font-semibold mt-6">Turtle Todos</h3>
      <div className="flex justify-between mt-10 mb-4">
        <h6 className="text-gray-500 text-lg font-medium my-auto">
          Private Todos
        </h6>
        <Button size="icon" className="bg-[#151515]">
          <Plus className="w-5" />
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        <Note title="Next hour" checklist={checklist} />
        <Note title="Today" checklist={checklist} />
        <Note title="Tomorrow" checklist={checklist} />
      </div>
    </section>
  );
}
