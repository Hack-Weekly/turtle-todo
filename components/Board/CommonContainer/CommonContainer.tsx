"use client";

import { useEffect, useState } from "react";
import PublicTodo from "../PublicTodo";
import Categories from "./Categories";
import { supabase_client } from "@/db/supabase";
import { Database } from "@/lib/db.types";

type NoteType = Database["public"]["Tables"]["todos"]["Row"];

export default function CommonContainer() {
  const [todos, setTodos] = useState<NoteType[] | null>([]);

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    const { data } = await supabase_client.from("todos").select();
    setTodos(data);
  }

  return (
    <div>
      <Categories />
      <div className="flex flex-wrap">
        {todos?.map((v) => {
          return <PublicTodo key={v.id} {...v} />;
        })}
      </div>
    </div>
  );
}
