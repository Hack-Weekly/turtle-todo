import Image from "next/image";
import Link from "next/link";

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

  return (
    <div className="flex flex-col bg-black w-[15rem] h-[10rem] rounded-md ml-0 m-4 my-2 p-3 border-transparent border-2 cursor-grab hover:border-[#404040] hover:border-2">
      <Link
        href={`/notes/${props.id}`}
        className="text-[#994BFF] text-lg w-fit">
        {props.title}
      </Link>
      <div className="mt-2 text-[#727272] text-md flex-grow">5 tasks</div>
      <div className="flex justify-end items-center w-full">
        <div className="mr-2 text-xs">{date}</div>
        <Link href="/">
          <Image src="/logo.png" width={25} height={25} alt="profile-pic" />
        </Link>
      </div>
    </div>
  );
}
