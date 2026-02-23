"use client"
import HistoryNav from '@/comonent/HistoryNav'
import LeftHistory from '@/comonent/LeftHistory'
import RightHistory from '@/comonent/RightHistory'
import React, { useState } from 'react'

const page = () => {
       const [selectedNoteId, setSelectedNoteId] = useState(null);
       return (
              <div className='bg-gray-200 w-full min-h-screen'>
                     <div className='px-3 p-1 space-y-1'>
                            <HistoryNav onSelectNote={setSelectedNoteId} />
                            <div className='flex gap-4'>
                                   <div className="hidden sm:block">
                                          <LeftHistory onSelectNote={setSelectedNoteId}/>
                                   </div>
                                   <RightHistory notesId={selectedNoteId}/>
                            </div>
                     </div>

              </div>
       )
}
export default page
