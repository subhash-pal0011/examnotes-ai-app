"use client"
import React, { useState } from "react";
import { RiDownloadLine } from "react-icons/ri";

const ResultNotes = ({ result }) => {
       if (!result) return null;

       const [loading, setLoading] = useState(false);

       // const handleDownload = async () => {
       //        try {
       //               setLoading(true);

       //               const normalizedResult =
       //                      typeof result === "string"
       //                             ? {
       //                                    notes: result,         
       //                                    questions: {
       //                                           short: [],
       //                                           long: [],
       //                                           important: [],
       //                                           veryImportant: [],
       //                                    },
       //                             }
       //                             : {
       //                                    notes: result.notes || "",
       //                                    questions: result.questions || {},
       //                             };

       //               console.log("SENDING:", normalizedResult);

       //               const res = await fetch("/api/pdf", {
       //                      method: "POST",
       //                      headers: { "Content-Type": "application/json" },
       //                      body: JSON.stringify({ result: normalizedResult }),
       //               });

       //               if (!res.ok) {
       //                      const data = await res.json();
       //                      alert(data.message);
       //                      return;
       //               }

       //               const blob = await res.blob();
       //               const url = window.URL.createObjectURL(blob);

       //               const link = document.createElement("a");
       //               link.href = url;
       //               link.download = "ExamNotesAI.pdf";
       //               link.click();

       //               window.URL.revokeObjectURL(url);

       //        } catch (err) {
       //               console.error(err);
       //               alert("PDF download failed");
       //        } finally {
       //               setLoading(false);
       //        }
       // };

       const handleDownload = async () => {
              try {
                     setLoading(true)
                     const res = await fetch("/api/pdf", {
                            method: "POST",
                            headers: {
                                   "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ result }),
                     });

                     if (!res.ok) {
                            throw new Error("PDF download failed");
                     }

                     const blob = await res.blob();

                     const url = window.URL.createObjectURL(blob);

                     const a = document.createElement("a");
                     a.href = url;
                     a.download = "notes.pdf";
                     a.click();

                     window.URL.revokeObjectURL(url);
              } catch (err) {
                     console.error(err);
              } finally {
                     setLoading(false)
              }
       };
       return (
              <div className="w-full mt-3 p-4 rounded 
                    bg-linear-to-r from-green-100 via-green-100 to-gray-200 
                    shadow-2xl border border-green-200">

                     <div className="flex md:flex-row flex-col justify-between items-center">
                            <div className="flex items-center gap-1">
                                   <img src="/bookAndNotes.gif" className="h-10 w-10" />
                                   <h2 className="text-md font-semibold text-gray-700 mb-2 capitalize line-clamp-1">
                                          Generated Notes
                                   </h2>
                            </div>

                            <button onClick={handleDownload} disabled={loading} className="cursor-pointer md:px-5 border border-green-500  rounded hover:bg-gray-400 hover:text-white transition-all duration-300 py-2">
                                   {loading ? (
                                          <div className="flex items-center">
                                                 <img src="/Downloading.gif" className="h-8 w-8" />
                                                 <span className="text-xs font-semibold capitalize line-clamp-1">Download</span>
                                          </div>
                                   ) : (<div className="flex items-center">
                                          <RiDownloadLine className="h-5 w-5 gap-1" />
                                          <span className="text-xs font-semibold capitalize line-clamp-1">Download</span>
                                   </div>)}
                            </button>

                     </div>


                     <div className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                            {result}
                     </div>
              </div>
       );
};

export default ResultNotes;

