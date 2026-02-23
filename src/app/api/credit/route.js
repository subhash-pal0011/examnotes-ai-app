import { auth } from "@/auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CREDIT_MAP = {
       100: 50,
       200: 150,
       500: 300,
};

export async function POST(req) {
       try {
              const session = await auth();
              const { amount } = await req.json();

              if (!session?.user) {
                     return NextResponse.json(
                            { success: false, message: "Unauthorized" },
                            { status: 401 }
                     );
              }

              if (!CREDIT_MAP[amount]) {
                     return NextResponse.json(
                            { success: false, message: "Invalid credit plan" },
                            { status: 400 }
                     );
              }

              const checkoutSession = await stripe.checkout.sessions.create({
                     mode: "payment",
                     payment_method_types: ["card"],

                     success_url: `${process.env.CLIENT_URL}/payment-success`,
                     cancel_url: `${process.env.CLIENT_URL}/payment-failed`,

                     customer_email: session.user.email,

                     line_items: [
                            {
                                   price_data: {
                                          currency: "inr",
                                          product_data: {
                                                 name: `${CREDIT_MAP[amount]} Credits`,
                                          },
                                          // Stripe amount ko paise me leta hai, rupees me nahi. Isliye rupees ko paise me convert karne ke liye 100 se multiply karte hain.
                                          unit_amount: amount * 100, 
                                   },
                                   quantity: 1,
                            },
                     ],

                     metadata: {
                            userId: session.user.id,
                            credits: CREDIT_MAP[amount],
                            amount,
                     },
              });

              return NextResponse.json({
                     success: true,
                     url: checkoutSession.url,
              });

       } catch (error) {
              console.error("Stripe Error:", error);

              return NextResponse.json(
                     { success: false, message: "Payment session creation failed" },
                     { status: 500 }
              );
       }
}