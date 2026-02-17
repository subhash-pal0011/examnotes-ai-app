import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
       baseURL: "https://openrouter.ai/api/v1",
       apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
       try {
              const { field, value, errorType } = await req.json();

              if (!field || !value || !errorType) {
                     return NextResponse.json(
                            { error: "Missing required fields" },
                            { status: 400 }
                     );
              }

              const completion = await client.chat.completions.create({
                     model: "openai/gpt-5-nano",
                     messages: [
                            {
                                   role: "user",
                                   content: `User entered "${value}" in ${field} field.
                                   Validation error: ${errorType}. and max 2 space
                                   Give only one-line suggestion (max 10 words). No explanation.`,
                            },
                     ],
              });

              return NextResponse.json({
                     success: true,
                     suggestion: completion.choices[0]?.message?.content,
              });
       } catch (error) {
              return NextResponse.json(
                     {
                            error: "Something went wrong",
                            details: error.message,
                     },
                     { status: 500 }
              );
       }
}
