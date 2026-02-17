"use client";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { useForm } from "react-hook-form"
import axios from "axios";
import { toast } from "sonner";
import OtpPage from "@/comonent/OtpPage";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const Page = () => {
       const {
              register,
              handleSubmit,
              watch,
              reset,
              formState: { errors, isSubmitting },
       } = useForm()








       const [login, setLogin] = useState(true)
       const [otpBox, setOtpBox] = useState(false)
       const [otpEmail, setOtpEmail] = useState("");
       const [otpPassword, setOtpPassword] = useState("");
       const [suggestion, setSuggestion] = useState("");
       const [lodingSuggestion , setLodingSuggestion] = useState(false)
       const router = useRouter()

       const onSignup = async (data) => {
              try {
                     const res = await axios.post("/api/auth/register", data);

                     if (res.data.success) {
                            toast.success(res.data.message);
                            reset()
                            setOtpBox(true)
                            setOtpEmail(data.email);
                            setOtpPassword(data.password);
                     }
              } catch (error) {
                     toast.error(error?.response?.data?.message);
                     console.log(`register error : ${error}`);
              }
       };


       const onLogin = async (data) => {
              try {
                     // NextAuth credentials provider se login attempt kar rahe hain
                     const loginRes = await signIn("credentials", {
                            email: data.email,
                            password: data.password,
                            redirect: false // important: automatic redirect mat hone do
                     });

                     if (loginRes?.error) {
                            toast.error("Invalid email or password");
                            return;
                     }

                     if (loginRes?.ok) {
                            toast.success("Logged in successfully");
                            reset();
                            router.push("/logout");
                     }

              } catch (error) {
                     toast.error(error?.message || "Login failed");
                     console.log("login error:", error);
              }
       };


       const getSuggestion = async (field, value, errorType) => {
              try {
                     if (!value) return;
                     setLodingSuggestion(true)
                     const res = await axios.post("/api/auth/suggestionForm", {
                            field,
                            value,
                            errorType,
                     });

                     if (res.data?.success) {
                            setSuggestion(res.data.suggestion);
                     }
              } catch (error) {
                     console.log("Suggestion error:", error.message);
              }finally{
                     setLodingSuggestion(false);
              }
       };

       const emailValue = watch("email");
       const passwordValue = watch("password");
       const nameValue = watch("name");

       useEffect(() => {
              const timer = setTimeout(() => {
                     if (errors.name) {
                            getSuggestion("name", nameValue, errors.name.message);
                     } else if (errors.email) {
                            getSuggestion("email", emailValue, errors.email.message);
                     } else if (errors.password) {
                            getSuggestion("password", passwordValue, errors.password.message);
                     }
              }, 800);

              return () => clearTimeout(timer);
       }, [errors, nameValue, emailValue, passwordValue]);



       return (
              <div className="w-full min-h-screen flex flex-col items-center justify-center bg-linear-to-r from-green-100 via-green-100 to-gray-200 relative p-2">

                     {/* Top Header */}
                     <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="absolute top-4 w-full max-w-3xl bg-gray-800 text-white rounded-xl p-4 shadow-2xl shadow-green-200"
                     >
                            <h3 className="text-md font-semibold">ExamNotes AI</h3>
                            <p className="text-xs text-gray-300">
                                   AI-powered exam-oriented notes & smart revision
                            </p>
                     </motion.div>

                     {/* Main Content */}
                     <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-10 md:mt-20 mt-40">

                            {otpBox ? (
                                   <>
                                          <OtpPage otpEmail={otpEmail} otpPassword={otpPassword} />
                                   </>
                            )
                                   :
                                   (
                                          <motion.div
                                                 initial={{ scale: 0, opacity: 0 }}
                                                 animate={{ scale: 1, opacity: 1 }}
                                                 className="w-full max-w-sm backdrop-blur-lg  border border-white/30 shadow-xl rounded-2xl md:p-6 p-3 flex flex-col gap-5 text-gray-600">
                                                 <motion.form
                                                        onSubmit={handleSubmit(login ? onSignup : onLogin)}
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        className="space-y-5"
                                                 >
                                                        {login && <motion.div
                                                               initial={{ y: -40, opacity: 0 }}
                                                               animate={{ y: 0, opacity: 1 }}
                                                               transition={{ delay: 0.4 }}
                                                        >
                                                               <h2 className="md:text-lg text-xs font-semibold text-gray-800  line-clamp-1 ">
                                                                      Create an account to continue
                                                               </h2>
                                                               <p className="md:text-xs text-xs text-gray-500">
                                                                      Sign up to continue generating smart notes
                                                               </p>
                                                        </motion.div>}

                                                        {!login && <motion.div
                                                               initial={{ y: -40, opacity: 0 }}
                                                               animate={{ y: 0, opacity: 1 }}
                                                               transition={{ delay: 0.4 }}
                                                        >
                                                               <h2 className="md:text-lg text-xs font-semibold text-gray-800  line-clamp-1 ">
                                                                      Welcome Back 👋
                                                               </h2>
                                                               <p className="md:text-xs text-xs text-gray-500">
                                                                      Login to continue generating smart notes
                                                               </p>
                                                        </motion.div>}


                                                        {login && <motion.div
                                                               initial={{ x: 50, opacity: 0 }}
                                                               animate={{ x: 0, opacity: 1 }}
                                                               transition={{ delay: 0.1 }}
                                                               className="relative">
                                                               <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />

                                                               <input
                                                                      type="text"
                                                                      placeholder="Enter Name"
                                                                      className="w-full border border-gray-300 bg-white rounded-lg p-2.5 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"

                                                                      // {...register("name", {
                                                                      //        required: "Name is required",
                                                                      //        validate: (value) =>
                                                                      //               value.trim().length > 0 || "Only Spaces not allowed",
                                                                      // })}

                                                                      {...register("name", {
                                                                             required: "Name is required",
                                                                             minLength: {
                                                                                    value: 3,
                                                                                    message: "Name too short",
                                                                             },
                                                                             pattern: {
                                                                                    value: /^[A-Za-z\s]+$/,
                                                                                    message: "Only letters allowed",
                                                                             },
                                                                             validate: (value) =>
                                                                                    value.trim().length > 0 || "Only spaces not allowed",
                                                                      })}
                                                               />

                                                               {errors.name && (
                                                                      <p className="absolute left-1 -bottom-5 text-red-500 text-xs">
                                                                             {errors.name.message}
                                                                      </p>
                                                               )}
                                                        </motion.div>}


                                                        {/* Email */}
                                                        <div className="relative">
                                                               <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                                                               <input
                                                                      type="email"
                                                                      placeholder="Enter Email"
                                                                      className="w-full border border-gray-300 bg-white rounded-lg p-2.5 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"

                                                                      // {...register("email", {
                                                                      //        required: "Email is required",
                                                                      //        validate: (value) => value.trim().length > 0 || "Only Spaces not allowed"
                                                                      // })}
                                                                      {...register("email", {
                                                                             required: "Email is required",
                                                                             pattern: {
                                                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                                    message: "Invalid email format",
                                                                             },
                                                                      })}
                                                               />
                                                               {errors.email &&
                                                                      <p className="absolute left-1 -bottom-5 text-red-500 text-xs">
                                                                             {errors.email.message}
                                                                      </p>
                                                               }
                                                        </div>

                                                        {/* Password */}
                                                        <div className="relative">
                                                               <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                                                               <input
                                                                      type="password"
                                                                      placeholder="Enter Password"
                                                                      className="w-full border border-gray-300 bg-white rounded-lg p-2.5 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"

                                                                      // {...register("password", {
                                                                      //        required: "Password is required",
                                                                      //        validate: (value) => value.trim().length > 0 || "Only Spaces not allowed"
                                                                      // })}

                                                                      {...register("password", {
                                                                             required: "Password is required",
                                                                             minLength: {
                                                                                    value: 6,
                                                                                    message: "Min 6 characters required",
                                                                             },
                                                                      })}

                                                               />
                                                               {errors.password && (
                                                                      <p className="absolute left-1 -bottom-5 text-red-500 text-xs">
                                                                             {errors.password.message}
                                                                      </p>
                                                               )}
                                                        </div>

                                                        <div className="space-y-1 mt-3 text-center">
                                                               <motion.button
                                                                      disabled={isSubmitting}
                                                                      whileHover={{ scale: 1.1 }}
                                                                      whileTap={{ scale: 0.95 }}
                                                                      type="submit"
                                                                      className="bg-black text-white rounded-lg p-2.5 text-sm hover:bg-gray-800 transition-all cursor-pointer w-full flex items-center justify-center"
                                                               >
                                                                      {isSubmitting
                                                                             ? <img src="/loder.gif" className="h-5 w-5" />
                                                                             : login ? "Sign Up" : "Login"
                                                                      }
                                                               </motion.button>


                                                               <p onClick={() => setLogin(!login)}
                                                                      className="text-xs text-green-500 absolute right-10 hover:underline cursor-pointer">{login ? "Sign up" : "Login"}</p>

                                                        </div>
                                                 </motion.form>

                                                 <button onClick={() => signIn("google", { callbackUrl: "/logout" })}
                                                        className="items-center flex justify-center gap-1 cursor-pointer p-2">
                                                        <FcGoogle />
                                                        <span className="text-xs">Continue with Google</span>
                                                 </button>


                                                 <div>
                                                 
                                                 
                                                        {lodingSuggestion && (
                                                               <p className="text-xs text-gray-900 text-center animate-pulse">
                                                                      🤖 Thinking...
                                                               </p>
                                                        )}

                                                        {!lodingSuggestion && suggestion && (
                                                               <p className="text-xs text-center -mt-2 text-green-500">
                                                                      💡 {suggestion}
                                                               </p>
                                                        )}
                                                 </div>

                                          </motion.div>
                                   )
                            }

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">

                                   <motion.div
                                          initial={{ y: 20, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.1 }}
                                          className="border border-gray-600 p-4 rounded-xl bg-gray-800 text-white shadow-md hover:scale-105 transition-all"
                                   >
                                          <h3 className="text-sm font-semibold capitalize line-clamp-1">50 Free Credits</h3>
                                          <p className="text-xs text-gray-300">
                                                 Start with 50 credits to generate notes without paying.
                                          </p>
                                   </motion.div>

                                   <motion.div
                                          initial={{ y: 20, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.2 }}
                                          className="border border-gray-600 p-4 rounded-xl bg-gray-800 text-white shadow-md hover:scale-105 transition-all"
                                   >
                                          <h3 className="text-sm font-semibold">Smart AI Notes</h3>
                                          <p className="text-xs text-gray-300">
                                                 Generate exam-focused notes instantly using AI.
                                          </p>
                                   </motion.div>

                                   <motion.div
                                          initial={{ y: 20, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.3 }}
                                          className="border border-gray-600 p-4 rounded-xl bg-gray-800 text-white shadow-md hover:scale-105 transition-all"
                                   >
                                          <h3 className="text-sm font-semibold">Revision Mode</h3>
                                          <p className="text-xs text-gray-300">
                                                 Quick summaries designed for last-minute revision.
                                          </p>
                                   </motion.div>

                                   <motion.div
                                          initial={{ y: 20, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.4 }}
                                          className="border border-gray-600 p-4 rounded-xl bg-gray-800 text-white shadow-md hover:scale-105 transition-all"
                                   >
                                          <h3 className="text-sm font-semibold">Exam Patterns</h3>
                                          <p className="text-xs text-gray-300">
                                                 Notes structured based on common exam trends.
                                          </p>
                                   </motion.div>

                                   <motion.div
                                          initial={{ y: 20, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.5 }}
                                          className="border border-gray-600 p-4 rounded-xl bg-gray-800 text-white shadow-md hover:scale-105 transition-all"
                                   >
                                          <h3 className="text-sm font-semibold">Save Time</h3>
                                          <p className="text-xs text-gray-300">
                                                 Study faster with AI-generated concise notes.
                                          </p>
                                   </motion.div>

                                   <motion.div
                                          initial={{ y: 20, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.6 }}
                                          className="border border-gray-600 p-4 rounded-xl bg-gray-800 text-white shadow-md hover:scale-105 transition-all"
                                   >
                                          <h3 className="text-sm font-semibold">Better Scores</h3>
                                          <p className="text-xs text-gray-300">
                                                 Learn smarter and improve exam performance.
                                          </p>
                                   </motion.div>

                            </div>

                     </div>
              </div>
       );
};

export default Page;


