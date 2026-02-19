import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
       {
              user: {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "User",
                     required: true,
              },

              topic: {
                     type: String,
                     required: true,
                     trim: true,
              },

              className: {
                     type: String,
                     required:true,
                     trim: true,
              },

              examType: {
                     type: String,
                     required: true,
                     trim: true,
              },

              revisionMode: {
                     type: Boolean,
                     default: false,
              },

              includeDiagram: {
                     type: Boolean,
                     default: false,
              },

              includeChart: {
                     type: Boolean,
                     default: false,
              },

              content: {
                     type: String,
                     default: "",
              },
       },
       {
              timestamps: true, 
       }
);

const Notes = mongoose.models.Notes || mongoose.model("Notes", notesSchema);
export default Notes;
