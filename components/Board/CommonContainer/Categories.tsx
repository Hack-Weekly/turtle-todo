"use client";

import { useEffect, useState } from "react";
import { supabase_client } from "@/db/supabase";
import { Database } from "@/lib/db.types";
import PublicTodo from "@/components/Todos/PublicTodo";

type TodoType = Database["public"]["Tables"]["todos"]["Row"];

export default function Categories({ category }: { category: string }) {
  const [todos, setTodos] = useState<TodoType[] | null>([]);

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    const { data } = await supabase_client.from("todos").select();
    setTodos(data);
  }

  return (
    <div className="border-gray-800 border-r-2 mr-10">
      <p className="w-full text-left mb-4 opacity-50">{category}</p>
      <div className="flex flex-col justify-left pr-10">
        {todos?.map((v) => {
          return <PublicTodo key={v.id} {...v} />;
        })}
      </div>
    </div>
  );
}
