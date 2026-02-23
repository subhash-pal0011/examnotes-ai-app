import { auth } from "@/auth";
import connectDb from "@/dataBase/connectDb";
import Notes from "@/model/notes";
import User from "@/model/user";
import { NextResponse } from "next/server";

export async function GET() {
       try {
              await connectDb();

              const session = await auth();

              if (!session?.user?.email) {
                     return NextResponse.json(
                            { success: false, message: "Unauthorized" },
                            { status: 401 }
                     );
              }

              const dbUser = await User.findOne({
                     email: session.user.email,
              });

              if (!dbUser) {
                     return NextResponse.json(
                            { success: false, message: "User not found" },
                            { status: 404 }
                     );
              }

              const notes = await Notes.find({user: dbUser._id}).select("topic examType includeDiagram includeChart createdAt").sort({ createdAt: -1 });
                     

              return NextResponse.json({
                     success: true,
                     data:notes,
              });

       } catch (error) {
              console.error("GET NOTES ERROR:", error);

              return NextResponse.json(
                     { success: false, message: "Server Error" },
                     { status: 500 }
              );
       }
}