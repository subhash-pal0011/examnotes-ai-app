import React from 'react'
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

const OtpPage = ({otpEmail , otpPassword}) => {

       const {
              register,
              handleSubmit,
              formState: { isSubmitting },
       } = useForm();

       const router = useRouter()

       const onSubmit = async (data) => {
              if (!otpEmail) {
                     toast.error("Email not Exist Plz Try Again");
                     return;
              }

              const otpString = Object.values(data.otp).join("");

              try {
                     const res = await axios.post("/api/auth/verifyOtpMail", {
                            email: otpEmail,
                            otp: otpString
                     });

                     console.log("OTP verify response:", res.data);

                     if (res.data.success) {

                            toast.success(res.data.message);

                            // Jab user signup karta hai, mai turant signIn('credentials') call karke usko auto-login kar deta hoon. Iska fayda ye hai ki user ko dobara login page nahi dikhana padta aur session turant create ho jata hai. redirect: false use karke mai frontend pe control rakhta hoon aur user ko OTP verification ya dashboard pe le ja sakta hoon.

                            const loginRes = await signIn("credentials", {

                                   // HUME SESSION KE LIYE EMAIL PASSWORD REGISTER PEGE SE USE KR RHE HII.
                                   email: otpEmail,
                                   password: otpPassword, 
                                   redirect: false,
                            });

                            if (loginRes?.ok) {
                                   router.push("/");
                            } else {
                                   toast.error("Auto login failed");
                            }
                     } else {
                            toast.error(res.data.message);
                     }

              } catch (error) {
                     toast.error(error?.response?.data?.message || "Server error");
                     console.log(`otp verify error : ${error}`);
              }
       };

       return (
              <div className="w-full max-w-sm backdrop-blur-lg  border border-white/30 shadow-xl rounded-2xl md:p-6 p-3 flex flex-col gap-5  items-center">

                     <h2>Verify Email OTP</h2>

                     <motion.form
                            initial={{
                                   y: 40, opacity: 0
                            }}
                            animate={{
                                   y: 0, opacity: 1
                            }}
                            transition={{
                                   delay: 0.3, duration: 0.8
                            }}
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col items-center space-y-5"
                     >
                            <div className="flex gap-3 ">
                                   {Array.from({ length: 4 }).map((_, index) => (
                                          <input
                                                 key={index}
                                                 type="text"
                                                 maxLength={1}
                                                 inputMode="numeric"
                                                 className="md:w-12 w-8 md:h-12 h-8 text-center border border-gray-800 rounded-md text-lg focus:outline-none focus:ring-1 focus:ring-green-500 grid sm:grid-cols-2"
                                                 {...register(`otp.${index}`, {
                                                        required: true,
                                                        pattern: /^[0-9]$/,
                                                 })}
                                                 onInput={(e) => {
                                                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                                        if (e.target.nextSibling && e.target.value) {
                                                               e.target.nextSibling.focus();
                                                        }
                                                 }}
                                          />
                                   ))}
                            </div>

                            <button
                                   disabled={isSubmitting}
                                   type="submit"
                                   className="cursor-pointer bg-gray-800 text-white px-6 py-2 rounded"
                            >
                                   {isSubmitting ? <img src="/loder.gif" className='h-7' /> : "Verify OTP"}
                            </button>
                     </motion.form>
              </div>
       )
}

export default OtpPage
