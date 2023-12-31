"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import Logo_Big from "@/components/Logo/Logo_Big";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Database } from "@/lib/db.types";
import { supabase } from "../../api";
import { toast } from "react-hot-toast";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const router = useRouter();

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };

  const handleSignUp = async () => {
    const email = userEmail;
    const password = userPassword;

    // await createClientComponentClient().auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     emailRedirectTo: `${location.origin}/auth/callback`,
    //   },
    // });
    // router.refresh();
    // console.log("done");

    const { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
      options: {
        data: {
          first_name: userName,
        },
      },
    });

    if (data.session) {
      router.push("/login");
    } else {
      console.log(error);
      toast.error("something went wrong | check details | try again");
    }
  };

  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* <!-- Left column container with background--> */}
          <Logo_Big />

          {/* <!-- Right column container with form --> */}
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12 bg-black p-16 h-fit rounded-2xl ">
            <div className="mb-4">
              <p className="text-4xl">Create an Account</p>
              <p className="text-lg">Start managing your tasks</p>
            </div>
            <form
              className="flex flex-col gap-4 "
              // this function stop form default behavior
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="relative ">
                <input
                  type="text"
                  className=" peer block min-h-[auto] w-full rounded border-0 bg-[#151515] px-3 py-[0.32rem] leading-[2.15] outline-none placeholder-white"
                  id="username"
                  placeholder="User Name "
                  onChange={handleUserNameChange}
                />
                <label htmlFor="username" className="invisible">
                  Name
                </label>
              </div>

              <div className="relative ">
                <input
                  type="email"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-[#151515] px-3 py-[0.32rem] leading-[2.15] outline-none placeholder-white "
                  id="useremail"
                  placeholder="Email address"
                  onChange={handleEmailChange}
                />
                <label htmlFor="useremail" className="invisible">
                  Email address
                </label>
              </div>

              {/* <!-- Password input --> */}
              <div className="relative ">
                <input
                  type="password"
                  className=" peer block min-h-[auto] w-full rounded border-0 bg-[#151515] px-3 py-[0.32rem] leading-[2.15] outline-none placeholder-white"
                  id="userpassword"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
                <label htmlFor="userpassword" className="invisible">
                  Password
                </label>
              </div>

              {/* <!-- Submit button --> */}
              <button
                type="submit"
                className="inline-block w-full rounded bg-[#994BFF] px-7 pb-2.5 pt-3 text-sm font-medium 
                 leading-normal text-white  "
                data-te-ripple-color="light"
                onClick={handleSignUp}
              >
                Create an Account
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
                   leading-normal text-white "
                  href="#!"
                  role="button"
                  data-te-ripple-color="light"
                >
                  GitHub
                </Link>
              </div>

              <div className="flex mt-3 justify-center gap-3">
                <p>Already have an Account?</p>
                <Link href="/login" className="text-blue-500">
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
