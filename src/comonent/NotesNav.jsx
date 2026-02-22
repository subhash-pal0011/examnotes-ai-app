"use client"
import React from 'react'
import { useSelector } from 'react-redux';
import Link from "next/link";

const NotesNav = () => {
       
       const user = useSelector((state) => state.user.userData);

       return (
              <div className='w-full shadow-md bg-white text-gray-700 rounded-sm'>
                     <div className='md:px-5 md:p-1.5 p-1 flex justify-between items-center md:flex-row flex-col'>
                            <div className='flex items-center gap-2 p-1'>
                                   <img src="/book.gif" className='h-10 w-10' />
                                   <p className='font-semibold capitalize line-clamp-1'>Exam-Notes AI</p>
                            </div>

                            <div className='flex items-center gap-5'>
                                   <div
                                          className='flex items-center gap-1 border hover:border-gray-600 transition-all duration-300 p-1 rounded px-4 cursor-pointer shadow shadow-gray-200'>
                                          <img src="/gift.gif" className='h-6 w-6' />
                                          <span className="text-xs font-semibold">
                                                 {user?.credits !== undefined ? user.credits : "..."}
                                          </span>

                                   </div>


                                   <Link href="/history"
                                          className='flex items-center gap-1 border hover:border-gray-600 transition-all duration-300 p-1 rounded px-4 cursor-pointer shadow shadow-gray-200'>
                                          <img src="/bookAndNotes.gif" className='h-8 w-8' />
                                          <span className="text-xs font-semibold capitalize line-clamp-1">
                                                 Your Notes
                                          </span>

                                   </Link>

                            </div>
                     </div>
              </div>
       )
}

export default NotesNav
