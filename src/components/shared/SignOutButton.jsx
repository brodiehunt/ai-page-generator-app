"use client";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";

const SignOutButton = () => {
  return (
    <button
      type="button"
      onClick={() => signOut()}
      className="flex gap-2 items-center w-full py-2 px-4   rounded-lg  font-medium group transition-all duration-200 bg-red-500/5 hover:bg-red-500/10 text-red-500/80 hover:text-red-500"
    >
      <MdLogout className="w-6 h-6 transition-all duration-200 text-red-500/80 group-hover:text-red-500" />{" "}
      Sign out
    </button>
  );
};

export default SignOutButton;
