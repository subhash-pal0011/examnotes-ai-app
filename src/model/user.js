import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
       {
              name: {
                     type: String,
                     required: true,
                     trim: true,
              },

              email: {
                     type: String,
                     required: true,
                     unique: true,
                     lowercase: true,
                     trim: true,
              },

              password: {
                     type: String,
                     required: function () {
                            return this.provider === "credentials";
                     },
              },
              provider: {
                     type: String,
                     enum: ["credentials", "google"],
                     default: "credentials",
              },

              profilePic: {
                     type: String,
                     default: "",
              },

              otp: {
                     type: String,
                     default: null,
              },

              otpExp: {
                     type: Date,
                     default: null,
              },

              isVerified: {
                     type: Boolean,
                     default: false,
              },

              credits: {
                     type: Number,
                     default: 50,
                     min: 0,
              },

              isCreditAvailable: {
                     type: Boolean,
                     default: true,
              },

              // ARRAY KE UNDER IS LIYE RKHA KYUKI USER KE PASS EK NOTES TO THEGI NHI MULTIPLE NOTES HO SKTI HII Is liye.
              notes: [
                     {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Notes",
                     },
              ],
       },

       {
              timestamps: true,
       }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;