"use client"
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation";

const HistoryNav = ({ onSelectNote }) => {
       const router = useRouter();
       const [showBox, setShowBox] = useState(false)
       const user = useSelector((state) => state.user.userData);
       const [menuOpen, setMenuOpen] = useState(false)
       const notes = useSelector((state) => state.notes.getNotes);


       const sideBar = menuOpen ? createPortal(
              <AnimatePresence>
                     <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{
                                   x: "-100%",
                                   opacity: 0, scale: 0.98,
                                   transition: {
                                          duration: 1.4, ease: [0.4, 0, 0.2, 1]
                                   }
                            }}
                            className="fixed top-0 left-0 z-50 h-screen w-[70vw] md:w-[25vw] text-gray-500  overflow-auto bg-linear-to-r from-green-100 via-green-100 to-orange-50 shadow-2xl rounded-r-xl p-5"
                     >
                            <div className="flex items-center justify-between mb-6">
                                   <h2 className="text-md font-bold text-orange-500">History</h2>
                                   <button onClick={() => setMenuOpen(false)}>
                                          <img src="/cross.gif" alt="icon" className="h-7 cursor-pointer" />
                                   </button>
                            </div>

                            {
                                   notes?.length > 0 ? (
                                          notes.map((note) => (
                                                 <div onClick={() => onSelectNote(note._id)}
                                                        key={note._id} className="p-2 px-3 border-b cursor-pointer ">
                                                        <div className="font-medium capitalize line-clamp-3">{note.topic}</div>
                                                        <div className="text-xs text-gray-500">
                                                               {note.examType}
                                                        </div>
                                                        <p className="text-xs capitalize line-clamp-1">{new Date().toLocaleDateString()}</p>
                                                 </div>
                                          ))
                                   ) : (
                                          <div className="p-2 text-gray-500">No history found</div>
                                   )
                            }

                     </motion.div>
              </AnimatePresence>,
              document.body
       ) : null


       return (
              <div className='w-full shadow-md bg-white text-gray-700 rounded'>
                     <div className='md:px-5 md:p-1.5 p-1 flex justify-between items-center md:flex-row flex-col'>
                            <div onClick={() => router.push("/")}
                                   className='flex items-center gap-1 p-1 cursor-pointer'>
                                   <img src="/home-2.gif" className='h-8 w-8' />
                                   <p className='font-semibold text-sm capitalize line-clamp-1'>Home</p>
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
                                                                      onClick={() => setShowBox(false)}
                                                                      className="mt-4 w-full bg-green-600 text-white text-sm py-2 rounded-lg hover:bg-green-700"
                                                               >
                                                                      Continue
                                                               </button>
                                                        </motion.div>
                                                 </motion.div>
                                          )}
                                   </AnimatePresence>


                                   <div className=" p-2 block sm:hidden">
                                          <img
                                                 onClick={() => setMenuOpen(true)}
                                                 src="/sideBar.gif"
                                                 alt="User Avatar"
                                                 className="h-8 w-8cursor-pointer"
                                          />
                                   </div>
                            </div>
                     </div>
                     {sideBar}
              </div>
       )
}

export default HistoryNav
