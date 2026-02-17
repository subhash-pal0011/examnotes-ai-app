import connectDb from "@/dataBase/connectDb";
import User from "@/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { mailVerification } from "@/utils/mailVerification";

export async function POST(req) {
       try {
              await connectDb();

              const body = await req.json();
              const { name, email, password } = body;

              if (!name || !email || !password) {
                     return NextResponse.json(
                            { success: false, message: "All fields are required" },
                            { status: 400 }
                     );
              }

              const trimmedName = name.trim();
              const trimmedEmail = email.trim().toLowerCase();
              const trimmedPassword = password.trim();

              if (!trimmedName || !trimmedEmail || !trimmedPassword) {
                     return NextResponse.json(
                            { success: false, message: "Invalid input" },
                            { status: 400 }
                     );
              }

              const existingUser = await User.findOne({ email: trimmedEmail });

              if (existingUser) {
                     return NextResponse.json(
                            { success: false, message: "User already exists" },
                            { status: 409 }
                     );
              }

              const otp = Math.floor(1000 + Math.random() * 9000).toString();
              const otpExpires = Date.now() + 5 * 60 * 1000;

              await mailVerification(email, otp)

              const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

              const newUser = await User.create({
                     name: trimmedName,
                     email: trimmedEmail,
                     password: hashedPassword,
                     otp,
                     otpExp: otpExpires,
                     isVerified: false
              });

              return NextResponse.json(
                     {
                            success: true,
                            data:newUser,
                            message: "User registered successfully",
                     },
                     { status: 201 }
              );

       } catch (error) {
              console.error("Register error:", error);

              return NextResponse.json(
                     { success: false, message: "Something went wrong" },
                     { status: 500 }
              );
       }
}

