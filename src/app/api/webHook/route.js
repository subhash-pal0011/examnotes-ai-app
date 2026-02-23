import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import User from "@/model/user";
import connectDb from "@/dataBase/connectDb";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
       await connectDb(); 

       const body = await req.text();
       const signature = headers().get("stripe-signature");

       let event;

       try {
              event = stripe.webhooks.constructEvent(
                     body,
                     signature,
                     process.env.STRIPE_WEBHOOK_SECRET
              );
       } catch (err) {
              console.error("Invalid signature:", err.message);
              return NextResponse.json({ success: false }, { status: 400 });
       }

       try {
              if (event.type === "checkout.session.completed") {
                     const session = event.data.object;

                     const userId = session.metadata?.userId;
                     const credit = Number(session.metadata?.credits);

                     console.log("Credits add karo:", userId, credit);

                     if (!userId || !credit) {
                            return NextResponse.json(
                                   { success: false, message: "Invalid metadata" },
                                   { status: 400 }
                            );
                     }

                     const existingUser = await User.findById(userId);
                     if (!existingUser) {
                            return NextResponse.json(
                                   { success: false, message: "User not found" },
                                   { status: 404 }
                            );
                     }

                     if (existingUser.lastPaymentId === session.payment_intent) {
                            console.log("⚠️ Duplicate webhook ignored");
                            return NextResponse.json({ success: true });
                     }

                     const updatedUser = await User.findByIdAndUpdate(userId, {
                            $inc: { credits: credit },
                            $set: {
                                   isCreditAvailable: true,
                            },
                     },{ new: true });
                     console.log("✅ Credits updated:", updatedUser.credits);
              }

              return NextResponse.json({ success: true });

       } catch (error) {
              console.error("Webhook Error:", error);
              return NextResponse.json({ success: false }, { status: 500 });
       }
}