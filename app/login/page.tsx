"use client";

import { supabase } from "../../api";

import Logo_Big from "@/components/Logo/Logo_Big";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const router = useRouter();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };

  const handleSignIn = async (e: FormEvent) => {
    // e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword,
    });

    if (data.session) {
      router.push("/");
    } else {
      toast.error("account does not exist");
    }
  };

  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-10">
        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* <!-- Left column container with background--> */}
          <Logo_Big />

          {/* <!-- Right column container with form --> */}
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12 bg-black p-16 h-fit rounded-2xl">
            <div className="mb-4">
              <p className="text-4xl">Welcome Back!</p>
              <p className="text-lg">Start managing your tasks</p>
            </div>
            <form className="flex flex-col gap-4 ">
              <div className="relative ">
                <input
                  type="email"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-[#151515] px-3 py-[0.32rem] leading-[2.15] outline-none placeholder-white "
                  id="exampleFormControlInput3"
                  placeholder="Email address"
                  onChange={handleEmailChange}
                />
                <label
                  htmlFor="exampleFormControlInput3"
                  className="invisible"
                >
                  Email address
                </label>
              </div>

              {/* <!-- Password input --> */}
              <div className="relative ">
                <input
                  type="password"
                  className=" peer block min-h-[auto] w-full rounded border-0 bg-[#151515] px-3 py-[0.32rem] leading-[2.15] outline-none placeholder-white"
                  id="exampleFormControlInput33"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
                <label
                  htmlFor="exampleFormControlInput33"
                  className="invisible"
                >
                  Password
                </label>
              </div>

              {/* <!-- Submit button --> */}
              <button
                type="button"
                className="inline-block w-full rounded bg-[#994BFF] px-7 pb-2.5 pt-3 text-sm font-medium 
                 leading-normal text-white  "
                data-te-ripple-color="light"
                onClick={handleSignIn}
              >
                Log in
              </button>

              {/* <!-- Divider --> */}
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  OR
                </p>
              </div>

              {/* <!-- Social login buttons --> */}
              <div className="flex gap-4">
                <Link
                  className="mb-3 flex w-full items-center justify-center rounded bg-[#994BFF] px-7 pb-2.5 pt-3 text-center text-sm font-medium 
                   leading-normal text-white  "
                  href="#!"
                  role="button"
                  data-te-ripple-color="light"
                >
                  Google
                </Link>
                <Link
                  className="mb-3 flex w-full items-center justify-center rounded bg-[#994BFF] px-7 pb-2.5 pt-3 text-center text-sm font-medium 
                   leading-normal text-white  "
                  href="#!"
                  role="button"
                  data-te-ripple-color="light"
                >
                  GitHub
                </Link>
              </div>

              <div className="flex mt-3 justify-center gap-3">
                <p>Don’t have an Account?</p>
                <Link href="/signup" className="text-blue-500">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
