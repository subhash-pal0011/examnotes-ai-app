"use client";
import React, { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("100");

  const handlePayment = async (amount) => {
    try {
      const res = await axios.post("/api/credit", { amount });

      const data = res.data;

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.info(data?.message || "Payment Failed")
      }

    } catch (error) {
      console.error("Payment Error:", error.response?.data || error);
      alert(error.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-300 flex flex-col items-center justify-center relative overflow-auto">

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 absolute top-4 left-4 px-4 py-2 cursor-pointer"
      >
        <IoArrowBackOutline size={22} />
        <span className="text-sm font-medium">Back</span>
      </button>


      <div className="md:mt-1 mt-15 space-y-5">
        {/* Heading */}
        <div className="text-center">
          <h1 className="font-semibold text-2xl text-gray-900">
            Buy Credits
          </h1>
          <p className="text-sm text-gray-700">
            Choose a plan that fits your study needs
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          <div onClick={() => setSelectedPlan("100")}
            className={`rounded shadow p-5 w-80 cursor-pointer ${selectedPlan === "100"
              ? "border border-blue-500 bg-blue-50"
              : "border border-gray-300 bg-white"
              }`}>
            <p className="font-semibold text-lg">Starter</p>
            <p className="text-sm text-gray-600 mb-3">
              Perfect for quick revision
            </p>

            <div className="flex items-center gap-1 text-xl font-bold mb-3">
              <span>₹</span>
              <span>100</span>
            </div>

            <button onClick={() => handlePayment(100)}
              className={`w-full cursor-pointer ${selectedPlan === "100" ? "bg-blue-500" : "bg-black"} transition-all duration-300 text-white py-2 rounded-lg hover:bg-gray-800  mb-4`}>
              Buy Now
            </button>

            <div className="space-y-2 text-sm">
              {[
                "Generate AI notes",
                "Exam-focused answers",
                "Diagram & chart support",
                "Fast generation",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <img
                    src="/check.gif"
                    className="h-5 w-5"
                    alt="check"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div onClick={() => setSelectedPlan("200")}
            className={`rounded shadow p-5 w-80 cursor-pointer ${selectedPlan === "200"
              ? "border border-blue-500 bg-blue-50"
              : "border border-gray-300 bg-white"
              }`}>
            <p className="font-semibold text-lg">Starter</p>
            <p className="text-sm text-gray-600 mb-3">
              Perfect for quick revision
            </p>

            <div className="flex items-center gap-1 text-xl font-bold mb-3">
              <span>₹</span>
              <span>200</span>
            </div>

            <button onClick={() => handlePayment(200)}
              className={`w-full cursor-pointer ${selectedPlan === "200" ? "bg-blue-500" : "bg-black"} transition-all duration-300 text-white py-2 rounded-lg hover:bg-gray-800  mb-4`}>
              Buy Now
            </button>

            <div className="space-y-2 text-sm">
              {[
                "All Starter feature",
                "More Credits Per ₹",
                "Revision mode access",
                "Priority Ai responce",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <img
                    src="/check.gif"
                    className="h-5 w-5"
                    alt="check"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div onClick={() => setSelectedPlan("500")}
            className={`rounded shadow p-5 w-80 cursor-pointer ${selectedPlan === "500"
              ? "border border-blue-500 bg-blue-50"
              : "border border-gray-300 bg-white"
              }`}>

            <p className="font-semibold text-lg">Starter</p>
            <p className="text-sm text-gray-600 mb-3">
              Perfect for quick revision
            </p>

            <div className="flex items-center gap-1 text-xl font-bold mb-3">
              <span>₹</span>
              <span>500</span>
            </div>

            <button onClick={() => handlePayment(500)}
              className={`w-full cursor-pointer ${selectedPlan === "500" ? "bg-blue-500" : "bg-black"} transition-all duration-300 text-white py-2 rounded-lg hover:bg-gray-800  mb-4`}>
              Buy Now
            </button>

            <div className="space-y-2 text-sm">
              {[
                "Maximum credit value",
                "Unlimited revisions",
                "Chart & daigrams",
                "Ideal for full syllabus",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <img
                    src="/check.gif"
                    className="h-5 w-5"
                    alt="check"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Page;
