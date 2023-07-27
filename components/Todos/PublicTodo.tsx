import Image from "next/image";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent } from "../__shadcn/popover";
import { FormEvent, useState } from "react";
import { supabase_client } from "@/db/supabase";
import { toast } from "react-hot-toast";
import { revalidatePath } from "next/cache";
import { Input } from "../__shadcn/input";
import { Textarea } from "../__shadcn/textarea";
import { DatePicker } from "../__shadcn/date-picker";
import { Combobox } from "../__shadcn/combo-box";
import { Button } from "../__shadcn/button";
import { useRouter } from "next/router";
type PublicTodoType = {
  id: string;
  title: string;
  created_at: string;
};

export default function PublicTodo(props: PublicTodoType) {
  const date = new Date(props.created_at).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [dueDate, setDueDate] = useState<Date | undefined>();

  const STATUS = [
    {
      value: "todo",
      label: "Todo",
    },
    {
      value: "inprogress",
      label: "InProgress",
    },
    {
      value: "done",
      label: "Done",
    },
  ];

  const PRIORITIES = [
    {
      value: "low",
      label: "Low",
    },
    {
      value: "medium",
      label: "Medium",
    },
    {
      value: "high",
      label: "High",
    },
    {
      value: "urgent",
      label: "Urgent",
    },
  ];
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { error, data } = await supabase_client
      .from("todos")
      .update({
        title,
        description,
        priority,
        status,
        owner_id: "6ae6ed17-26c6-4da0-8ee2-5561a4f36515", //temprorily hardcoded
        start_date: startDate!.toUTCString(),
        due_date: dueDate!.toUTCString(),
      })
      .eq("id", props.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Todo successfully updated 🎉");
    window.location.reload();

  };
  return (
    <Popover>
      <div className="flex flex-col bg-black w-[15rem] h-[10rem] mb-6 p-4 rounded-md border-transparent border-2 cursor-grab hover:border-[#404040] hover:border-2">
        <PopoverTrigger className="text-[#994BFF] text-lg w-fit">
          {props.title}
        </PopoverTrigger>
        <PopoverContent className="bg-[#151515] text-white border-gray-700 w-max">
          <div className="grid gap-4">
            <h4 className="font-medium leading-none">Update Todo</h4>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Input
                className="bg-[#312d2d] text-white border-none outline-none ring-gray-800"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <Textarea
                className="bg-[#312d2d] text-white border-none outline-none ring-gray-800"
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <DatePicker date={startDate} setDate={setStartDate} />
              <DatePicker date={dueDate} setDate={setDueDate} />
              <Combobox
                commandMessage="Priority"
                value={priority}
                setValue={setPriority}
                data={PRIORITIES}
              />
              <Combobox
                commandMessage="Status"
                value={status}
                setValue={setStatus}
                data={STATUS}
              />
              <div>
                <Button
                  type="submit"
                  className="bg-[#994bff] text-white w-32 border border-[#994bff] hover:bg-white hover:text-[#994bff]">
                  Update
                </Button>
              </div>
            </form>
          </div>
        </PopoverContent>
        <div className="mt-2 text-[#727272] text-md flex-grow">5 tasks</div>
        <div className="flex justify-end items-center w-full">
          <div className="mr-2 text-xs">{date}</div>
          <Link href="/">
            <Image src="/logo.png" width={25} height={25} alt="profile-pic" />
          </Link>
        </div>
      </div>
    </Popover>
  );
}
