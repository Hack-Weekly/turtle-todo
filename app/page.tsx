"use client";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "./../components/Sidebar/Sidebar";
import Board from "@/components/Board/Board";
import { supabase } from "../api";
import { useEffect } from "react";

export default function Page() {
  const getUserData = async () => {
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();
    // const user = await supabase.auth.getSession();

    const { data, error } = await supabase.auth.getSession();

    console.log(data);
    if (data.session) {
      console.log("user is sign in ");
    } else console.log("user is bitch");
  };

  // getUserData();
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <section className="flex">
      <Navbar />
      <Sidebar />
      <Board />
      {/* <button onClick={getUserData}>push me </button> */}
    </section>
  );
}
