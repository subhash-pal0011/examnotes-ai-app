"use client";
import { signOut, useSession } from "next-auth/react";

const LogoutButton = () => {
       const { data: session} = useSession();
       console.log("session :" ,session)
       return (
              <button
                     onClick={() => signOut({redirect: true, callbackUrl: "/register" })} // redirect after logout
                     className="bg-red-500 text-white px-4 py-2 rounded"
              >
                     Logout
              </button>
       );
};

export default LogoutButton;

