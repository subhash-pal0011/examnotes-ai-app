"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from "motion/react";
import { useSelector } from 'react-redux';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
       const router = useRouter()
       const [showBox, setShowBox] = useState(false)
       const [showDiv, setShowDiv] = useState(false)
       const user = useSelector((state) => state.user.userData);



       return (
              // sticky  z-50 p-5
              <div className='w-full shadow-md bg-white text-gray-700 rounded-sm'>
                     <div className='md:px-5 md:p-1.5 p-1 flex justify-between items-center md:flex-row flex-col'>
                            <div className='flex items-center gap-2 p-1'>
                                   <img src="/book.gif" className='h-10 w-10' />
                                   <p className='font-semibold capitalize line-clamp-1'>Exam-Notes AI</p>
                            </div>

                            <div className='flex items-center gap-5'>
                                   <div
                                          onClick={() => setShowBox(true)}
                                          className='flex items-center gap-1 border hover:border-gray-600 transition-all duration-300 p-1 rounded px-4 cursor-pointer shadow shadow-gray-200'>
                                          <img src="/gift.gif" className='h-6 w-6' />
                                          <span className="text-xs font-semibold">
                                                 {user?.credits !== undefined ? user.credits : "..."}
                                          </span>

                                   </div>


                                   <AnimatePresence>
                                          {showBox && (
                                                 <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                                                 >
                                                        <motion.div
                                                               initial={{ scale: 0.7, opacity: 0, y: 30 }}
                                                               animate={{ scale: 1, opacity: 1, y: 0 }}
                                                               exit={{ scale: 0.7, opacity: 0, y: 30 }}
                                                               transition={{ duration: 0.2 }}
                                                               className="bg-white rounded-xl shadow-xl p-5 w-[90%] max-w-sm relative"
                                                        >
                                                               {/* Close Button */}
                                                               <img
                                                                      src="/cross.gif"
                                                                      className="h-5 w-5 absolute top-3 right-3 cursor-pointer"
                                                                      onClick={() => setShowBox(false)}
                                                               />

                                                               {/* Content */}
                                                               <div className="space-y-2">
                                                                      <h3 className="text-sm font-semibold">Buy Credits</h3>
                                                                      <p className="text-xs text-gray-600">
                                                                             Use credits to generate AI notes, diagrams & PDFs.
                                                                      </p>
                                                               </div>

                                                               {/* Action Button */}
                                                               <button
                                                                      onClick={() => router.push("/credits")}
                                                                      className="mt-4 w-full bg-green-600 text-white text-sm py-2 rounded-lg hover:bg-green-700 cursor-pointer"
                                                               >
                                                                      Continue
                                                               </button>
                                                        </motion.div>
                                                 </motion.div>
                                          )}
                                   </AnimatePresence>


                                   <div className="shadow shadow-gray-200 p-2 rounded-full overflow-hidden">
                                          <img
                                                 onClick={() => setShowDiv(true)}
                                                 src={user?.profilePic || "/user.gif"}
                                                 alt="User Avatar"
                                                 className="h-7 w-7 object-cover rounded-full cursor-pointer"
                                          />
                                   </div>


                                   <AnimatePresence>
                                          {showDiv && (
                                                 <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                                                 >
                                                        <motion.div
                                                               initial={{ scale: 0.7, opacity: 0, y: 30 }}
                                                               animate={{ scale: 1, opacity: 1, y: 0 }}
                                                               exit={{ scale: 0.7, opacity: 0, y: 30 }}
                                                               transition={{ duration: 0.2 }}
                                                               className="bg-white rounded shadow-xl py-3 relative w-full max-w-60"
                                                        >
                                                               {/* Close Button */}
                                                               <img
                                                                      src="/cross.gif"
                                                                      className="h-5 w-5 absolute top-0.5  right-2 cursor-pointer "
                                                                      onClick={() => setShowDiv(false)}
                                                               />

                                                               {/* Content */}
                                                               <div className="space-y-2 text-center mt-2 p-2 w-full">

                                                                      <Link
                                                                             href="/history"
                                                                             className="block w-full bg-green-200 text-sm font-semibold p-1 text-green-600 rounded hover:bg-green-300 transition"
                                                                      >
                                                                             History
                                                                      </Link>

                                                                      <button
                                                                             onClick={() => signOut({ redirect: true, callbackUrl: "/register" })}
                                                                             className="w-full bg-red-200 text-sm font-semibold p-1 cursor-pointer text-red-600 rounded hover:bg-red-300 transition"
                                                                      >
                                                                             Log-Out
                                                                      </button>

                                                               </div>


                                                        </motion.div>
                                                 </motion.div>
                                          )}
                                   </AnimatePresence>

                            </div>
                     </div>
              </div>
       )
}

export default Navbar

