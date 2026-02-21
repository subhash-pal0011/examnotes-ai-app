import OpenAI from "openai";

const client = new OpenAI({
       apiKey: process.env.OPENAI_API_KEY,
       baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req) {
       try {
              const completion = await client.chat.completions.create({
                     model: "gpt-4o-mini",
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
                                   }`
                            },
                            {
                                   role: "user",
                                   content: "Generate form suggestions"
                            }
                     ],
                     max_tokens: 200,
                     temperature: 0.7,
              });

              let raw = completion.choices[0]?.message?.content || "";
              raw = raw.trim();
              const match = raw.match(/\{[\s\S]*\}/);
              if (!match) {
                     return new Response(
                            JSON.stringify({ error: "AI did not return valid JSON", raw }),
                            { status: 500 }
                     );
              }

              const data = JSON.parse(match[0]);

              return new Response(JSON.stringify(data), {
                     headers: { "Content-Type": "application/json" },
              });

       } catch (error) {
              console.error("AI suggestion error:", error);
              return new Response(JSON.stringify({ error: error.message }), { status: 500 });
       }
}