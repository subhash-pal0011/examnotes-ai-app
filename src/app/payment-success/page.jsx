"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-green-100 text-gray-600 gap-4 px-4">

      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-3"
      >
        <Image
          src="/check-2.gif"
          height={150}
          width={150}
          alt="success"
          priority
        />

        <p className="text-lg font-semibold text-center">
          Hi, Credit Placed Successfully 🎉
        </p>

        <p className="text-sm font-semibold text-blue-500 text-center">
          Get ready to enjoy 😊 at home!
        </p>

        <button
          onClick={() => router.push("/")}
          className="flex items-center justify-center border border-blue-400 px-4 py-2 rounded mt-5 cursor-pointer  bg-green-400 text-white"
        >
          <p className="text-sm font-semibold mr-2">
            Go to Notes
          </p>

          <Image
            src="/arrow.gif"
            alt="next"
            width={24}
            height={24}
          />
        </button>
      </motion.div>

    </div>
  );
};

export default Page;