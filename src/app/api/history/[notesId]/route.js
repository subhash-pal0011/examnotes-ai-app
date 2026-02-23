import connectDb from "@/dataBase/connectDb";
import Notes from "@/model/notes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
       try {
              await connectDb();

              const { notesId } = await params;

              if (!notesId) {
                     return NextResponse.json(
                            { success: false, message: "NotesId not defined" },
                            { status: 400 }
                     );
              }

              const note = await Notes.findById(notesId);

              if (!note) {
                     return NextResponse.json(
                            { success: false, message: "Note not found" },
                            { status: 404 }
                     );
              }

              return NextResponse.json({ success: true, data:note });
     
       } catch (error) {
              return NextResponse.json(
                     { success: false, message: "Server error" },
                     { status: 500 }
              );
       }
}