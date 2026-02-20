import { auth } from "@/auth";
import connectDb from "@/dataBase/connectDb";
import User from "@/model/user";
import Notes from "@/model/notes";
import { buildPrompt } from "@/utils/promptBuilder";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
       apiKey: process.env.OPENAI_API_KEY,
       baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req) {
       try {
              await connectDb();
              const session = await auth();

              if (!session?.user?.email) {
                     return NextResponse.json(
                            { success: false, message: "Unauthorized" },
                            { status: 401 }
                     );
              }

              const {
                     topic,
                     className,
                     examType,
                     revisionMode,
                     includeDiagram,
                     includeChart,
              } = await req.json();


              if (!topic || !className || !examType) {
                     return NextResponse.json(
                            {
                                   success: false,
                                   message: "Topic, ClassName & ExamType required",
                            },
                            { status: 400 }
                     );
              }


              const user = await User.findOne({ email: session.user.email });
              if (!user) {
                     return NextResponse.json(
                            { success: false, message: "User not found" },
                            { status: 404 }
                     );
              }

              if (user.credits <= 0) {
                     return NextResponse.json(
                            { success: false, message: "Insufficient credits" },
                            { status: 400 }
                     );
              }


              const prompt = buildPrompt({
                     topic,
                     className,
                     examType,
                     revisionMode,
                     includeDiagram,
                     includeChart,
              });

              const completion = await client.chat.completions.create({
                     model: "openai/gpt-5-nano",
                     messages: [
                            { role: "system", content: "You generate structured study notes." },
                            { role: "user", content: prompt },
                     ],
              });

              const generatedNotes = completion.choices[0]?.message?.content || "No notes generated";
                     

              const savedNotes = await Notes.create({
                     user: user._id,
                     topic,
                     className,
                     examType,
                     revisionMode,
                     includeDiagram : includeDiagram,
                     includeChart,
                     content: generatedNotes,
              });

              user.credits -= 1; // JITNI BAR IS API PE CALL KROGE YANI JITNI BAR NOTES JUNRET HOGI UTNI BAR -1 HO JYEGA CREDITS SE.
              await user.save();

              return NextResponse.json({
                     success: true,
                     message: "Notes generated successfully",
                     notes: savedNotes,
              });
       } catch (error) {
              console.error("NOTES API ERROR:", error);
              return NextResponse.json(
                     {
                            success: false,
                            message: "Notes generation failed",
                            error: error.message,
                     },
                     { status: 500 }
              );
       }
}
