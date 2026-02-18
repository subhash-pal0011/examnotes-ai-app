import React from 'react'
import Link from 'next/link'

const Center = () => {
       return (
              <div className='w-full'>
                     <div className='flex md:flex-row flex-col items-center md:gap-20 gap-5 justify-center p-5 md:mt-5 mt-10'>

                            <div className="text-center space-y-5 md:mt-5 items-center flex flex-col">
                                   <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-green-500 via-emerald-400 to-gray-800 bg-clip-text text-transparent">
                                          Create Notes Faster Than Ever
                                   </h1>

                                   <h3 className="text-sm sm:text-base bg-linear-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
                                          Let AI handle the structure while you focus on learning.
                                   </h3>

                                   <Link href="/notes"
                                          className="px-8 py-2 rounded-xl bg-linear-to-r from-green-500 via-emerald-400 to-green-600 text-white font-semibold shadow-lg flex hover:scale-105 hover:shadow-xl transition duration-300 w-50 items-center gap-2">
                                          Get Started
                                          <img src="/arrow.gif" className='h-7 w-7' />
                                   </Link>
                            </div>
                            <div>
                                   <img src="/imgStudy.png" className='w-100' />
                            </div>
                     </div>
              </div>
       )
}

export default Center
