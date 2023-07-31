"use client";

import { supabase_client } from "@/db/supabase";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "./../components/Sidebar/Sidebar";
import Board from "@/components/Board/Board";
import { supabase } from "../api";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  // const getUserData = async () => {
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();
    // const user = await supabase.auth.getSession();


  //   const { data, error } = await supabase.auth.getSession();

  //   console.log(data);
  //   if (data.session) {
  //     console.log("user is sign in ");
  //   } else console.log("user is bitch");
  // };

  // // getUserData();
  // useEffect(() => {
  //   getUserData();
  // }, []);
  const router = useRouter()
  const [user,setUser] = useState<User|null>()
  const getUser = async()=>{
    const {data} = await supabase.auth.getUser()
    console.log('user',data.user);
    setUser(data.user)
}
    useEffect(()=>{
        getUser()
    },[])

  if(user===null){
    router.replace('/login')
  }

    const { data, error } = await supabase_client.auth.getSession();



  return (
    <>
    {user!==(null||undefined)?
      (<section className="flex">
      <Navbar user={user}/>
      <Sidebar />
    <section className="flex">
      <Navbar />
      {/* <Sidebar /> */}
      <Board />
      {/* <button onClick={getUserData}>push me </button> */}
    </section>):null}
    </>
  );
}
