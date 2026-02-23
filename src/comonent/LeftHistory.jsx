"use client"
import { setGetNotes } from "@/redux/GetNotes"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const LeftHistory = ({ onSelectNote }) => {

       const [data, setData] = useState([])
       const [loding, setLoding] = useState(false)
       const dispatch = useDispatch()


       useEffect(() => {
              const getNotes = async () => {
                     try {
                            setLoding(true)
                            const res = await axios.get("/api/history/gatnotes")
                            if (res.data.success) {
                                   console.log(res.data.data)
                                   setData(res.data.data)
                                   dispatch(setGetNotes(res.data.data))
                            }

                     } catch (error) {
                            console.log("get notes error:", error)
                     } finally {
                            setLoding(false)
                     }
              }
              getNotes()
       }, [])

       return (
              <div className="w-60 bg-linear-to-r from-green-100 via-green-100 to-gray-200 shadow min-h-screen rounded">

                     {loding ? (
                            <div className="items-center justify-center flex flex-col ">
                                   <img src="/Loader.gif" className="h-15 w-15 mt-50" />
                            </div>
                     ) : (
                            data.length > 0 ? (
                                   data.map((note) => (
                                          <div onClick={() => onSelectNote(note._id)}
                                                 key={note._id} className="p-2 px-3 border-b cursor-pointer">
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
                     )
                     }

              </div>
       )
}

export default LeftHistory
