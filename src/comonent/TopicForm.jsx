"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import axios from "axios";

const TopicForm = () => {

       const {
              register,
              handleSubmit,
              setValue,
              reset,
              formState: { errors, isSubmitting },
       } = useForm({
              defaultValues: {
                     revisionMode: false,
                     includeDiagram: false,
                     includeCharts: false,
              },
       });

       const [loading, setLoading] = useState(false);

       const onSubmit = async (data) => {
              try {
                     const res = await axios.post("/api/aiResponce/genrateNotes", data)
                     if (res.data.success) {
                            console.log("resAI : ", res.data)
                            reset()

                     }
              } catch (error) {
                     console.log(`error : ${error}`)
              }
       };

       const handleSuggestions = async () => {
              try {
                     setLoading(true);

                     const res = await fetch("/api/aiResponce/siggestionTopicForm", {
                            method: "POST",
                     });

                     const reader = res.body.getReader();
                     const decoder = new TextDecoder();

                     let result = "";

                     while (true) {
                            const { done, value } = await reader.read();
                            if (done) break;
                            result += decoder.decode(value);
                     }
                     let data;
                     try {
                            data = JSON.parse(result);
                     } catch (e) {
                            console.error("Invalid JSON:", result);
                            return;
                     }
                     setValue("topic", data.topic);
                     setValue("className", data.className);
                     setValue("examType", data.examType);
              } catch (error) {
                     console.error("Suggestion Error:", error);
              } finally {
                     setLoading(false);
              }
       };

       return (
              <div className="w-full text-gray-700 p-4 rounded shadow">


                     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

                            {/* TOPIC */}
                            <div>
                                   <input
                                          type="text"
                                          placeholder="Topic (e.g. Web Development)"
                                          className="border border-gray-300 rounded-lg p-2.5 text-sm w-full shadow-2xl"
                                          {...register("topic", {
                                                 required: "Topic is required",
                                                 minLength: {
                                                        value: 3,
                                                        message: "Topic must be at least 3 characters",
                                                 },
                                          })}
                                   />
                                   {errors.topic && (
                                          <span className="text-red-500 text-xs">
                                                 {errors.topic.message}
                                          </span>
                                   )}
                            </div>

                            {/* CLASS */}
                            <div>
                                   <input
                                          type="text"
                                          placeholder="Class (e.g. 12th)"
                                          className="border border-gray-300 rounded-lg p-2.5 text-sm w-full shadow-2xl"
                                          {...register("className", {
                                                 required: "Class is required",
                                          })}
                                   />
                                   {errors.className && (
                                          <span className="text-red-500 text-xs">
                                                 {errors.className.message}
                                          </span>
                                   )}
                            </div>

                            {/* EXAM TYPE */}
                            <div>
                                   <input
                                          type="text"
                                          placeholder="Exam-Type (JEE, NEET...)"
                                          className="border border-gray-300 rounded-lg p-2.5 text-sm w-full shadow-2xl"
                                          {...register("examType", {
                                                 required: "Exam Type is required",
                                          })}
                                   />
                                   {errors.examType && (
                                          <span className="text-red-500 text-xs">
                                                 {errors.examType.message}
                                          </span>
                                   )}
                            </div>


                            {/* REVISION MODE */}
                            <div className="flex md:flex-row flex-col md:gap-5">
                                   <div className="flex items-center space-x-2 mt-5">
                                          <Switch
                                                 onCheckedChange={(checked) => setValue("revisionMode", checked)}
                                          />
                                          <span className="text-xs font-semibold capitalize line-clamp-1">Exam Revision Mode</span>
                                   </div>

                                   {/* INCLUDE DIAGRAM */}
                                   <div className="flex items-center space-x-2 mt-5">
                                          <Switch
                                                 onCheckedChange={(checked) => setValue("includeDiagram", checked)}
                                          />
                                          <span className="text-xs font-semibold capitalize line-clamp-1">Include Diagram</span>
                                   </div>

                                   {/* INCLUDE CHARTS */}
                                   <div className="flex items-center space-x-2 mt-5">
                                          <Switch
                                                 onCheckedChange={(checked) => setValue("includeCharts", checked)}
                                          />
                                          <span className="text-xs font-semibold capitalize line-clamp-1">Include Charts</span>
                                   </div>
                            </div>


                            <button
                                   disabled={isSubmitting}
                                   type="submit"
                                   className="mt-2 px-4 py-2 rounded-lg bg-linear-to-r from-green-500 to-emerald-500 text-white text-sm font-medium cursor-pointer transition  shadow-xl text-center items-center flex justify-center"
                            >
                                   {!isSubmitting ?
                                          <div className="flex items-center gap-1">
                                                 <img src="/roboAi.gif" className="h-6 w-6" />
                                                 <img src="/loder.gif" className="h-6 w-6 " />
                                          </div>
                                          :
                                          "Generate Notes"
                                   }

                            </button>
                     </form>

                     {isSubmitting &&
                            <p className="text-xs font-semibold text-center mt-4 text-red-500 capitalize line-clamp-2">Please wait. Results will appear within 1–2 minutes</p>
                     }

                     {/* AI BUTTON */}
                     <button
                            onClick={handleSuggestions}
                            disabled={loading}
                            className="mt-3 p-1 rounded border-green-400 font-semibold border cursor-pointer flex items-center"
                     >
                            {/* 🤖 */}
                            <img src="/roboAi.gif" className="h-10 w-10" />
                            <span className="text-xs capitalize line-clamp-1 bg-linear-to-r from-gray-800 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                                   {loading ? <img src="/loader-2.gif" className="h-10 w-10" /> : "Would you like some suggestions?"}
                            </span>
                     </button>
              </div>
       );
};

export default TopicForm;
