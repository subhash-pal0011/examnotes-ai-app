

import OpenAI from "openai";

const client = new OpenAI({
       apiKey: process.env.OPENAI_API_KEY,
       baseURL: "https://openrouter.ai/api/v1",
});

export async function POST() {
       try {
              const stream = await client.chat.completions.create({
                     model: "openai/gpt-5-nano",
                     stream: true,
                     messages: [
                            {
                                   role: "system",
                                   content: `You are a study assistant for Indian students.
                                   Generate realistic values for a student form.
                                   Rules:
                                   - topic must match Indian school & college syllabus
                                   - className must be like: 9th, 10th, 11th, 12th
                                   - examType must be one of: JEE, NEET, Boards
                                   Return ONLY valid JSON.
                                   No explanation.
                                   No extra text.
                                   Format:
                                   {
                                    "topic": "...",
                                    "className": "...",
                                    "examType": "..."
                                   }

                            `
                            },
                            {
                                   role: "user",
                                   content: "Generate form suggestions"
                            }
                     ]

              });

              const encoder = new TextEncoder();

              const readableStream = new ReadableStream({
                     async start(controller) {
                            for await (const chunk of stream) {
                                   const content = chunk.choices[0]?.delta?.content;
                                   if (content) {
                                          controller.enqueue(encoder.encode(content));
                                   }
                            }
                            controller.close();
                     },
              });

              return new Response(readableStream, {
                     headers: {
                            "Content-Type": "text/plain; charset=utf-8",
                     },
              });
       } catch (error) {
              return new Response(
                     JSON.stringify({
                            error: "Streaming failed",
                            details: error.message,
                     }),
                     { status: 500 }
              );
       }
}
