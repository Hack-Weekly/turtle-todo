"use client";

import { useEffect, useState } from "react";
import { supabase_client } from "@/db/supabase";
import { Database } from "@/lib/db.types";

import Categories from "./Categories";
import PublicTodo from "@/components/Todos/PublicTodo";

type TodoType = Database["public"]["Tables"]["todos"]["Row"]

export default function CommonContainer() {
    const [todos, setTodos] = useState<TodoType[] | null>([]);

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
                {todos?.map(v => {
                    return <PublicTodo key={v.id} {...v} />
                })}
                 
            </div>
        </div>
    )
}
