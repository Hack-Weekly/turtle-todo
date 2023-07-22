'use client'

import { useEffect, useState } from "react";
import PublicTodo from "../PublicTodo";
import Categories from "./Categories";
import { supabase_client } from "@/db/supabase";
import { Database } from "@/lib/db.types";

type NoteType = Database["public"]["Tables"]["notes"]["Row"]

export default function CommonContainer() {
    const [notes, setNotes] = useState<NoteType[] | null>([]);

    useEffect(() => {
      getTodos();
    }, []);

    async function getTodos() {
      const { data } = await supabase_client.from("notes").select();
      setNotes(data);
    }

    return (
        <div>
            <Categories />
            <div className="flex flex-wrap">
                {notes?.map(v => {
                    return <PublicTodo key={v.id} {...v} />
                })}
            </div>
        </div>
    )
}